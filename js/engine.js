(function () {
  "use strict";

  var SAVE_KEY_LEGACY = "shiguang_blank_save_v1";
  var AUTOSAVE_KEY = "shiguang_autosave_v2";
  var SLOTS_KEY = "shiguang_slots_v2";
  var MAX_SAVE_SLOTS = 12;
  var LS_BGM_MUTED = "shiguang_bgm_muted";
  var LS_BGM_VOLUME = "shiguang_bgm_volume";
  var TYPEWRITER_MS = 38;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function resolveIllustrationPath(scene) {
    if (!scene) return "";
    if (scene.image) {
      var raw = String(scene.image).trim();
      if (!raw) return "";
      if (raw.indexOf("assets/") === 0) return raw;
      if (raw.indexOf("/") >= 0 || raw.indexOf("\\") >= 0) return raw;
      return "assets/images/" + raw;
    }
    var num = scene.illustration;
    if (!num || num < 1) return "";
    var files = typeof SCENE_IMAGE_FILES !== "undefined" ? SCENE_IMAGE_FILES : {};
    if (Object.prototype.hasOwnProperty.call(files, num)) {
      var f = files[num];
      if (f) return "assets/images/" + f;
      return "";
    }
    var pad = num < 10 ? "0" + num : String(num);
    return "assets/images/scene-" + pad + ".png";
  }

  function illustrationPlaceholderHint(scene, path) {
    var num = scene && scene.illustration;
    if (path) return "若未显示插画，请检查文件是否存在：\n" + path;
    if (!num) return "暂无指定插画";
    var files = typeof SCENE_IMAGE_FILES !== "undefined" ? SCENE_IMAGE_FILES : {};
    if (Object.prototype.hasOwnProperty.call(files, num) && files[num] === null) {
      return "插画占位 · 第 " + num + " 幅\n暂无素材（可在 SCENE_IMAGE_FILES[" + num + '] 填入文件名）';
    }
    var pad = num < 10 ? "0" + num : String(num);
    return (
      "插画占位 · 第 " +
      num +
      " 幅\n请将 PNG 放入 assets/images/，命名为 scene-" +
      pad +
      ".png\n或在 js/data.js 的 SCENE_IMAGE_FILES 中配置"
    );
  }

  function defaultState(playerName) {
    return {
      playerName: playerName || "林野",
      affection: 50,
      trust: 50,
      self: 50,
      mirror: 50,
      secret: 0,
      flags: {},
    };
  }

  function applyEffects(state, effects) {
    if (!effects) return;
    if (typeof effects.affection === "number")
      state.affection = clamp(state.affection + effects.affection, 0, 100);
    if (typeof effects.trust === "number") state.trust = clamp(state.trust + effects.trust, 0, 100);
    if (typeof effects.self === "number") state.self = clamp(state.self + effects.self, 0, 100);
    if (typeof effects.mirror === "number")
      state.mirror = clamp((typeof state.mirror === "number" ? state.mirror : 50) + effects.mirror, 0, 100);
    if (typeof effects.secret === "number")
      state.secret = clamp(state.secret + effects.secret, 0, 100);
    if (effects.flags) {
      for (var k in effects.flags) {
        if (Object.prototype.hasOwnProperty.call(effects.flags, k)) {
          state.flags[k] = effects.flags[k];
        }
      }
    }
  }

  function formatText(text, playerName) {
    if (!text) return "";
    return String(text).replace(/\{player\}/g, playerName);
  }

  /**
   * 默认：有正文即用打字机（避免「只有旁白才打字」导致大量场景不生效）。
   * 某段要瞬间出字：在场景上设 instantText: true
   */
  function shouldUseTypewriter(scene, hasBody) {
    if (!hasBody) return false;
    if (scene.instantText === true) return false;
    return true;
  }

  function getBgmVolume01() {
    try {
      var vs = localStorage.getItem(LS_BGM_VOLUME);
      if (vs == null || vs === "") return 0.7;
      var n = parseInt(vs, 10);
      if (isNaN(n)) return 0.7;
      return clamp(n, 0, 100) / 100;
    } catch (e) {
      return 0.7;
    }
  }

  function setBgmVolume01(v) {
    try {
      localStorage.setItem(LS_BGM_VOLUME, String(Math.round(clamp(v, 0, 1) * 100)));
    } catch (e) {}
  }

  function isBgmMuted() {
    try {
      return localStorage.getItem(LS_BGM_MUTED) === "1";
    } catch (e) {
      return false;
    }
  }

  function setBgmMuted(m) {
    try {
      localStorage.setItem(LS_BGM_MUTED, m ? "1" : "0");
    } catch (e) {}
  }

  function applyBgmElementState(bgm) {
    if (!bgm) return;
    var vol = getBgmVolume01();
    bgm.volume = vol;
  }

  function getSlots() {
    try {
      var raw = localStorage.getItem(SLOTS_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function setSlots(slots) {
    try {
      localStorage.setItem(SLOTS_KEY, JSON.stringify(slots));
    } catch (e) {
      console.warn("setSlots failed", e);
    }
  }

  function summarizeScene(data) {
    if (!data || !data.sceneId) return "";
    var sc = typeof SCENES !== "undefined" ? SCENES[data.sceneId] : null;
    if (sc && sc.sceneTitle) return sc.sceneTitle;
    return String(data.sceneId);
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function resolveNext(next, state) {
    if (typeof next === "function") return next(state);
    return next;
  }

  function resolveEnding(state) {
    var mirror = typeof state.mirror === "number" ? state.mirror : 50;
    if (state.flags.ending_dark1) return "end_dark_consume";
    if (state.flags.ending_dark2) return "end_dark_mask";
    if (state.flags.ending_dark3) return "end_dark_giveup";
    if (state.flags.ending_observer) return "end_neutral_observer";
    if (state.flags.ending_lonely) return "end_lonely";
    if (state.flags.ending_regret_pass) return "end_regret_pass";

    if (mirror >= 85 && state.trust <= 35 && state.affection >= 40) return "end_dark_mask";

    if (state.flags.path_release) {
      if (state.self >= 70 && state.affection <= 35) return "end_release";
      return "end_release_soft";
    }

    if (state.flags.chose_hometown) {
      if (state.affection >= 80 && state.trust >= 80 && state.self >= 70) return "end_full_hometown";
      if (state.affection >= 65 && state.trust >= 60) return "end_full_hometown_soft";
      return "end_full_hometown_soft";
    }
    if (state.flags.chose_studio) {
      if (state.affection >= 75 && state.trust >= 75 && state.self >= 65) return "end_full_studio";
      if (state.affection >= 60 && state.trust >= 55) return "end_full_studio_soft";
      return "end_full_studio_soft";
    }

    if (state.flags.tug_war && !state.flags.chose_hometown && !state.flags.chose_studio) {
      if (state.flags.tug_commit) return "end_tug_commit";
      return "end_tug_regret";
    }

    if (state.flags.path_redemption) {
      if (state.affection >= 55 && state.trust >= 50) return "end_redemption";
      return "end_redemption_bittersweet";
    }

    if (state.affection >= 72 && state.trust >= 72 && state.self >= 60) return "end_neutral_warm";
    return "end_neutral_open";
  }

  var Endings = {
    end_full_hometown: {
      title: "圆满结局 · 拾光同行",
      body:
        "你与苏晚回到她长大的小院。没有完美滤镜，只有坦诚的陪伴。她用左手画出温柔的日常，右手在康复里慢慢找回力量。{player}也在坚持里与母亲和解。\n\n价值内核：接纳不完美，坦诚沟通，才能长久。",
      dark: false,
    },
    end_full_hometown_soft: {
      title: "靠近圆满 · 拾光同行（温和版）",
      body:
        "你们仍选择回到她的家乡，把话说开，把步子放慢。未来未必一帆风顺，但至少不再靠「扮演」相爱。\n\n多周目可尝试拉高好感、信任与自我认知以解锁更完整的叙事评价。",
      dark: false,
    },
    end_full_studio: {
      title: "圆满结局 · 温柔相守",
      body:
        "小小的工作室里，墙上是左手绘制的光，桌上是未干的颜料。苏念与闺蜜偶尔来帮忙，争执被坐下来谈清楚。\n\n价值内核：爱情是细水长流，是尊重彼此的节奏。",
      dark: false,
    },
    end_full_studio_soft: {
      title: "靠近圆满 · 温柔相守（温和版）",
      body:
        "工作室开张，日子琐碎而真实。你们仍在学习：如何说不，如何求助，如何不靠讨好留住对方。",
      dark: false,
    },
    end_release: {
      title: "释然结局 · 各自成长",
      body:
        "你没有回头，把力气收回自己身上。数年后画展重逢，相视一笑，没有尴尬，只有各自活成的坦然。\n\n价值内核：放手也可以是成长。",
      dark: false,
    },
    end_release_soft: {
      title: "各自上路",
      body: "你选择了向前。时间把尖锐磨成沉默的礼貌，你们未必在故事外重逢，但都在自己的路上继续练习爱自己。",
      dark: false,
    },
    end_redemption: {
      title: "挽回 · 和解之后",
      body:
        "陈默拍着你的肩，也按住苏晚发抖的手背。你说出迟到太久的抱歉，她哭着点头，又摇头——不是原谅一切，而是愿意再试一次把真实说清楚。\n\n（对应剧本中「陈默调解」支线）",
      dark: false,
    },
    end_redemption_bittersweet: {
      title: "挽回 · 仍有余悸",
      body: "你们重新开口说话，但信任的裂缝需要更长时间愈合。至少这一次，没有人假装一切没发生过。",
      dark: false,
    },
    end_dark_consume: {
      title: "黑暗结局 · 互相消耗",
      body:
        "愤怒与委屈把两个人都推远。你在空房间里反复咀嚼过去，她在沉默里否定自己。爱没有输给第三者，却输给不愿停下的指责与封闭。\n\n警示：决绝而不倾听，容易两败俱伤。",
      dark: true,
    },
    end_dark_mask: {
      title: "黑暗结局 · 假面共生",
      body:
        "还在一起，却像隔着抱枕与屏幕。温柔成了惯性，合照蒙尘，话到嘴边又咽下。\n\n警示：没有坦诚的亲密，只是互相折磨的牢笼。",
      dark: true,
    },
    end_dark_giveup: {
      title: "黑暗结局 · 自我放弃",
      body:
        "你选了「算了」和相亲日程，把心动换成合适。日子像父母那代一样温吞地冷下去。\n\n警示：逃避与妥协，会连同自我一起抵押。",
      dark: true,
    },
    end_lonely: {
      title: "孤独回响",
      body: "骄傲与疲惫让你停在原地。后来你偶尔会想：若当时开口，会不会不一样？",
      dark: true,
    },
    end_regret_pass: {
      title: "遗憾 · 擦肩而过",
      body: "你在拉扯里始终无法承诺「我能」。她不再等你答复，把期待收进画夹，转身走进自己的康复与日常。",
      dark: true,
    },
    end_tug_commit: {
      title: "双向奔赴（拉锯后）",
      body: "你终于承认害怕，也承认心疼。第二次冷静没有成为终点，而成为把话说完的契机。",
      dark: false,
    },
    end_tug_regret: {
      title: "拉锯 · 未完",
      body: "你还在想，她还在痛。故事停在一个没有结局的雨天——适合再玩一周目，换一组选择。",
      dark: true,
    },
    end_neutral_observer: {
      title: "中性结局 · 幕后落幕",
      body:
        "你在陈默车里翻到那本上锁笔记，终于看见被记录的你们：争吵、复合、每一次选择后的批注。你与苏晚联手和他切断往来，却也无法再轻易信任彼此。\n\n你们没有互相毁灭，也没有走回圆满，只把这场关系留在一个体面的句点里。",
      dark: false,
    },
    end_neutral_warm: {
      title: "开放式终章",
      body: "你们没有走向剧本里最标准的句号，但彼此都少了一点伪装。未来交给时间，也交给下一次勇敢开口。",
      dark: false,
    },
    end_neutral_open: {
      title: "留白",
      body: "拾光里总有留白。这一次的故事停在这里——或许正是下一笔画的开始。",
      dark: false,
    },
  };

  function Game() {
    this.state = defaultState();
    this.sceneId = "act1_s1_rain";
    this.ended = false;
    this.endingId = null;
    this._twTimer = null;
    this._twActive = false;
    this._twFullText = "";
    this._twScene = null;
    this._twState = null;
    this._twSessionId = 0;
  }

  Game.prototype.getSavePayload = function () {
    return {
      state: JSON.parse(JSON.stringify(this.state)),
      sceneId: this.sceneId,
      ended: !!this.ended,
      endingId: this.endingId || null,
    };
  };

  Game.prototype.applySavePayload = function (data) {
    if (!data || !data.state || !data.sceneId) return false;
    this.stopTypewriter();
    this.state = data.state;
    if (!this.state.flags) this.state.flags = {};
    if (typeof this.state.mirror !== "number") this.state.mirror = 50;
    this.sceneId = data.sceneId;
    this.ended = !!data.ended;
    this.endingId = data.endingId || null;
    this._twSessionId = (this._twSessionId | 0) + 1;
    return true;
  };

  Game.prototype.reset = function (name) {
    this.stopTypewriter();
    this.state = defaultState(name);
    this.sceneId = "act1_s1_rain";
    this.ended = false;
    this.endingId = null;
    this._twSessionId = 0;
  };

  Game.prototype.persist = function () {
    try {
      localStorage.setItem(
        AUTOSAVE_KEY,
        JSON.stringify({
          state: this.state,
          sceneId: this.sceneId,
          ended: !!this.ended,
          endingId: this.endingId || null,
        })
      );
    } catch (e) {
      console.warn("Save failed", e);
    }
  };

  Game.prototype.load = function () {
    try {
      var raw = localStorage.getItem(AUTOSAVE_KEY);
      if (!raw) {
        raw = localStorage.getItem(SAVE_KEY_LEGACY);
        if (raw) {
          try {
            localStorage.setItem(AUTOSAVE_KEY, raw);
            localStorage.removeItem(SAVE_KEY_LEGACY);
          } catch (m) {}
        }
      }
      if (!raw) return false;
      var data = JSON.parse(raw);
      if (!data || !data.state || !data.sceneId) return false;
      this.state = data.state;
      if (!this.state.flags) this.state.flags = {};
      if (typeof this.state.mirror !== "number") this.state.mirror = 50;
      this.sceneId = data.sceneId;
      this.ended = !!data.ended;
      this.endingId = data.endingId || null;
      return true;
    } catch (e) {
      return false;
    }
  };

  Game.prototype.stopTypewriter = function () {
    if (this._twTimer != null) {
      clearTimeout(this._twTimer);
      this._twTimer = null;
    }
    this._twSessionId = (this._twSessionId | 0) + 1;
    this._twActive = false;
  };

  Game.prototype.attachSceneControls = function (scene, st) {
    var choicesEl = document.getElementById("choices");
    var btnAdvance = document.getElementById("btn-advance");
    var self = this;
    choicesEl.innerHTML = "";
    btnAdvance.classList.add("hidden");
    btnAdvance.onclick = null;
    if (scene.choices && scene.choices.length) {
      scene.choices.forEach(function (ch) {
        if (ch.showIf && !ch.showIf(st)) return;
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = ch.label;
        btn.addEventListener("click", function () {
          applyEffects(st, ch.effect);
          var nxt = resolveNext(ch.next, st);
          self.goTo(nxt);
        });
        li.appendChild(btn);
        choicesEl.appendChild(li);
      });
    } else if (scene.advance) {
      btnAdvance.classList.remove("hidden");
      btnAdvance.onclick = function () {
        var nxt = resolveNext(scene.advance, st);
        self.goTo(nxt);
      };
    }
  };

  Game.prototype._finishTypingReveal = function () {
    var scene = this._twScene;
    var st = this._twState;
    var textEl = document.getElementById("dialogue-text");
    var bodyEl = document.getElementById("dialogue-body");
    var hintEl = document.getElementById("dialogue-hint");
    var indEl = document.getElementById("typing-indicator");
    if (this._twTimer != null) {
      clearTimeout(this._twTimer);
      this._twTimer = null;
    }
    this._twActive = false;
    if (textEl) {
      textEl.textContent = this._twFullText;
      textEl.classList.remove("is-typing");
    }
    if (bodyEl) bodyEl.classList.remove("is-typing");
    if (hintEl) hintEl.classList.add("hidden");
    if (indEl) indEl.classList.remove("is-visible");
    var sg = document.getElementById("screen-game");
    if (sg) sg.classList.remove("is-typing-active");
    if (scene && st) this.attachSceneControls(scene, st);
  };

  Game.prototype.beginTypewriter = function (fullText, scene, st) {
    var self = this;
    var textEl = document.getElementById("dialogue-text");
    var bodyEl = document.getElementById("dialogue-body");
    var hintEl = document.getElementById("dialogue-hint");
    var indEl = document.getElementById("typing-indicator");

    /* render() 已调用 stopTypewriter()，此处只清定时器，避免会话 id 连加两次 */
    if (this._twTimer != null) {
      clearTimeout(this._twTimer);
      this._twTimer = null;
    }

    this._twScene = scene;
    this._twState = st;
    this._twFullText = fullText;
    this._twActive = true;
    var sessionAtStart = this._twSessionId;

    if (textEl) {
      textEl.textContent = "";
      textEl.classList.add("is-typing");
    }
    if (bodyEl) bodyEl.classList.add("is-typing");
    if (hintEl) hintEl.classList.remove("hidden");
    if (indEl) indEl.classList.add("is-visible");

    var chars = Array.from(fullText);
    if (chars.length === 0) {
      this._finishTypingReveal();
      return;
    }

    var i = 0;

    function tick() {
      if (self._twSessionId !== sessionAtStart || !self._twActive) return;
      i += 1;
      if (textEl) textEl.textContent = chars.slice(0, i).join("");
      if (i >= chars.length) {
        self._twTimer = null;
        if (self._twSessionId === sessionAtStart && self._twActive) {
          self._finishTypingReveal();
        }
        return;
      }
      self._twTimer = setTimeout(tick, TYPEWRITER_MS);
    }

    this._twTimer = setTimeout(tick, TYPEWRITER_MS);
  };

  Game.prototype.skipTypewriter = function () {
    if (!this._twActive) return;
    this._finishTypingReveal();
  };

  Game.prototype.pauseBgm = function () {
    var bgm = document.getElementById("bgm");
    if (!bgm) return;
    bgm.pause();
  };

  Game.prototype.applySceneBgm = function (scene) {
    var bgm = document.getElementById("bgm");
    if (!bgm) return;
    applyBgmElementState(bgm);
    var muted = isBgmMuted();
    if (scene && scene.bgm === null) {
      bgm.pause();
      bgm.removeAttribute("src");
      bgm.removeAttribute("data-src");
      try {
        bgm.load();
      } catch (e2) {}
      return;
    }
    var key = scene && scene.bgm;
    var map = typeof GAME_AUDIO !== "undefined" ? GAME_AUDIO : {};
    var url = key && map[key] ? String(map[key]).trim() : "";
    if (!url || muted || bgm.volume <= 0) {
      bgm.pause();
      return;
    }
    if (bgm.getAttribute("data-src") !== url) {
      bgm.src = url;
      bgm.setAttribute("data-src", url);
      try {
        bgm.load();
      } catch (e3) {}
    }
    bgm.play().catch(function () {});
  };

  Game.prototype.getScene = function () {
    return SCENES[this.sceneId];
  };

  Game.prototype.goTo = function (id) {
    if (id === "__ENDING__") {
      this.stopTypewriter();
      var endId = resolveEnding(this.state);
      this.showEnding(endId);
      return;
    }
    this.sceneId = id;
    this.persist();
    this.render();
  };

  Game.prototype.showEnding = function (endId) {
    this.stopTypewriter();
    var end = Endings[endId] || Endings.end_neutral_open;
    this.ended = true;
    this.endingId = endId;
    this.pauseBgm();
    document.getElementById("screen-game").classList.add("hidden");
    document.getElementById("screen-ending").classList.remove("hidden");
    var card = document.querySelector(".ending-card");
    card.classList.toggle("ending-card--dark", !!end.dark);
    document.getElementById("ending-title").textContent = end.title;
    document.getElementById("ending-body").textContent = formatText(end.body, this.state.playerName);
    this.persist();
  };

  Game.prototype.render = function () {
    var scene = this.getScene();
    var st = this.state;
    var name = st.playerName;

    this.stopTypewriter();
    var screenGame = document.getElementById("screen-game");
    if (screenGame) screenGame.classList.remove("is-typing-active");

    if (!scene) {
      console.error("Missing scene:", this.sceneId);
      document.getElementById("scene-badge").textContent = "错误";
      document.getElementById("dialogue-speaker").textContent = "";
      var errText = document.getElementById("dialogue-text");
      if (errText) {
        errText.textContent =
          "未找到场景节点：" + this.sceneId + "。请检查 js/data.js 是否包含该 id。";
        errText.classList.remove("is-typing");
      }
      var db = document.getElementById("dialogue-body");
      if (db) db.classList.remove("is-typing");
      var dh = document.getElementById("dialogue-hint");
      if (dh) dh.classList.add("hidden");
      var ti = document.getElementById("typing-indicator");
      if (ti) ti.classList.remove("is-visible");
      document.getElementById("choices").innerHTML = "";
      document.getElementById("btn-advance").classList.add("hidden");
      return;
    }

    var badge = document.getElementById("scene-badge");
    badge.textContent = scene.sceneTitle || "";

    var speakerEl = document.getElementById("dialogue-speaker");
    var textEl = document.getElementById("dialogue-text");
    var choicesEl = document.getElementById("choices");
    var btnAdvance = document.getElementById("btn-advance");

    speakerEl.textContent = formatText(scene.speaker || "", name);

    choicesEl.innerHTML = "";
    btnAdvance.classList.add("hidden");
    btnAdvance.onclick = null;

    var fullText = formatText(scene.text, name);
    var hasBody = !!(fullText && String(fullText).trim());
    var useTw = shouldUseTypewriter(scene, hasBody);

    if (useTw) {
      if (screenGame) screenGame.classList.add("is-typing-active");
      this.beginTypewriter(fullText, scene, st);
    } else if (hasBody) {
      if (textEl) {
        textEl.textContent = fullText;
        textEl.classList.remove("is-typing");
      }
      var bodyEl0 = document.getElementById("dialogue-body");
      if (bodyEl0) bodyEl0.classList.remove("is-typing");
      var hintEl0 = document.getElementById("dialogue-hint");
      if (hintEl0) hintEl0.classList.add("hidden");
      var indEl0 = document.getElementById("typing-indicator");
      if (indEl0) indEl0.classList.remove("is-visible");
      this.attachSceneControls(scene, st);
    } else {
      if (textEl) {
        textEl.textContent = "";
        textEl.classList.remove("is-typing");
      }
      var bodyEl = document.getElementById("dialogue-body");
      if (bodyEl) bodyEl.classList.remove("is-typing");
      var hintEl = document.getElementById("dialogue-hint");
      if (hintEl) hintEl.classList.add("hidden");
      var indEl = document.getElementById("typing-indicator");
      if (indEl) indEl.classList.remove("is-visible");
      this.attachSceneControls(scene, st);
    }

    var ill = scene.illustration;
    var img = document.getElementById("stage-img");
    var ph = document.getElementById("stage-placeholder");
    var path = resolveIllustrationPath(scene);
    img.onload = function () {
      img.classList.add("is-loaded");
    };
    img.onerror = function () {
      img.classList.remove("is-loaded");
      img.removeAttribute("src");
    };
    if (path) {
      img.alt = scene.sceneTitle || "场景插画";
      if (img.getAttribute("src") !== path) {
        img.classList.remove("is-loaded");
        img.src = path;
      }
    } else {
      img.removeAttribute("src");
      img.classList.remove("is-loaded");
    }
    ph.textContent = illustrationPlaceholderHint(scene, path);

    this.applySceneBgm(scene);
  };

  function init() {
    var game = new Game();

    var title = document.getElementById("screen-title");
    var screenGame = document.getElementById("screen-game");
    var screenEnd = document.getElementById("screen-ending");
    var modalSettings = document.getElementById("modal-settings");
    var setBgmOn = document.getElementById("set-bgm-on");
    var setBgmVol = document.getElementById("set-bgm-volume");
    var setBgmVolVal = document.getElementById("set-bgm-volume-val");
    var saveSlotsList = document.getElementById("save-slots-list");
    var setSaveLabel = document.getElementById("set-save-label");
    var btnSaveNewSlot = document.getElementById("btn-save-new-slot");

    function closeSettingsModal() {
      if (!modalSettings) return;
      modalSettings.classList.add("hidden");
      modalSettings.setAttribute("aria-hidden", "true");
    }

    function syncSettingsAudioUi() {
      if (setBgmOn) setBgmOn.checked = !isBgmMuted();
      if (setBgmVol) {
        setBgmVol.value = String(Math.round(getBgmVolume01() * 100));
        if (setBgmVolVal) setBgmVolVal.textContent = setBgmVol.value + "%";
      }
    }

    function inGameScreen() {
      return screenGame && !screenGame.classList.contains("hidden");
    }

    function updateSaveNewButtonState() {
      if (!btnSaveNewSlot) return;
      btnSaveNewSlot.disabled = !inGameScreen();
    }

    function refreshSaveSlotsList() {
      if (!saveSlotsList) return;
      saveSlotsList.innerHTML = "";
      var slots = getSlots();
      if (slots.length === 0) {
        var empty = document.createElement("li");
        empty.className = "save-slot save-slot--empty";
        empty.textContent = "暂无手动存档";
        saveSlotsList.appendChild(empty);
        return;
      }
      slots.forEach(function (slot, idx) {
        var li = document.createElement("li");
        li.className = "save-slot";
        var name = slot.label || slot.summary || "存档 " + (idx + 1);
        var timeStr = slot.ts
          ? new Date(slot.ts).toLocaleString("zh-CN", {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";
        var meta = document.createElement("div");
        meta.className = "save-slot__meta";
        meta.innerHTML =
          "<span class=\"save-slot__name\">" +
          escapeHtml(name) +
          "</span><span class=\"save-slot__time\">" +
          escapeHtml(timeStr) +
          "</span>";
        var actions = document.createElement("div");
        actions.className = "save-slot__actions";
        var sid = slot.id;
        var btnLoad = document.createElement("button");
        btnLoad.type = "button";
        btnLoad.className = "btn btn--slot";
        btnLoad.textContent = "读取";
        btnLoad.addEventListener("click", function () {
          var list = getSlots();
          var found = list.filter(function (x) {
            return x.id === sid;
          })[0];
          if (!found || !found.data) return;
          game.applySavePayload(found.data);
          game.persist();
          closeSettingsModal();
          title.classList.add("hidden");
          screenEnd.classList.add("hidden");
          if (game.ended) {
            screenGame.classList.add("hidden");
            game.showEnding(game.endingId || resolveEnding(game.state));
          } else {
            screenGame.classList.remove("hidden");
            game.render();
          }
          document.getElementById("btn-continue").classList.remove("hidden");
        });
        var btnDel = document.createElement("button");
        btnDel.type = "button";
        btnDel.className = "btn btn--slot btn--slot-danger";
        btnDel.textContent = "删除";
        btnDel.addEventListener("click", function () {
          var list = getSlots().filter(function (x) {
            return x.id !== sid;
          });
          setSlots(list);
          refreshSaveSlotsList();
        });
        actions.appendChild(btnLoad);
        actions.appendChild(btnDel);
        li.appendChild(meta);
        li.appendChild(actions);
        saveSlotsList.appendChild(li);
      });
    }

    function openSettingsModal() {
      if (!modalSettings) return;
      syncSettingsAudioUi();
      refreshSaveSlotsList();
      updateSaveNewButtonState();
      modalSettings.classList.remove("hidden");
      modalSettings.setAttribute("aria-hidden", "false");
    }

    if (setBgmOn) {
      setBgmOn.addEventListener("change", function () {
        setBgmMuted(!setBgmOn.checked);
        var bgm = document.getElementById("bgm");
        applyBgmElementState(bgm);
        if (inGameScreen()) game.render();
      });
    }
    if (setBgmVol) {
      setBgmVol.addEventListener("input", function () {
        var n = parseInt(setBgmVol.value, 10);
        if (isNaN(n)) n = 70;
        setBgmVolume01(n / 100);
        if (setBgmVolVal) setBgmVolVal.textContent = n + "%";
        var bgm = document.getElementById("bgm");
        applyBgmElementState(bgm);
        if (inGameScreen()) game.render();
      });
    }
    if (document.getElementById("btn-settings-close"))
      document.getElementById("btn-settings-close").addEventListener("click", closeSettingsModal);
    if (document.getElementById("modal-settings-backdrop"))
      document.getElementById("modal-settings-backdrop").addEventListener("click", closeSettingsModal);

    var btnSettings = document.getElementById("btn-settings");
    if (btnSettings) btnSettings.addEventListener("click", openSettingsModal);
    var btnTitleSettings = document.getElementById("btn-title-settings");
    if (btnTitleSettings) btnTitleSettings.addEventListener("click", openSettingsModal);

    if (btnSaveNewSlot) {
      btnSaveNewSlot.addEventListener("click", function () {
        if (!inGameScreen()) return;
        var slots = getSlots();
        if (slots.length >= MAX_SAVE_SLOTS) {
          alert("手动存档已达上限（" + MAX_SAVE_SLOTS + " 个），请先删除旧存档。");
          return;
        }
        var payload = game.getSavePayload();
        var label = (setSaveLabel && setSaveLabel.value) || "";
        label = String(label).trim();
        slots.push({
          id: String(Date.now()) + "_" + Math.random().toString(36).slice(2, 8),
          label: label,
          ts: Date.now(),
          summary: summarizeScene(payload),
          data: payload,
        });
        setSlots(slots);
        if (setSaveLabel) setSaveLabel.value = "";
        refreshSaveSlotsList();
      });
    }

    if (game.load()) {
      document.getElementById("btn-continue").classList.remove("hidden");
    }

    document.getElementById("btn-continue").addEventListener("click", function () {
      if (!game.load()) return;
      title.classList.add("hidden");
      if (game.ended) {
        var eid = game.endingId || resolveEnding(game.state);
        game.showEnding(eid);
      } else {
        screenEnd.classList.add("hidden");
        screenGame.classList.remove("hidden");
        game.render();
      }
    });

    var twTouch = { x: 0, y: 0, tracking: false };

    screenGame.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length !== 1) {
          twTouch.tracking = false;
          return;
        }
        twTouch.tracking = true;
        twTouch.x = e.touches[0].clientX;
        twTouch.y = e.touches[0].clientY;
      },
      { passive: true }
    );

    screenGame.addEventListener(
      "touchend",
      function (e) {
        if (!game._twActive || !twTouch.tracking) return;
        twTouch.tracking = false;
        var t = e.changedTouches[0];
        if (
          Math.abs(t.clientX - twTouch.x) > 16 ||
          Math.abs(t.clientY - twTouch.y) > 16
        ) {
          return;
        }
        if (e.target.closest(".game-hud") || e.target.closest("button")) return;
        e.preventDefault();
        game.skipTypewriter();
      },
      { passive: false }
    );

    screenGame.addEventListener("click", function (e) {
      if (e.target.closest(".game-hud")) return;
      if (e.target.closest("button")) return;
      if (e.target.closest("a")) return;
      if (game._twActive) {
        game.skipTypewriter();
      }
    });

    document.getElementById("btn-start").addEventListener("click", function () {
      var input = document.getElementById("player-name");
      var n = (input.value || "").trim() || "林野";
      game.reset(n);
      title.classList.add("hidden");
      screenGame.classList.remove("hidden");
      game.persist();
      game.render();
    });

    document.getElementById("btn-menu").addEventListener("click", function () {
      game.persist();
      game.pauseBgm();
      screenGame.classList.add("hidden");
      title.classList.remove("hidden");
      if (game.load()) {
        document.getElementById("btn-continue").classList.remove("hidden");
      }
    });

    document.getElementById("btn-replay").addEventListener("click", function () {
      screenEnd.classList.add("hidden");
      title.classList.remove("hidden");
      game.ended = false;
      game.endingId = null;
      try {
        localStorage.removeItem(AUTOSAVE_KEY);
        localStorage.removeItem(SAVE_KEY_LEGACY);
      } catch (e) {}
      document.getElementById("btn-continue").classList.add("hidden");
      game.pauseBgm();
    });

    document.addEventListener("keydown", function (e) {
      if (e.code !== "Space" && e.key !== " ") return;
      var el = e.target;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (title.classList.contains("hidden") && !screenGame.classList.contains("hidden")) {
        if (game._twActive) {
          e.preventDefault();
          game.skipTypewriter();
          return;
        }
        var adv = document.getElementById("btn-advance");
        if (adv && !adv.classList.contains("hidden")) {
          e.preventDefault();
          adv.click();
        }
      }
    });

    var bgm = document.getElementById("bgm");
    if (bgm) bgm.removeAttribute("src");
  }

  document.addEventListener("DOMContentLoaded", init);
})();

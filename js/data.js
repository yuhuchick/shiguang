/* global SCENES, GAME_AUDIO, SCENE_IMAGE_FILES */
/**
 * 背景音乐占位：填入 assets/audio 下实际文件名后生效（如 "assets/audio/rain.mp3"）。
 * 留空字符串则引擎不加载，避免 404 报错。
 */
var GAME_AUDIO = {
  title: "",
  rain: "",
  cafe: "",
  calm: "",
  tense: "",
};

/**
 * 插画编号 → 文件名（置于 assets/images/）。
 * null 表示该编号暂无图、不请求网络；未列出的编号仍回退为 scene-NN.png。
 */
var SCENE_IMAGE_FILES = {
  1: "scene-01-rain-cafe.png",
  2: "scene-02-melancholy.png",
  3: "scene-03-second-meet.png",
  4: "scene-04-phone.png",
  5: null,
  6: "scene-06-mother.png",
  7: "scene-07-su-nian.png",
  8: "scene-08-hand-injury.png",
  9: "scene-09-pseudo-romance.png",
  10: "scene-10-ending-hometown.png",
};

var SCENES = {
  act1_s1_rain: {
    illustration: 1,
    bgm: "rain",
    sceneTitle: "第一幕 · 初遇 · 雨天咖啡馆",
    speaker: "旁白",
    text:
      "阴沉的雨天，{player}推门进了一家小众咖啡馆，浑身湿透，狼狈地找位置坐下，手里攥着皱巴巴的工作文件。\n靠窗的位置，一个女生低头画插画，桌上一杯热拿铁，旁侧放着一把折叠伞。\n（音效占位：雨声、店内轻音乐、笔尖沙沙）",
    advance: "act1_s1_water",
  },
  act1_s1_water: {
    illustration: 1,
    speaker: "苏晚",
    text: "她听见咳嗽声，抬起头，温柔地笑了笑，递来纸巾与一杯热柠檬水。\n「看你浑身都湿了，喝杯热水暖暖身子吧，别感冒了。」",
    choices: [
      {
        label: "「谢谢，帮大忙了。」自然地接过水和纸巾。",
        next: "act1_s1_wa",
        effect: { affection: 5, trust: 3 },
      },
      {
        label: "「心意领了。」请她把东西放桌角，自己擦。",
        next: "act1_s1_wb",
        effect: { affection: 2, self: 2 },
      },
      {
        label: "「我坐一会儿就走，别折腾你。」摆手示意不用。",
        next: "act1_s1_wc",
        effect: { affection: -3, trust: -2, self: 1 },
      },
    ],
  },
  act1_s1_wa: {
    illustration: 1,
    speaker: "旁白",
    text: "苏晚笑了笑，没有多打扰，回到座位继续画画，却仍会悄悄看你一眼。热水下肚，紧绷的肩背松了一点。",
    advance: "act1_s1_picture",
  },
  act1_s1_wb: {
    illustration: 1,
    speaker: "旁白",
    text: "她并不勉强，把东西轻轻放在桌角。你独自坐了一会儿，雨声里咖啡机发出规律的声响。",
    advance: "act1_s1_picture",
  },
  act1_s1_wc: {
    illustration: 1,
    speaker: "旁白",
    text: "她指尖顿了顿，仍温和地点头，退回自己的座位。空气里浮着尴尬的安静。",
    advance: "act1_s1_picture",
  },
  act1_s1_picture: {
    illustration: 1,
    speaker: "旁白",
    text: "你无意间瞥见她画纸一角——雨天的咖啡馆，角落里有个湿透却挺直的身影，轮廓与你出奇地像。",
    choices: [
      {
        label: "走过去，半开玩笑：「入画了？画得比我本人体面。」",
        next: "act1_s1_pa",
        effect: { affection: 5, trust: 5 },
      },
      {
        label: "等她抬眼，只对视一笑，不多说。",
        next: "act1_s1_pb",
        effect: { affection: 3, trust: 2 },
      },
      {
        label: "收回目光，埋头整理文件，当没看见。",
        next: "act1_s1_pc",
        effect: { self: 3 },
      },
    ],
  },
  act1_s1_pa: {
    illustration: 1,
    speaker: "苏晚",
    text: "她耳尖微红：「被你发现啦……雨天的人，本来就容易写进画里。」",
    advance: "act1_s1_umbrella",
  },
  act1_s1_pb: {
    illustration: 1,
    speaker: "旁白",
    text: "她与你对视时笑意更深，却没有追问，只在画纸上多描了几笔雨丝。",
    advance: "act1_s1_umbrella",
  },
  act1_s1_pc: {
    illustration: 1,
    speaker: "旁白",
    text: "她脸上的光淡了一瞬，随即又低头作画，像什么都没发生。",
    advance: "act1_s1_umbrella",
  },
  act1_s1_umbrella: {
    illustration: 1,
    speaker: "苏晚",
    text: "雨势不减。她又走过来，把折叠伞递到你面前：「拿着吧，我家就在附近。」",
    choices: [
      {
        label: "接过伞，约还伞和便饭，顺势互留微信。",
        next: "act1_s1_ua",
        effect: { affection: 3, trust: 3 },
      },
      {
        label: "「雨总会停的。」笑笑，不收伞。",
        next: "act1_s1_ub",
        effect: { affection: -2, trust: -1, self: 2, flags: { missed_second: true } },
      },
      {
        label: "接过伞，郑重道谢，不提下次见、也不加好友。",
        next: "act1_s1_uc",
        effect: { affection: 1, self: 1 },
      },
    ],
  },
  act1_s1_ua: {
    illustration: 1,
    speaker: "旁白",
    text: "她报上微信，指尖在伞柄上停了一秒，像在犹豫什么。",
    advance: "act1_s1_turn",
  },
  act1_s1_ub: {
    illustration: 1,
    speaker: "旁白",
    text: "「……好。」她把伞慢慢收回包里，笑还在，却薄得像雨雾。",
    advance: "act1_s1_turn",
  },
  act1_s1_uc: {
    illustration: 1,
    speaker: "旁白",
    text: "她点点头，没有坚持。你握着尚带余温的伞柄，心里掠过一丝说不清的亏欠。",
    advance: "act1_s1_turn",
  },
  act1_s1_turn: {
    illustration: 2,
    speaker: "镜头（玩家未察觉）",
    text:
      "她转身回座时，下意识皱了皱眉，指节攥紧衣角，神色有一瞬落寞——这些细节，你没看见。\n你低头删了写了一半的一条消息；草稿箱里还躺着好几封没寄出的道歉，你从不让人看见。\n（插画占位：苏晚落寞特写）",
    advance: "act1_s2_gate",
  },
  act1_s2_gate: {
    illustration: 3,
    speaker: "旁白",
    text: "时间向前推进。那场雨留在记忆里，像一行未干的墨迹。",
    advance: function (s) {
      return s.flags.missed_second ? "act1_s2_late" : "act1_s2_second";
    },
  },
  act1_s2_second: {
    illustration: 3,
    sceneTitle: "第二次相遇 · 朋友圈的「完美」",
    speaker: "旁白",
    text:
      "几天后在同一家咖啡馆，你们又遇见——你还了伞，坐下来聊开。她穿着简约白裙，妆容干净，聊插画、聊生活，句句落在你心里。\n若上次雨中已加好友，她的朋友圈像被阳光筛过：早餐、晚霞、插画碎片、温柔句子；若上次只道了谢、这次才互扫微信，你也第一次点开了她的动态。\n（音效占位：消息提示音）",
    advance: "act1_s2_o4",
  },
  act1_s2_late: {
    illustration: 1,
    speaker: "旁白",
    text:
      "那天你没收她的伞，也没留任何联系方式，故事像停在雨里——直到某个加班的深夜，你在常逛的插画论坛匿名发了一句：「好累，连个说话的人都没有。」帖是公开的，你却当它说给空气听。\n她却从线稿里那扇熟悉的落地窗、还有你聊天时随口说过的口头禅认出了你，发来私信——像一直在屏幕另一端守着。",
    advance: "act1_s2_o6_only",
  },
  act1_s2_o4: {
    illustration: 3,
    speaker: "旁白",
    text: "你划着她的动态，心里泛起一种近乎不真实的「刚刚好」。",
    choices: [
      {
        label: "点个赞，评论写得像同事寒暄一样得体。",
        next: "act1_s2_deep",
        effect: { affection: 4, trust: 3 },
      },
      {
        label: "一条条看完，关掉页面，不点赞也不留言。",
        next: "act1_s2_doubt",
        effect: { affection: 1, trust: 1, self: 4 },
      },
      {
        label: "私信问：能发这张原图吗？想当壁纸。",
        next: "act1_s2_deep",
        effect: { affection: 3, trust: 1, self: 2 },
      },
    ],
  },
  act1_s2_doubt: {
    illustration: 3,
    speaker: "旁白",
    text: "你把疑虑压在心底，却仍被她的温柔牵着走。深夜加班时，你对她的聊天框打了又删，最后什么也没发——只觉得胸口发闷。",
    advance: "act1_s2_o6_only",
  },
  act1_s2_deep: {
    illustration: 3,
    speaker: "苏晚（消息）",
    text: "她很快回复：「谢谢你呀……其实我也有很多不完美，只是习惯记录美好瞬间。」\n你说起原生家庭、强势的母亲、缺席的父亲——却下意识跳过你也曾在上一段关系里先松手、用沉默逼对方崩溃的那段。\n她沉默很久，回了一句：「我懂，我会一直陪着你。」\n（镜头：她盯着手机，眼眶泛红，手里攥着一张旧合照。）",
    advance: "act1_s2_o5",
  },
  act1_s2_o5: {
    illustration: 3,
    speaker: "旁白",
    text: "那一瞬，你觉得她好像也难过——但你选择：",
    choices: [
      {
        label: "「你刚才也不对劲，愿意说说吗？」把话头引向她。",
        next: "act1_s2_lift",
        effect: { trust: 5, secret: 10 },
      },
      {
        label: "抓紧机会，把憋久的家事一口气倒完。",
        next: "act1_s2_lift",
        effect: { affection: 1, self: -2 },
      },
      {
        label: "用玩笑截住：「不说这个了，老电影还约不约？」",
        next: "act1_s2_lift",
        effect: { trust: 2, affection: 3 },
      },
    ],
  },
  act1_s2_o6_only: {
    illustration: 4,
    speaker: "苏晚（消息）",
    text: "「还没下班吗？注意休息，我给你点了外卖，记得吃。」",
    choices: [
      {
        label: "「你怎么知道我还在公司？」回个哭笑不得的表情。",
        next: "act1_s2_lift",
        effect: { affection: 5, trust: 4 },
      },
      {
        label: "「别操心这个，我自己安排。」",
        next: "act1_s2_lift",
        effect: { trust: 1, self: 3 },
      },
      {
        label: "「好，谢谢。」简短结束对话。",
        next: "act1_s2_lift",
        effect: { affection: -1, self: 2 },
      },
    ],
  },
  act1_s2_lift: {
    illustration: 3,
    sceneTitle: "升温前的细缝",
    speaker: "旁白",
    text:
      "关系升温。她送你一幅小画，背面写着「拾光有你，满心欢喜」。\n可相处时，她总握着手机，消息一来，神色便闪过一丝不自然，又迅速被温柔盖过。\n你也并非全然坦白：为了维持「情绪稳定」的形象，你把一条前任半夜发来的未读消息长期置顶折叠，从不点开。\n（插画占位：手机与「姐姐」的对话可后续在分支出现）",
    advance: "act1_s2_o7",
  },
  act1_s2_o7: {
    illustration: 4,
    speaker: "旁白",
    text: "这一刻，你决定：",
    choices: [
      {
        label: "当没注意，继续聊别的，给她留台阶。",
        next: "act2_ambiguous_month2",
        effect: { affection: 3, trust: 5, secret: 5, mirror: 6 },
      },
      {
        label: "「谁的消息？有事你可以先去忙。」直说但不逼供。",
        next: "act2_ambiguous_month2",
        effect: { affection: -2, trust: 2, secret: 5, self: 2, mirror: -2 },
      },
      {
        label: "她去洗手间，你帮她把手机扣过去防旁人看见——亮着的屏幕在你指下停了一秒。",
        next: "act1_s2_peek",
        effect: { affection: -5, trust: -10, self: -3, secret: 25, mirror: 4 },
      },
    ],
  },
  act1_s2_peek: {
    illustration: 4,
    sceneTitle: "伏笔 · 备注「姐姐」",
    speaker: "屏幕上的字句",
    text:
      "备注「姐姐」的人发来：「你别再装了，你根本不是那样的人……」\n她回：「我不想失去他……」\n脚步声近，苏晚脸色瞬间苍白。\n（音频占位：心跳/呼吸）",
    advance: "act2_ambiguous_month2",
  },
  act2_ambiguous_month2: {
    illustration: 5,
    sceneTitle: "第二幕 · 暧昧 · 复刻的温柔",
    speaker: "旁白",
    text:
      "接下来的两个月，你们保持着若即若离的频率。\n你前一晚只在和陈默的语音里提过「胃不好还总嘴馋辣」，第二天她就拎来低辣卤味和温水；你夸她懂你，她只是笑，说「巧合啦」。\n你没追问她为何总能踩中你的偏好——也没提你聊天记录里那句「我只会照着教程当好恋人」。",
    choices: [
      {
        label: "顺着这份默契走下去，把它当成天意。",
        next: "act2_month",
        effect: { affection: 4, trust: 4, mirror: 8, self: -2 },
      },
      {
        label: "半开玩笑试探：「你像提前拿了我的偏好清单。」",
        next: "act2_month",
        effect: { trust: 2, secret: 8, self: 2, mirror: -3 },
      },
      {
        label: "主动坦白：「我有时在演好恋人，不太会表达真实情绪。」",
        next: "act2_month",
        effect: { trust: 6, self: 5, secret: 10, mirror: -8, flags: { hero_self_disclose: true } },
      },
    ],
  },
  act2_month: {
    illustration: 5,
    bgm: "cafe",
    sceneTitle: "第二幕 · 告白与隐瞒",
    speaker: "旁白",
    text:
      "一个月过去。你约在初遇的咖啡馆，蜡烛、鲜花，手里是她常提起的颜料。\n这三十天里，你也曾在凌晨开车绕圈、把几次崩溃咽回去——从没对她提过。\n（插画占位：告白场景）",
    advance: "act2_confess",
  },
  act2_confess: {
    illustration: 5,
    speaker: "{player}",
    text:
      "「苏晚，这一个月我很开心。你是第一个懂我、陪我的人……我喜欢你，能不能做我女朋友？」\n她愣住，睫毛颤了颤，像有话梗在喉咙。",
    choices: [
      {
        label: "「不论是什么，我想认真和你在一起。」握住她的手。",
        next: "act2_secret_full",
        effect: { trust: 10, secret: 30, mirror: 5 },
      },
      {
        label: "「我不逼你，你想清楚再告诉我也不迟。」",
        next: "act2_secret_mid",
        effect: { trust: 5, secret: 20, mirror: 2 },
      },
      {
        label: "「别一直让我猜，给句痛快话。」",
        next: "act2_confess_fail",
        effect: { trust: -5, affection: -3, self: 2, mirror: -2 },
      },
    ],
  },
  act2_secret_full: {
    illustration: 5,
    speaker: "苏晚",
    text:
      "她哭了：朋友圈很多是「演」的——讨好型人格、害怕被丢下、迎合你的喜好。\n「我会敏感、会乱想……我怕你觉得我虚伪。那些画……不少是临摹，我怕配不上你。」\n（第一次反转：打破「完美恋人」滤镜）",
    advance: "act2_o9",
  },
  act2_secret_mid: {
    illustration: 5,
    speaker: "苏晚",
    text:
      "她哽咽着说出相似的真相，却总在关键处停住，像怕你立刻松手。\n你听得心里发紧：原来温柔背后，是长期训练出来的「懂事」。",
    advance: "act2_o9",
  },
  act2_o9: {
    illustration: 5,
    speaker: "旁白",
    text: "秘密揭开后的沉默里，你：",
    choices: [
      {
        label: "抱住她：「不用演给我看，敏感、临摹都没关系。」",
        next: "act3_mother_track",
        effect: { affection: 10, trust: 10, self: 5, mirror: -4 },
      },
      {
        label: "「……我需要一个人静静，先别联系。」",
        next: "act3_cool_track",
        effect: { affection: -3, trust: -5, self: 3, mirror: -3 },
      },
      {
        label: "嘴上安抚：「以后别再瞒我。」心里却开始反复核对细节。",
        next: "act3_suspicious_track",
        effect: { affection: 5, trust: 3, mirror: 5 },
      },
      {
        label: "「我早该想到。」转身拿外套准备走。",
        next: "act3_leave_track",
        effect: { affection: -10, trust: -10, mirror: -6 },
      },
      {
        label: "深吸一口气：「我也有事瞒着你，我不想只让你一个人认错。」",
        next: "act2_hero_secret",
        effect: { trust: 6, self: 8, secret: 12, mirror: -10, flags: { hero_secret_revealed: true } },
      },
    ],
  },
  act2_hero_secret: {
    illustration: 5,
    speaker: "{player}",
    text:
      "你第一次把自己也摆上桌面：\n17 岁时你发现父亲出轨，却把证据删掉，换来父母近十年的冷战；24 岁那段三年恋情里，你总说「都听你的」，却用沉默逼对方先道歉。\n你低声说：「我不是单纯被伤害的那个人。我也会控制、会演。」\n苏晚看着你，眼神里的防备第一次松动。",
    advance: "act3_mother_track",
  },
  act3_mother_track: {
    illustration: 6,
    sceneTitle: "见家长 · 三角张力",
    speaker: "旁白",
    text:
      "你们正式在一起，她慢慢敢抱怨、敢素颜、敢拒绝。林母得知后，要你们回家吃饭。\n饭桌上，挑剔的话像针：「你这样照顾不好林野，分了吧。」苏晚红着眼，仍挤出笑：「阿姨，我会努力改。」\n（插画占位：林母刁难）",
    advance: "act3_o10",
  },
  act3_cool_track: {
    illustration: 1,
    speaker: "陈默",
    text:
      "冷静期里，陈默拍你肩膀：「她不是成心骗你，是太怕失去。伪装有时是缺安全感，不是恶意。」\n（音频占位：咖啡馆环境音）",
    advance: "act3_o11",
  },
  act3_suspicious_track: {
    illustration: 7,
    sceneTitle: "苏念",
    speaker: "苏念",
    text:
      "你心里的刺没拔干净，追问与查看变多。她在温柔里又一次缩回壳里。\n苏念堵在你常去的咖啡馆：「你从没真正接纳她，你只是喜欢那个『完美版』。」\n（插画占位：苏念与林野）",
    advance: "act3_o12",
  },
  act3_leave_track: {
    illustration: 2,
    speaker: "旁白",
    text: "你转身离开，留她在咖啡馆里哭很久。后来，你删掉了联系方式。",
    advance: "act3_o13",
  },
  act2_confess_fail: {
    illustration: 2,
    speaker: "苏晚",
    text: "她眼神黯下去，擦掉眼泪：「好，我知道了。」推门走进雨里。",
    advance: "act3_o13",
  },
  act3_o10: {
    illustration: 6,
    speaker: "旁白",
    text: "你站在两人之间，必须表态。",
    choices: [
      {
        label: "站起来打断：「她不用为那句话改。」",
        next: "act4_truth_gate",
        effect: { affection: 10, trust: 8, self: 5 },
      },
      {
        label: "温声劝母亲别动气，桌下捏捏苏晚的手——示意她先忍。",
        next: "act4_truth_gate",
        effect: { affection: -5, trust: -8, self: -3 },
      },
      {
        label: "僵坐着，低头喝咖啡，假装没听见火药味。",
        next: "act4_truth_gate",
        effect: { affection: -3, trust: -5, self: 1 },
      },
    ],
  },
  act3_o11: {
    illustration: 17,
    speaker: "旁白",
    text: "你听进了多少？",
    choices: [
      {
        label: "写长消息认错，约她当面把话说完。",
        next: "act4_truth_gate",
        effect: { affection: 8, trust: 8 },
      },
      {
        label: "回「让我再想想」，然后把手机扣在桌上。",
        next: "act4_truth_gate",
        effect: { affection: 2, trust: 2, flags: { tug_war: true } },
      },
      {
        label: "「别再互相耗了。」发完就关掉对话框。",
        next: "__ENDING__",
        effect: { affection: -8, trust: -8, flags: { ending_regret_pass: true } },
      },
    ],
  },
  act3_o12: {
    illustration: 7,
    speaker: "旁白",
    text: "面对苏念，你：",
    choices: [
      {
        label: "「她还瞒了什么？我想听全。」",
        next: "act4_truth_gate",
        effect: { secret: 20, trust: 5 },
      },
      {
        label: "「轮不到你来定对错。」",
        next: "act4_truth_gate",
        effect: { affection: -5, trust: -5, self: 2 },
      },
      {
        label: "「我也在用力，不是只有她在受伤。」",
        next: "act4_truth_gate",
        effect: { affection: -3, trust: -3, self: 1 },
      },
    ],
  },
  act3_o13: {
    illustration: 2,
    speaker: "旁白",
    text: "断联之后，夜里总会反刍那些温柔与眼泪。你决定：",
    choices: [
      {
        label: "托陈默约她，承认自己当时太硬。",
        next: "act3_chen_mediate",
        effect: { affection: 8, trust: 8, flags: { path_redemption: true } },
      },
      {
        label: "夜夜反刍，却拉不下脸发第一条消息。",
        next: "__ENDING__",
        effect: { flags: { ending_lonely: true } },
      },
      {
        label: "把工作排满，用「这样对彼此都好」说服自己。",
        next: "__ENDING__",
        effect: { flags: { path_release: true } },
      },
    ],
  },
  act3_chen_mediate: {
    illustration: 17,
    sceneTitle: "挽回 · 陈默调解",
    speaker: "陈默",
    text:
      "僻静卡座里，陈默一手搭着你肩，一手轻拍苏晚手背。两杯热柠檬水冒着气，他的冰咖啡却一口没动。\n「别再错过了——把真话说完。」\n他说这句话时像在复述一段台词。你忽然注意到他手机备忘录里，有你们争吵日期的缩写。\n（插画占位：三人调解）",
    choices: [
      {
        label: "先把眼前的话说完，按他给的台阶往下走。",
        next: "act4_truth_gate",
        effect: { trust: 2, affection: 2, mirror: 4 },
      },
      {
        label: "借口去拿纸巾，转去停车场，想确认他车里的那本黑皮笔记。",
        next: "act4_chen_notes",
        effect: { secret: 18, self: 4, mirror: -6 },
      },
    ],
  },
  act4_chen_notes: {
    illustration: 17,
    sceneTitle: "幕后 · 旁观者的局",
    speaker: "旁白",
    text:
      "你在副驾下摸到一本上锁笔记，最后一页夹着便签：\n「样本 L 与 S 的镜像值持续升高；当一方主动坦白，另一方防御会短暂下降。」\n你愣在原地，终于意识到：这段关系并非只有你们两个人在场。\n你把笔记拍给苏晚。她沉默很久，只回了一句：「我们都被当成变量了。」",
    advance: function (s) {
      s.flags.ending_observer = true;
      return "__ENDING__";
    },
  },
  act4_truth_gate: {
    illustration: 8,
    bgm: "tense",
    speaker: "旁白",
    text: "许多碎片终于凑成轮廓——你站在真相的门口。",
    advance: function (s) {
      return s.secret >= 50 ? "act4_truth_full" : "act4_truth_partial";
    },
  },
  act4_truth_full: {
    illustration: 9,
    sceneTitle: "真相 · 双重反转",
    speaker: "旁白 / 苏晚",
    text:
      "「姐姐」是她闺蜜：曾患抑郁，她陪对方走过漫长黑夜，甚至有过一段「假性恋爱」式的守护——所以手机离不开身，神色才闪躲。\n另一件事更疼：右手幼时为保护妹妹受伤，久画会痛，她才临摹、才用左手慢慢练，却不敢说「残缺」。\n（插画占位：右手伤痕与公园长椅陪伴）",
    advance: "act4_o14",
  },
  act4_truth_partial: {
    illustration: 8,
    sceneTitle: "真相 · 尚未完全揭开",
    speaker: "旁白",
    text:
      "你只隐约感到：她的手机里藏着必须即时回应的人，她的右手有时会悄悄藏到桌下。\n秘密解锁不足 50%：若多周目，试着在相处中多问一句、多停一步，或走苏念线，拼凑完整真相。\n（当前流程仍进入关键抉择，数值将影响结局基调。）",
    advance: "act4_o14",
  },
  act4_o14: {
    illustration: 8,
    sceneTitle: "第三幕 · 终局前的抉择",
    speaker: "旁白",
    text: "知道这些之后，你心底最先浮起的是：",
    choices: [
      {
        label: "「以后右手的事、你姐的事，都别一个人扛。」",
        next: "act4_positive_fork",
        effect: { affection: 15, trust: 15, self: 8 },
      },
      {
        label: "「信息量太大……给我几天。」",
        next: "act4_tug_second",
        effect: { affection: -5, trust: -5, self: 3, flags: { tug_war: true } },
      },
      {
        label: "「一次次瞒到现在，我信不动了。」",
        next: "__ENDING__",
        effect: { flags: { ending_dark1: true } },
      },
      {
        label: "当面说「没关系」，回去却开始已读不回、约会迟到。",
        next: "act4_mask_narrative",
        effect: { affection: 2, trust: -10 },
      },
    ],
  },
  act4_mask_narrative: {
    illustration: 18,
    speaker: "旁白",
    text:
      "你们仍同框出现，却像隔着抱枕与屏幕。合照倒扣，茶凉在桌上，雨敲玻璃，室内只剩死寂的礼貌。\n（插画占位：假面共生恶化）",
    advance: function (s) {
      s.flags.ending_dark2 = true;
      return "__ENDING__";
    },
  },
  act4_positive_fork: {
    illustration: 10,
    sceneTitle: "第三幕 · 拾光与选择",
    speaker: "旁白",
    text:
      "你开始陪她复健、去见闺蜜、听她讲童年。也坦白自己的逃避：怕像父母那样冷战收场——也承认你会查聊天记录、会装大度，其实和她一样在演「没事」。\n林母在你们的坚持里慢慢松口。\n终局前，你想把未来落在哪里？",
    advance: "act4_o15",
  },
  act4_tug_second: {
    illustration: 16,
    sceneTitle: "拉锯 · 独自康复的她",
    speaker: "旁白",
    text:
      "第二次冷静期。她不再轰炸消息，只默默复健、画画、陪闺蜜。桌角便签写着：「姐，我放学给你带饭。」\n林母问你：能不能一辈子包容她的秘密与右手？",
    advance: "act4_o16",
  },
  act4_o15: {
    illustration: 11,
    bgm: "calm",
    speaker: "旁白",
    text: "最后一步，你选择：",
    choices: [
      {
        label: "陪她去老家，走一遍她长大的街，把旧事摊开晒。",
        next: "__ENDING__",
        effect: { flags: { chose_hometown: true } },
      },
      {
        label: "租个小地方做工作室，让她的左手和画笔都慢下来。",
        next: "__ENDING__",
        effect: { flags: { chose_studio: true } },
      },
    ],
  },
  act4_o16: {
    illustration: 6,
    speaker: "旁白",
    text: "你回答母亲，也回答自己：",
    choices: [
      {
        label: "「我能负责，选她。」",
        next: "__ENDING__",
        effect: { flags: { tug_commit: true, chose_hometown: true } },
      },
      {
        label: "「一辈子太长，我现在答不上来。」",
        next: "__ENDING__",
        effect: { flags: { ending_regret_pass: true } },
      },
      {
        label: "顺着母亲的意思分手，说是不想耽误她。",
        next: "__ENDING__",
        effect: { flags: { ending_dark3: true }, self: -15, trust: -10 },
      },
    ],
  },
};

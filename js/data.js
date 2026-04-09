/* global SCENES, GAME_AUDIO, SCENE_IMAGE_FILES */
/**
 * 背景音乐占位
 */
var GAME_AUDIO = {
  title: "",
  rain: "",
  cafe: "",
  calm: "",
  tense: "",
};

/**
 * 插画编号修复：删除未定义编号，统一匹配现有资源，解决引擎报错
 */
var SCENE_IMAGE_FILES = {
  1: "scene-01-rain-cafe.png",
  2: "scene-02-melancholy.png",
  3: "scene-03-second-meet.png",
  4: "scene-04-phone.png",
  5: "scene-05-confession.png", // 原null修改，适配告白场景
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
    text: [
      "阴沉的雨天，{player}推门进了一家小众咖啡馆，浑身湿透，狼狈地找位置坐下，手里攥着皱巴巴的工作文件。",
      "发小陈默早就劝你别总熬到深夜，你却总用工作搪塞过去。",
      "靠窗的位置，一个女生低头画插画，桌上一杯热拿铁，旁侧放着一把折叠伞。",
      "（音效占位：雨声、店内轻音乐、笔尖沙沙）",
    ],
    advance: "act1_s1_water",
  },
  act1_s1_water: {
    illustration: 1,
    speaker: "苏晚",
    text: [
      "她听见咳嗽声，抬起头，温柔地笑了笑，递来纸巾与一杯热柠檬水。",
      "「看你浑身都湿了，喝杯热水暖暖身子吧，别感冒了。」",
    ],
    choices: [
      {
        label: "「谢谢，帮大忙了。」自然地接过水和纸巾。",
        next: "act1_s1_wa",
        effect: { affection: 5, trust: 3, mirror: 2 },
      },
      {
        label: "「心意领了。」请她把东西放桌角，自己擦。",
        next: "act1_s1_wb",
        effect: { affection: 2, self: 2, mirror: 1 },
      },
      {
        label: "「我坐一会儿就走，别折腾你。」摆手示意不用。",
        next: "act1_s1_wc",
        effect: { affection: -3, trust: -2, self: 1, mirror: 0 },
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
        label:
          "「雨总会停的。」笑笑，不收伞：「我们加个联系方式吧，等下次雨停之时见面」",
        next: "act1_s1_ub",
        effect: {
          affection: -2,
          trust: -1,
          self: 2,
          flags: { missed_second: true },
        },
      },
      {
        label: "接过伞，郑重道谢，不提下次见、也没有加好友。",
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
    text: [
      "她转身回座时，下意识皱了皱眉，指节攥紧衣角，神色有一瞬落寞——这些细节，你没看见。",
      "不远处，她的妹妹苏念悄悄看着这一切，眉头紧锁。",
      "（插画占位：苏晚落寞特写）",
    ],
    advance: "act1_daily_go_home", // 【修改】跳转新增日常过渡
  },
  // 【新增】第一幕 雨天回家·纯日常过渡（无影响）
  act1_daily_go_home: {
    illustration: 1,
    bgm: "rain",
    speaker: "旁白",
    text: [
      "你撑着那把温热的伞走进雨幕，鞋底踩碎路边的水洼。",
      "回到家，你把湿衣服换下，泡了一杯热茶，手机里还存着刚加上的微信好友。",
      "伞靠在玄关，伞面上的雨滴慢慢滑落，像今天这场意外相遇的余温。",
    ],
    advance: "act1_daily_rest", // 跳转下一个日常
  },
  // 【新增】第一幕 居家休息·纯日常过渡（无影响）
  act1_daily_rest: {
    illustration: 2,
    bgm: "calm",
    speaker: "旁白",
    text: [
      "你瘫在沙发上刷了会儿工作消息，疲惫感涌了上来。",
      "窗外的雨还在下，咖啡馆里的温柔侧脸却莫名在脑海里挥之不去。",
      "你没有发消息打扰，只是默默把对方的微信备注改成了「苏晚」。",
    ],
    advance: "act1_s2_gate", // 回归原剧情
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
    text: [
      "几天后，你与苏晚在咖啡馆重逢。归还雨伞后，两人相谈甚欢。",
      "回到家后，你点开她的朋友圈，里面全是治愈的日常碎片，温柔得像一层精心编织的滤镜。",
      "（音效占位：消息提示音）",
    ],
    advance: "act1_s2_o4",
  },
  act1_s2_late: {
    illustration: 1,
    speaker: "旁白",
    text: [
      "那天你没收伞、也没留联系方式，两人就此断了交集。",
      "加班到深夜，你习惯性走进这家咖啡馆。",
    ],
    advance: "act1_s2_late_2",
  },
  act1_s2_late_2: {
    illustration: 1,
    speaker: "旁白",
    text: "意外与苏晚重逢。她认出了你，温柔地笑了笑，打破了久别后的陌生。你们互换了联系方式，开心的聊了一会后道别了",
    advance: "act1_s2_o6_only",
  },
  act1_s2_o4: {
    illustration: 3,
    speaker: "旁白",
    text: "你划着她的动态：清晨窗台上的手冲咖啡、傍晚地铁口被雨打湿的霓虹、配着老电影台词的插画草稿、还有一句句像替你说出的晚安。越往下看，你心里越泛起一种近乎不真实的「刚刚好」。",
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
    text: "深夜加班时，你对她的聊天框打了又删，最后什么也没发——只觉得胸口发闷。",
    advance: "act1_s2_o6_only",
  },
  act1_s2_deep: {
    illustration: 3,
    speaker: "苏晚（消息）",
    text: "她很快回复：「谢谢你呀……其实我也有很多不完美，只是习惯记录美好瞬间。」",
    advance: "act1_s2_deep_2",
  },
  act1_s2_deep_2: {
    illustration: 3,
    speaker: "苏晚（消息）",
    text: "聊了几句无关紧要的日常，她忽然轻轻说：「感觉你最近好像有点累……如果不想说也没关系，我陪着你就好。」",
    advance: "act1_s2_deep_3",
  },
  act1_s2_deep_3: {
    illustration: 3,
    speaker: "旁白",
    text: [
      "就是这句不逼问、不探究的温柔，让你紧绷的情绪忽然软下来。",
      "你沉默了一会儿，慢慢说起自己的家庭——强势的母亲，缺席的父亲，还有一直以来压在心底的疲惫。",
    ],
    advance: "act1_s2_deep_4",
  },
  act1_s2_deep_4: {
    illustration: 3,
    speaker: "旁白",
    text: "只是说到上一段感情时，你还是下意识停住了，没有说出自己也曾用沉默伤害过别人。",
    advance: "act1_s2_deep_5",
  },
  act1_s2_deep_5: {
    illustration: 3,
    speaker: "苏晚（消息）",
    text: [
      "她隔了很久才回：「我懂，我会一直陪着你。」",
      "（镜头：她盯着手机，眼眶泛红，手里攥着一张旧合照。）",
    ],
    advance: "act1_s2_o5",
  },
  act1_s2_o5: {
    illustration: 3,
    speaker: "旁白",
    text: "那一瞬，你觉得她好像也难过——你选择：",
    choices: [
      {
        label: "「你好像也有点不开心，愿意说说吗？」把话头引向她。",
        next: "act1_s2_o5_open",
        effect: { trust: 6, secret: 12, mirror: -2 },
      },
      {
        label: "抓紧机会，把憋久的家事一口气倒完。",
        next: "act1_s2_o5_overflow",
        effect: { affection: 1, self: -3, trust: -1, mirror: 3 },
      },
      {
        label: "用玩笑截住：「不说这个了，下次我们去看电影吧」",
        next: "act1_s2_o5_deflect",
        effect: { trust: 2, affection: 3, mirror: 2, secret: -2 },
      },
    ],
  },
  act1_s2_o6_only: {
    illustration: 4,
    speaker: "苏晚（消息）",
    text: "「hello好久不见呀，还没下班吗？」",
    choices: [
      {
        label:
          "「是的，好久不见呀，我还在加班，马上下班了，等我回去聊」回个哭笑不得的表情。",
        next: "act1_s2_o6_warm",
        effect: { affection: 5, trust: 4, mirror: 3 },
      },
      {
        label: "「好的，等我回去聊」",
        next: "act1_s2_o6_boundary",
        effect: { trust: 1, self: 4, affection: -1, mirror: -3 },
      },
      {
        label: "「嗯」简短结束对话。",
        next: "act1_s2_o6_cold",
        effect: { affection: -2, self: 2, trust: -1, mirror: -1 },
      },
    ],
  },
  // 修复：初始化mirror默认值，解决NaNBUG
  act1_s2_o5_open: {
    illustration: 3,
    speaker: "旁白",
    text: "她盯着输入框很久，发来一段很短的语音：「我也在学着别再演得那么完美。」你们第一次有了点互相松口的感觉。",
    advance: function (s) {
      s.mirror = s.mirror || 50;
      s.trust = Math.min(100, s.trust + 1);
      s.secret = Math.min(100, s.secret + 2);
      return "act1_s2_lift";
    },
  },
  act1_s2_o5_overflow: {
    illustration: 3,
    speaker: "旁白",
    text: "你把话越说越快，像怕一停下就再也说不出口。她一直在听，却只回了一个「嗯」，屏幕另一端安静得发紧。",
    advance: function (s) {
      s.mirror = s.mirror || 50;
      s.self = Math.max(0, s.self - 1);
      s.trust = Math.max(0, s.trust - 1);
      return "act1_s2_lift";
    },
  },
  act1_s2_o5_deflect: {
    illustration: 3,
    speaker: "旁白",
    text: "她先发了个笑脸，说「好呀」，把没说出口的情绪轻轻放回桌面。",
    advance: function (s) {
      s.mirror = s.mirror || 50;
      s.affection = Math.min(100, s.affection + 1);
      s.mirror = Math.min(100, s.mirror + 1);
      return "act1_s2_lift";
    },
  },
  act1_s2_o6_warm: {
    illustration: 4,
    speaker: "旁白",
    text: [
      "你到家后刚说完「我回来了」，她几乎秒回：「那就好，先吃点东西再聊。」",
      "你们从加班聊到天气，再聊到各自近况，像把那段空白慢慢补上。",
    ],
    advance: function (s) {
      s.mirror = s.mirror || 50;
      s.affection = Math.min(100, s.affection + 1);
      s.mirror = Math.min(100, s.mirror + 1);
      return "act1_s2_lift";
    },
  },
  act1_s2_o6_boundary: {
    illustration: 4,
    speaker: "旁白",
    text: [
      "她回了个「好」就没再追问。晚上你再点开对话框，只看到她发来一句：「到家说一声就行。」",
      "分寸感被她拿捏得很稳，你却隐约觉得距离也被拉开了半步。",
    ],
    advance: function (s) {
      s.mirror = s.mirror || 50;
      s.self = Math.min(100, s.self + 1);
      s.affection = Math.max(0, s.affection - 1);
      return "act1_s2_lift";
    },
  },
  act1_s2_o6_cold: {
    illustration: 4,
    speaker: "旁白",
    text: [
      "你只回了一个「嗯」，对话框很快安静下来。直到你快下班，她才补一句：「路上注意安全。」",
      "礼貌还在，却像隔着一层看不见的玻璃。",
    ],
    advance: function (s) {
      s.mirror = s.mirror || 50;
      s.trust = Math.max(0, s.trust - 1);
      s.mirror = Math.max(0, s.mirror - 1);
      return "act1_s2_lift";
    },
  },
  act1_s2_lift: {
    illustration: 3,
    sceneTitle: "升温前的细缝",
    speaker: "旁白",
    text: "那晚之后，你们的联系重新热起来。她送你一幅小画，背面写着「拾光有你，满心欢喜」。",
    advance: "act1_daily_small_gift", // 【修改】跳转新增日常
  },
  // 【新增】第一幕 小礼物·纯日常过渡（无影响）
  act1_daily_small_gift: {
    illustration: 3,
    bgm: "calm",
    speaker: "旁白",
    text: [
      "你把那幅小画夹在办公桌的玻璃板下，加班疲惫时看一眼，心里会软下来。",
      "苏晚说这是随手画的，可你能看出笔触里的用心。",
      "平凡的日子里，这点小温柔成了独一无二的点缀。",
    ],
    advance: "act1_s2_lift_2", // 回归原剧情
  },
  act1_s2_lift_2: {
    illustration: 3,
    speaker: "旁白",
    text: "可相处时，她总握着手机，消息一来，神色便闪过一丝不自然，又迅速被温柔盖过。",
    advance: "act1_s2_o7",
  },
  act1_s2_o7: {
    illustration: 4,
    speaker: "旁白",
    text: "这一刻，你决定：",
    choices: [
      {
        label: "当没注意，继续聊别的，给她留台阶。",
        next: "act2_daily_ambiguous_start", // 【修改】跳转新增日常
        effect: { affection: 3, trust: 5, secret: 5, mirror: 6 },
      },
      {
        label: "「谁的消息？有事你可以先去忙。」直说但不逼供。",
        next: "act2_daily_ambiguous_start", // 【修改】跳转新增日常
        effect: {
          affection: -2,
          trust: 2,
          secret: 5,
          self: 2,
          mirror: -2,
          flags: { clue_phone_manner: true },
        },
      },
      {
        label:
          "她去洗手间，你帮她把手机扣过去防旁人看见——亮着的屏幕在你指下停了一秒。",
        next: "act1_s2_peek",
        effect: {
          affection: -5,
          trust: -10,
          self: -3,
          secret: 25,
          mirror: 4,
          flags: { clue_peek_chat: true },
        },
      },
    ],
  },
  // 【新增】第二幕 暧昧期开端·纯日常过渡（无影响）
  act2_daily_ambiguous_start: {
    illustration: 3,
    bgm: "cafe",
    speaker: "旁白",
    text: [
      "日子平淡地往前走，你们的聊天从客套变成了日常。",
      "早上会互道早安，晚上会分享当天的小事，哪怕只是一句「今天的外卖很好吃」。",
      "暧昧的气息，在细碎的对话里悄悄发芽。",
    ],
    advance: "act2_ambiguous_month2", // 回归原剧情
  },
  act1_s2_peek: {
    illustration: 4,
    sceneTitle: "备注「姐姐」",
    speaker: "屏幕上的字句",
    text: [
      "备注「姐姐」的人发来：「你别再装了，你根本不是那样的人……」",
      "她回：「我不想失去他……」",
      "脚步声近，苏晚脸色瞬间苍白。",
      "（音频占位：心跳/呼吸）",
    ],
    advance: "act2_daily_ambiguous_start", // 【修改】跳转新增日常
  },
  act2_ambiguous_month2: {
    illustration: 5,
    sceneTitle: "第二幕 · 暧昧 · 复刻的温柔",
    speaker: "旁白",
    text: "接下来的两个月，你们保持着若即若离的频率。",
    advance: "act2_ambiguous_month2_2",
  },
  act2_ambiguous_month2_2: {
    illustration: 5,
    speaker: "旁白",
    text: "你前一晚只在和陈默的语音里提过「胃不好还总嘴馋辣」，第二天她就拎来低辣卤味和温水；你夸她懂你，她只是笑，说「巧合啦」。",
    advance: "act2_daily_lunch", // 【修改】跳转新增日常
  },
  // 【新增】第二幕 午餐日常·纯日常过渡（无影响）
  act2_daily_lunch: {
    illustration: 5,
    bgm: "cafe",
    speaker: "旁白",
    text: [
      "你们一起在公司楼下的小餐馆吃午饭，她记得你不吃香菜，会默默把碗里的香菜挑走。",
      "阳光透过窗户洒在她的发梢，你忽然觉得，这样平淡的日常，也格外珍贵。",
    ],
    advance: "act2_ambiguous_month2_3", // 回归原剧情
  },
  act2_ambiguous_month2_3: {
    illustration: 5,
    speaker: "旁白",
    text: "你没追问她为何总能踩中你的偏好——也没提你聊天记录里那句「我只会照着教程当好恋人」。",
    choices: [
      {
        label: "顺着这份默契走下去，把它当成天意。",
        next: "act2_month",
        effect: { affection: 4, trust: 4, mirror: 8, self: -2 },
      },
      {
        label: "半开玩笑试探：「你像提前拿了我的偏好清单。」",
        next: "act2_month",
        effect: {
          trust: 2,
          secret: 8,
          self: 2,
          mirror: -3,
          flags: { clue_preference_targeting: true },
        },
      },
      {
        label: "主动坦白：「我有时在演好恋人，不太会表达真实情绪。」",
        next: "act2_month",
        effect: {
          trust: 6,
          self: 5,
          secret: 10,
          mirror: -8,
          flags: { hero_self_disclose: true },
        },
      },
    ],
  },
  act2_month: {
    illustration: 5,
    bgm: "cafe",
    sceneTitle: "第二幕 · 告白与隐瞒",
    speaker: "旁白",
    text: [
      "一个月过去。你约在初遇的咖啡馆，蜡烛、鲜花，手里是她常提起的颜料。",
      "（插画占位：告白场景）",
    ],
    advance: "act2_daily_confess_ready", // 【修改】跳转新增日常
  },
  // 【新增】第二幕 告白准备·纯日常过渡（无影响）
  act2_daily_confess_ready: {
    illustration: 5,
    bgm: "calm",
    speaker: "旁白",
    text: [
      "你提前半小时到了咖啡馆，手心微微出汗，反复检查准备好的礼物。",
      "服务员悄悄送上一杯温水，你看着窗外的街景，心跳比加班赶项目时还要快。",
      "苏晚推门进来的那一刻，所有的紧张都变成了温柔。",
    ],
    advance: "act2_confess", // 回归原剧情
  },
  act2_confess: {
    illustration: 5,
    speaker: "{player}",
    text: [
      "「苏晚，这一个月我很开心。你是第一个懂我、陪我的人……我喜欢你，能不能做我女朋友？」",
      "她愣住，睫毛颤了颤，像有话梗在喉咙。",
    ],
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
  // 修复：苏晚人设优化，台词更贴合敏感讨好、怕被丢下的性格
  act2_secret_full: {
    illustration: 5,
    speaker: "苏晚",
    text: "她眼眶瞬间红了，声音发颤：「对不起……我的朋友圈是装的，我怕你不喜欢真实的我。我敏感又胆小，画画也不好，很多都是临摹的……我怕配不上你，怕你丢下我。」",
    advance: "act2_daily_secret_silent", // 【修改】跳转新增日常
  },
  // 【新增】第二幕 秘密坦白后的沉默·纯日常过渡（无影响）
  act2_daily_secret_silent: {
    illustration: 5,
    bgm: "tense",
    speaker: "旁白",
    text: [
      "咖啡馆里的音乐还在播放，空气却安静得能听见心跳。",
      "苏晚低着头，手指紧紧攥着衣角，像一个等待审判的孩子。",
      "你看着她泛红的眼眶，心里百感交集。",
    ],
    advance: "act2_o9", // 回归原剧情
  },
  act2_secret_mid: {
    illustration: 5,
    speaker: "旁白",
    text: "她哽咽着低下头，连抬头看你的勇气都没有。最终还是下定决心说出来",
    advance: "act2_secret_mid_2",
  },
  act2_secret_mid_2: {
    illustration: 5,
    speaker: "苏晚",
    text: "对不起……我的朋友圈是装的，我怕你不喜欢真实的我。我敏感又胆小，画画也不好，很多都是临摹的……我怕配不上你，怕你丢下我。",
    advance: "act2_daily_secret_silent", // 【修改】跳转新增日常
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
        effect: {
          trust: 6,
          self: 8,
          secret: 12,
          mirror: -10,
          flags: { hero_secret_revealed: true },
        },
      },
    ],
  },
  act2_hero_secret: {
    illustration: 5,
    speaker: "{player}",
    text: "你第一次把自己也摆上桌面。",
    advance: "act2_hero_secret_2",
  },
  act2_hero_secret_2: {
    illustration: 5,
    speaker: "{player}",
    text: "17 岁时你发现父亲出轨，却把证据删掉，换来父母近十年的冷战；24 岁那段三年恋情里，你总说「都听你的」，却用沉默逼对方先道歉。",
    advance: "act2_hero_secret_3",
  },
  act2_hero_secret_3: {
    illustration: 5,
    speaker: "{player}",
    text: [
      "你低声说：「我不是单纯被伤害的那个人。我也会控制、会演。」",
      "苏晚看着你，眼神里的防备第一次松动。",
    ],
    advance: "act3_mother_track",
  },
  act3_mother_track: {
    illustration: 6,
    sceneTitle: "见家长 · 三角张力",
    speaker: "旁白",
    text: "你们正式在一起，她慢慢敢抱怨、敢素颜、敢拒绝。林母得知后，要你们回家吃饭。",
    advance: "act3_daily_meet_parent", // 【修改】跳转新增日常
  },
  // 【新增】第三幕 见家长前的日常·纯日常过渡（无影响）
  act3_daily_meet_parent: {
    illustration: 6,
    bgm: "tense",
    speaker: "旁白",
    text: [
      "见家长前一天，苏晚紧张得睡不着，反复问你「我穿这件衣服会不会太随意」「阿姨会不会不喜欢我」。",
      "你握着她的手安慰她，心里也隐隐有些忐忑。",
      "这是你们关系里，最重要的一道关卡。",
    ],
    advance: "act3_mother_track_2", // 回归原剧情
  },
  act3_mother_track_2: {
    illustration: 6,
    speaker: "旁白",
    text: "饭桌上，林母越看越紧绷。她年轻时在婚姻里吃过「委屈求全」的苦，最怕儿子再卷进一段靠迁就维系的关系",
    advance: "act3_mother_track_3",
  },

  act3_mother_track_3: {
    illustration: 6,
    speaker: "旁白",
    text: "看到苏晚下意识道歉、把错往自己身上揽，她几乎立刻把这当成危险信号。",
    advance: "act3_mother_track_4",
  },
  act3_mother_track_4: {
    illustration: 6,
    speaker: "旁白",
    text: "挑剔的话像针：「你这样照顾不好林野，分了吧。」苏晚红着眼，仍挤出笑：「阿姨，我会努力改。」",
    advance: "act3_o10",
  },

  // 修复：插画匹配错误+陈默身份合理（发小）
  act3_cool_track: {
    illustration: 3,
    speaker: "陈默",
    text: [
      "冷静期里，发小陈默约你在老咖啡馆见面，拍你肩膀：「她不是成心骗你，是太怕失去。伪装有时是缺安全感，不是恶意。」",
      "（音频占位：咖啡馆环境音）",
    ],
    advance: "act3_o11",
  },
  // 修复：苏念身份明确（苏晚亲妹），出现合理
  act3_suspicious_track: {
    illustration: 7,
    sceneTitle: "苏念·苏晚的妹妹",
    speaker: "苏念",
    text: [
      "你心里的刺没拔干净，追问与查看变多。她在温柔里又一次缩回壳里。",
      "苏念直接堵在你常去的咖啡馆，语气直爽：「你从没真正接纳她，你只是喜欢那个『完美版』的她！」",
      "（插画占位：苏念与林野）",
    ],
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
        next: "act3_transition_parent",
        effect: { affection: 10, trust: 8, self: 5 },
      },
      {
        label: "温声劝母亲别动气，桌下捏捏苏晚的手——示意她先忍。",
        next: "act3_transition_parent",
        effect: { affection: -5, trust: -8, self: -3 },
      },
      {
        label: "僵坐着，低头喝咖啡，假装没听见火药味。",
        next: "act3_transition_parent",
        effect: { affection: -3, trust: -5, self: 1 },
      },
    ],
  },
  // ==================== 优化：三条线专属过渡（增加坦白铺垫） ====================
  // 1. 见家长线 专属过渡
  act3_transition_parent: {
    illustration: 6,
    bgm: "tense",
    sceneTitle: "归家后的沉默",
    speaker: "旁白",
    text: [
      "离开家门，雨又落了下来。苏晚攥紧右手，疼得微微皱眉。",
      "她终于忍不住，哽咽着向你坦白：「我的手早就受伤了，画画会疼，手机里的人是我需要照顾的朋友……我不是故意瞒你。」",
      "所有线索在这一刻串联，真相呼之欲出。",
    ],
    advance: "act4_truth_gate",
  },
  // 2. 发小调解线 专属过渡
  act3_transition_chen: {
    illustration: 3,
    bgm: "calm",
    sceneTitle: "和解的开端",
    speaker: "旁白",
    text: [
      "陈默的话点醒了你，你主动找到苏晚道歉。",
      "她看着你，卸下所有伪装，慢慢说出自己的苦衷：右手的旧伤、需要时刻照顾的朋友，还有怕被嫌弃的自卑。",
      "那些隐瞒与不安，终于有了答案。",
    ],
    advance: "act4_truth_gate",
  },
  // 3. 妹妹对峙线 专属过渡
  act3_transition_sunian: {
    illustration: 7,
    bgm: "tense",
    sceneTitle: "被戳破的伪装",
    speaker: "旁白",
    text: [
      "苏念吼出真相：「我姐右手从小就残了，画画都疼！她手机里是抑郁症的闺蜜，她一刻都不敢不回！」",
      "苏晚脸色苍白，默认了一切，再也无法隐瞒。",
    ],
    advance: "act4_truth_gate",
  },
  act3_o11: {
    illustration: 3,
    speaker: "旁白",
    text: "你听进了多少？",
    choices: [
      {
        label: "写长消息认错，约她当面把话说完。",
        next: "act3_transition_chen",
        effect: { affection: 8, trust: 8 },
      },
      {
        label: "回「让我再想想」，然后把手机扣在桌上。",
        next: "act3_transition_chen",
        effect: { affection: 2, trust: 2, flags: { tug_war: true } },
      },
      {
        label: "「别再互相耗了。」发完就关掉对话框。",
        next: "__ENDING__",
        effect: {
          affection: -8,
          trust: -8,
          flags: { ending_regret_pass: true },
        },
      },
    ],
  },
  // 修复：全部跳转专属过渡，统一逻辑
  act3_o12: {
    illustration: 7,
    speaker: "旁白",
    text: "面对苏念，你：",
    choices: [
      {
        label: "「她还瞒了什么？我想听全。」",
        next: "act3_transition_sunian",
        effect: { secret: 20, trust: 5, flags: { clue_from_sunian: true } },
      },
      {
        label: "轮不到你来定对错。」",
        next: "act3_transition_sunian",
        effect: { affection: -5, trust: -5, self: 2 },
      },
      {
        label: "「我也在用力，不是只有她在受伤。」",
        next: "act3_transition_sunian",
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
  // 修复：删除无铺垫的「陈默观察者」烂尾设定，保留合理调解剧情
  act3_chen_mediate: {
    illustration: 3,
    sceneTitle: "挽回 · 陈默调解",
    speaker: "陈默",
    text: [
      "僻静卡座里，陈默一手搭着你肩，一手轻拍苏晚手背。两杯热柠檬水冒着气，他的冰咖啡却一口没动。",
      "「别再错过了——把真话说完，别留遗憾。」",
      "（插画占位：三人调解）",
    ],
    advance: "act3_transition_chen",
    effect: { trust: 2, affection: 2 },
  },
  act4_truth_gate: {
    illustration: 8,
    bgm: "tense",
    speaker: "旁白",
    text: "所有隐瞒的碎片终于拼凑完整，你终于要面对全部真相。",
    advance: function (s) {
      var clues = 0;
      if (s.flags.clue_peek_chat) clues += 1;
      if (s.flags.clue_phone_manner) clues += 1;
      if (s.flags.clue_preference_targeting) clues += 1;
      if (s.flags.clue_from_sunian) clues += 1;
      if (s.flags.hero_self_disclose || s.flags.hero_secret_revealed)
        clues += 1;
      s.flags.truth_clue_count = clues;
      return s.secret >= 50 && clues >= 2
        ? "act4_truth_full"
        : "act4_truth_partial";
    },
  },
  // ==================== 重写：真相文本（100%关联前置剧情，无冲突） ====================
  act4_truth_full: {
    illustration: 9,
    sceneTitle: "真相 · 双重秘密",
    speaker: "苏晚 / 旁白",
    text: [
      "【1】手机里备注「姐姐」的，是她患抑郁症的闺蜜：曾有轻生念头，苏晚必须**秒回安抚**，所以总躲着看手机、不敢离身；",
      "【2】右手幼时为保护苏念被烫伤，**用力就剧痛**，所以不敢长时间画画，只能临摹，也不敢告诉你这个「残缺」；",
      "她装完美、怕被丢下，全是因为怕自己的伤病和负担，被你嫌弃。",
    ],
    advance: "act4_o14",
  },
  act4_truth_partial: {
    illustration: 8,
    sceneTitle: "真相 · 未揭开的隐痛",
    speaker: "旁白",
    text: [
      "你只知道了一部分：她手机里有必须守护的人，右手有旧伤所以只能临摹画画。",
      "她的自卑、伪装、不安，都源于这两处隐痛，却因为你们的隔阂，没能说出全部。",
      "（线索不足，未解锁完整真相）",
    ],
    advance: "act4_o14",
  },
  // ==================== 后续剧情不变 ====================
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
    illustration: 2,
    speaker: "旁白",
    text: [
      "你们仍同框出现，却像隔着抱枕与屏幕。合照倒扣，茶凉在桌上，雨敲玻璃，室内只剩死寂的礼貌。",
      "（插画占位：假面共生恶化）",
    ],
    advance: function (s) {
      s.flags.ending_dark2 = true;
      return "__ENDING__";
    },
  },
  act4_positive_fork: {
    illustration: 10,
    sceneTitle: "第三幕 · 拾光与选择",
    speaker: "旁白",
    text: [
      "你开始陪她复健、去见闺蜜、听她讲童年。也坦白自己的逃避：怕像父母那样冷战收场——也承认你会查聊天记录、会装大度，其实和她一样在演「没事」。",
      "林母在你们的坚持里慢慢松口。",
      "终局前，你想把未来落在哪里？",
    ],
    advance: "act4_o15",
  },
  act4_tug_second: {
    illustration: 2,
    sceneTitle: "拉锯 · 独自康复的她",
    speaker: "旁白",
    text: [
      "第二次冷静期。她不再轰炸消息，只默默复健、画画、陪闺蜜。桌角便签写着：「姐，我放学给你带饭。」",
      "林母问你：能不能一辈子包容她的秘密与右手？",
    ],
    advance: "act4_o16",
  },
  act4_o15: {
    illustration: 10,
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
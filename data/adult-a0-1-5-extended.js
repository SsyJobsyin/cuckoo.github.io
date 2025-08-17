/* 成人 A0 入门 · 1-5 扩写版（每课≈10轮对话，含中英对照） */
(function(){
  function L(id, zh, en, lines, tip, vocab){
    return {
      id, titleZh: zh, titleEn: en,
      content: [
        { type:'phrase', en:`Today's topic: ${en}.`, zh:`本课主题：${zh}。` },
        { type:'dialogue', lines },
        { type:'tip', zh: tip }
      ],
      exercise: [
        {type:'fill',   prompt:'补全：Nice to ____ you.', answer:'meet'},
        {type:'choice', prompt:`哪个词更贴近“${zh}”？`, choices:[(vocab&&vocab[0])||'hello','banana'], answer:0},
        {type:'fill',   prompt:`拼写：请输入单词 “${(vocab&&vocab[1])||'name'}”`, answer:String((vocab&&vocab[1])||'name').toLowerCase()}
      ],
      gameVocab: (vocab||[]).slice(0,8).map(w=>({word:w, zh:'本课词'}))
    };
  }

  const A0 = [
    // 1. 打招呼与寒暄（扩写10轮）
    L(
      'A-A0 入门-1',
      '打招呼与寒暄',
      'Greetings & Small Talk',
      [
        {speaker:'You', en:'Hi! I am Eric. Nice to meet you.', zh:'嗨！我叫 Eric。很高兴认识你。'},
        {speaker:'Mia', en:'Nice to meet you too, Eric. I’m Mia.', zh:'我也很高兴认识你，我是 Mia。'},
        {speaker:'You', en:'Is this your first day here?', zh:'今天是你第一天来吗？'},
        {speaker:'Mia', en:'Yes. I feel a little nervous.', zh:'是的。我有点紧张。'},
        {speaker:'You', en:'No worries. People here are friendly.', zh:'别担心，这里的人很友好。'},
        {speaker:'Mia', en:'Thanks! Where are you from?', zh:'谢谢！你来自哪里？'},
        {speaker:'You', en:'I’m from Shanghai. And you?', zh:'我来自上海。你呢？'},
        {speaker:'Mia', en:'I’m from Chengdu. I love spicy food.', zh:'我来自成都。我爱吃辣。'},
        {speaker:'You', en:'Great! Let’s grab lunch later.', zh:'太好了！待会一起吃午饭吧。'},
        {speaker:'Mia', en:'Sounds good. See you later!', zh:'好呀。待会见！'}
      ],
      '寒暄三件套：名字（I’m …）、来自哪里（I’m from …）、友好结束语（See you later!）。',
      ['hi','meet','from','nervous','friendly','lunch','later','see you']
    ),

    // 2. 自我介绍与身份（扩写10轮）
    L(
      'A-A0 入门-2',
      '自我介绍与身份',
      'Introduce Yourself',
      [
        {speaker:'You', en:'Hi, my name is Leo. I’m a student.', zh:'你好，我叫 Leo。我是一名学生。'},
        {speaker:'Anna',en:'Nice to meet you, Leo. What’s your major?', zh:'很高兴认识你。你的专业是什么？'},
        {speaker:'You', en:'Computer science. What about you?', zh:'计算机科学。你呢？'},
        {speaker:'Anna',en:'I’m a designer on the 6th floor.', zh:'我是设计师，在6楼。'},
        {speaker:'You', en:'Do you work in Room 602?', zh:'你在602室工作吗？'},
        {speaker:'Anna',en:'Yes! Drop by anytime.', zh:'是的！随时来找我。'},
        {speaker:'You', en:'Great. Let’s keep in touch by email.', zh:'太好了。邮件保持联系。'},
        {speaker:'Anna',en:'Here’s my card.', zh:'这是我的名片。'},
        {speaker:'You', en:'Thanks, Anna.', zh:'谢谢你，Anna。'},
        {speaker:'Anna',en:'You’re welcome!', zh:'不客气！'}
      ],
      '表达：I am a/an…；on the 6th floor；keep in touch 保持联系。',
      ['name','student','designer','floor','room','email','card','contact']
    ),

    // 3. 咖啡店点单（扩写10轮）
    L(
      'A-A0 入门-3',
      '咖啡店点单',
      'Ordering at a Café',
      [
        {speaker:'Barista', en:'Hi! What can I get for you?', zh:'你好！请问要点什么？'},
        {speaker:'You',     en:'A cappuccino, please.', zh:'来杯卡布奇诺，谢谢。'},
        {speaker:'Barista', en:'For here or to go?', zh:'堂食还是外带？'},
        {speaker:'You',     en:'For here. Less sugar, please.', zh:'堂食。少糖，谢谢。'},
        {speaker:'Barista', en:'Any food? We have sandwiches and muffins.', zh:'要吃点什么吗？有三明治和松饼。'},
        {speaker:'You',     en:'A tuna sandwich, please.', zh:'来个金枪鱼三明治。'},
        {speaker:'Barista', en:'Great. Your number is 18.', zh:'好的，你的号码是18。'},
        {speaker:'You',     en:'How long will it take?', zh:'大概多久呢？'},
        {speaker:'Barista', en:'About five minutes.', zh:'大约五分钟。'},
        {speaker:'You',     en:'Perfect, thanks!', zh:'太好了，谢谢！'}
      ],
      '关键词：for here / to go；less sugar 少糖；Your number is… 取餐号。',
      ['cappuccino','to go','for here','sugar','sandwich','muffin','number','minutes']
    ),

    // 4. 问路与方向（扩写10轮）
    L(
      'A-A0 入门-4',
      '问路与方向',
      'Asking for Directions',
      [
        {speaker:'You',   en:'Excuse me, where is the subway station?', zh:'打扰一下，地铁站在哪？'},
        {speaker:'Local', en:'Go straight and turn left at the light.', zh:'直走，到红绿灯处左转。'},
        {speaker:'You',   en:'Is it far from here?', zh:'离这里远吗？'},
        {speaker:'Local', en:'About five minutes on foot.', zh:'步行大约五分钟。'},
        {speaker:'You',   en:'Which line goes to the museum?', zh:'去博物馆坐哪条线？'},
        {speaker:'Local', en:'Line 2. The entrance is on your left.', zh:'2号线。入口在你的左边。'},
        {speaker:'You',   en:'Thank you so much!', zh:'非常感谢！'},
        {speaker:'Local', en:'You’re welcome.', zh:'不客气。'},
        {speaker:'You',   en:'Have a nice day!', zh:'祝你有美好的一天！'},
        {speaker:'Local', en:'You too!', zh:'你也是！'}
      ],
      '方向词：straight 直行；turn left/right 左/右转；on your left 在你左侧。',
      ['straight','turn left','turn right','station','line','museum','entrance','on foot']
    ),

    // 5. 看病就医（扩写10轮）
    L(
      'A-A0 入门-5',
      '看病就医',
      'At the Doctor’s Office',
      [
        {speaker:'Doctor',  en:'Good morning. What brings you here?', zh:'早上好。你哪里不舒服？'},
        {speaker:'You',     en:'I’ve had a headache for three days.', zh:'我头疼三天了。'},
        {speaker:'Doctor',  en:'Any fever or cough?', zh:'有发烧或咳嗽吗？'},
        {speaker:'You',     en:'A little fever, no cough.', zh:'有点发烧，没有咳嗽。'},
        {speaker:'Doctor',  en:'Let me check your temperature.', zh:'我量一下体温。'},
        {speaker:'Doctor',  en:'It looks like a common cold.', zh:'像是普通感冒。'},
        {speaker:'You',     en:'Is it serious?', zh:'严重吗？'},
        {speaker:'Doctor',  en:'No. Rest and drink more water.', zh:'不严重。多休息，多喝水。'},
        {speaker:'You',     en:'Thank you, doctor.', zh:'谢谢医生。'},
        {speaker:'Doctor',  en:'You’re welcome. Get well soon!', zh:'不客气。早日康复！'}
      ],
      '词汇：common cold 普通感冒；temperature 体温；get well soon 早日康复。',
      ['fever','headache','temperature','cough','rest','water','common cold','get well soon']
    )
  ];

  // 用 COURSE_PART 覆盖/合并 A0 课程（放在 loader 最后即可覆盖）
  window.COURSE_PART = { 'A0 入门': A0 };
})();

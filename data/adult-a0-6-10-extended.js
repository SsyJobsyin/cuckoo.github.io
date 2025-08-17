/* 成人 A0 入门 · 6–10 扩写版（每课≈10轮对话，含中英对照） */
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
        {type:'fill',   prompt:'补全：for ____ / to go（堂食/外带）', answer:'here'},
        {type:'choice', prompt:`哪个词更贴近“${zh}”？`, choices:[(vocab&&vocab[0])||'word','apple'], answer:0},
        {type:'fill',   prompt:`拼写：请输入单词 “${(vocab&&vocab[1])||'ticket'}”`, answer:String((vocab&&vocab[1])||'ticket').toLowerCase()}
      ],
      gameVocab: (vocab||[]).slice(0,8).map(w=>({word:w, zh:'本课词'}))
    };
  }

  const A0 = [
    /* 6. 超市购物（已在 1–5 里有咖啡店，这里做“结账 + 询价”扩写） */
    L(
      'A-A0 入门-6',
      '超市购物：询价与结账',
      'Grocery: Price & Checkout',
      [
        {speaker:'You',   en:'Excuse me, how much is this rice?', zh:'请问这袋大米多少钱？'},
        {speaker:'Clerk', en:'$8.99. It’s on sale today.', zh:'8.99美元，今天在打折。'},
        {speaker:'You',   en:'Great. Do you have soy milk?', zh:'太好了。有豆奶吗？'},
        {speaker:'Clerk', en:'Yes, aisle 3, top shelf.', zh:'有，3号货架最上层。'},
        {speaker:'You',   en:'Thanks. Is there a self-checkout?', zh:'谢谢。有自助结账吗？'},
        {speaker:'Clerk', en:'Yes, over there by the exit.', zh:'有，就在出口旁边。'},
        {speaker:'You',   en:'Can I pay by card?', zh:'可以刷卡吗？'},
        {speaker:'Clerk', en:'Sure. Tap or insert your card.', zh:'当然，可以轻触或插卡。'},
        {speaker:'You',   en:'Done. Do I need a bag?', zh:'好了。我需要袋子吗？'},
        {speaker:'Clerk', en:'We charge $0.1 per bag.', zh:'我们每个袋子收0.1美元。'}
      ],
      '高频：on sale 打折；top shelf 顶层；self-checkout 自助结账；tap/insert 轻触/插入（刷卡）。',
      ['sale','shelf','self-checkout','card','tap','insert','bag','charge']
    ),

    /* 7. 电话与预约（在 1–5 基础上延展“改期 + 确认”） */
    L(
      'A-A0 入门-7',
      '预约与改期',
      'Appointment: Reschedule',
      [
        {speaker:'You',   en:'Hi, I booked a haircut for 3 pm.', zh:'你好，我预约了3点的理发。'},
        {speaker:'Salon', en:'Yes, we have you on the list.', zh:'是的，名单上有你。'},
        {speaker:'You',   en:'Can I change it to 4 pm?', zh:'我可以改到4点吗？'},
        {speaker:'Salon', en:'Let me check… 4 pm is available.', zh:'我查一下……4点有空位。'},
        {speaker:'You',   en:'Great. How long does it take?', zh:'太好了。大概需要多久？'},
        {speaker:'Salon', en:'About 40 minutes.', zh:'大约40分钟。'},
        {speaker:'You',   en:'Perfect. What’s the price?', zh:'太好了。价格是多少？'},
        {speaker:'Salon', en:'18 dollars in total.', zh:'一共18美元。'},
        {speaker:'You',   en:'Thank you. See you at 4!', zh:'谢谢。4点见！'},
        {speaker:'Salon', en:'See you then!', zh:'到时候见！'}
      ],
      '表达：reschedule 改期；available 有空；in total 总共。',
      ['reschedule','available','price','minutes','in total','book','change','see you']
    ),

    /* 8. 家人朋友（加入“邀请 + 时间地点确认”） */
    L(
      'A-A0 入门-8',
      '与朋友相约',
      'Meet Up with Friends',
      [
        {speaker:'You',   en:'Hey Lily, are you free this weekend?', zh:'嗨 Lily，这个周末你有空吗？'},
        {speaker:'Lily',  en:'Yes! What’s up?', zh:'有空！怎么啦？'},
        {speaker:'You',   en:'Let’s have lunch on Saturday.', zh:'周六一起吃午饭吧。'},
        {speaker:'Lily',  en:'Sounds great. Where shall we meet?', zh:'好呀。我们在哪见面？'},
        {speaker:'You',   en:'At the new café near the park.', zh:'在公园旁边那家新咖啡馆。'},
        {speaker:'Lily',  en:'What time?', zh:'几点？'},
        {speaker:'You',   en:'At 12:30. Does it work for you?', zh:'12:30可以吗？'},
        {speaker:'Lily',  en:'Perfect. See you there!', zh:'太好了，到时候见！'},
        {speaker:'You',   en:'Deal. I’ll book a table.', zh:'就这么定了。我来订位。'},
        {speaker:'Lily',  en:'Thanks! Looking forward to it.', zh:'谢谢！很期待。'}
      ],
      '搭配：book a table 订位；Does it work for you? 合适吗？look forward to 期待。',
      ['book a table','near','work for you','meet','weekend','Saturday','lunch','look forward']
    ),

    /* 9. 兴趣爱好（加入“邀请 + 计划”） */
    L(
      'A-A0 入门-9',
      '兴趣与计划',
      'Hobby & Plan',
      [
        {speaker:'You',   en:'I practice guitar on weekends.', zh:'我周末练吉他。'},
        {speaker:'Buddy', en:'Cool! I like jogging in the morning.', zh:'酷！我喜欢早上慢跑。'},
        {speaker:'You',   en:'Let’s start a small band.', zh:'我们组个小乐队吧。'},
        {speaker:'Buddy', en:'Nice idea. We can invite Mia.', zh:'好主意。我们可以邀请 Mia。'},
        {speaker:'You',   en:'Saturday afternoon works for me.', zh:'我周六下午有空。'},
        {speaker:'Buddy', en:'Great. We’ll practice in the garage.', zh:'好，我们在车库排练。'},
        {speaker:'You',   en:'I’ll bring a speaker.', zh:'我带一个音箱。'},
        {speaker:'Buddy', en:'I’ll print the chord sheets.', zh:'我打印和弦表。'},
        {speaker:'You',   en:'See you then!', zh:'到时候见！'},
        {speaker:'Buddy', en:'See you!', zh:'见！'}
      ],
      '词：chord 和弦；speaker 音箱；practice 练习；invite 邀请。',
      ['guitar','jogging','band','practice','invite','garage','speaker','chord']
    ),

    /* 10. 日程与提醒（加入“待办 + 提醒方式”） */
    L(
      'A-A0 入门-10',
      '日程与提醒进阶',
      'Schedule & Reminders+',
      [
        {speaker:'You',    en:'I get up at seven and start work at nine.', zh:'我七点起床，九点开始工作。'},
        {speaker:'Roomie', en:'Do you use a calendar app?', zh:'你用日历应用吗？'},
        {speaker:'You',    en:'Yes, I set reminders for meetings.', zh:'用的，我会为会议设置提醒。'},
        {speaker:'Roomie', en:'How do you stay focused?', zh:'你如何保持专注？'},
        {speaker:'You',    en:'I make a to-do list every morning.', zh:'我每天早上做待办清单。'},
        {speaker:'Roomie', en:'Nice! Do you take breaks?', zh:'不错！你会休息吗？'},
        {speaker:'You',    en:'Yes, a 5-minute break every hour.', zh:'会的，每小时休息5分钟。'},
        {speaker:'Roomie', en:'Sounds healthy.', zh:'听起来很健康。'},
        {speaker:'You',    en:'I go to bed before eleven.', zh:'我十一点前睡觉。'},
        {speaker:'Roomie', en:'Good routine!', zh:'很好的作息！'}
      ],
      '表达：to-do list 待办清单；stay focused 保持专注；routine 作息。',
      ['calendar','reminder','meeting','to-do list','focused','break','bed','routine']
    )
  ];

  window.COURSE_PART = { 'A0 入门': A0 };
})();

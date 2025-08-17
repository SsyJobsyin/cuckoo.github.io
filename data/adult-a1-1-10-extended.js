/* 成人 A1 生存 · 1–10 扩写版（每课≈10轮对话，含中英对照） */
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
        {type:'choice', prompt:`哪个表达更贴近“${zh}”？`, choices:[(vocab&&vocab[0])||'phrase','cat'], answer:0},
        {type:'fill',   prompt:'补全：How much is the ____?（价格）', answer:'price'},
        {type:'fill',   prompt:`拼写：请输入单词 “${(vocab&&vocab[1])||'ticket'}”`, answer:String((vocab&&vocab[1])||'ticket').toLowerCase()}
      ],
      gameVocab: (vocab||[]).slice(0,8).map(w=>({word:w, zh:'本课词'}))
    };
  }

  const A1 = [
    /* 1. 餐厅点餐与找位（扩写） */
    L(
      'A-A1 生存-1',
      '餐厅点餐与找位',
      'Restaurant: Seating & Ordering',
      [
        {speaker:'Host',  en:'Table for two?', zh:'两位吗？'},
        {speaker:'You',   en:'Yes, by the window if possible.', zh:'是的，尽量靠窗。'},
        {speaker:'Host',  en:'Sure. Here are the menus.', zh:'当然。这是菜单。'},
        {speaker:'Server',en:'Would you like any drinks?', zh:'需要饮料吗？'},
        {speaker:'You',   en:'Water first, please.', zh:'先来水，谢谢。'},
        {speaker:'Server',en:'Any appetizers?', zh:'要前菜吗？'},
        {speaker:'You',   en:'Caesar salad to share.', zh:'来份凯撒沙拉分享。'},
        {speaker:'Server',en:'For the main course?', zh:'主菜要什么？'},
        {speaker:'You',   en:'Grilled chicken and rice.', zh:'烤鸡配米饭。'},
        {speaker:'Server',en:'Great. I’ll be right back.', zh:'好的，我马上来。'}
      ],
      '顺序：就座→饮料→前菜→主菜；by the window 靠窗；to share 共享。',
      ['menu','appetizer','main course','by the window','share','grilled','rice','water']
    ),

    /* 2. 公交地铁出行（扩写） */
    L(
      'A-A1 生存-2',
      '公交与地铁',
      'Public Transport',
      [
        {speaker:'You',   en:'Which bus goes to the museum?', zh:'去博物馆坐哪路公交？'},
        {speaker:'Driver',en:'Take bus 16, then transfer to Line 2.', zh:'坐16路，再换2号线。'},
        {speaker:'You',   en:'Where do I transfer?', zh:'在哪里换乘？'},
        {speaker:'Driver',en:'At Central Station.', zh:'在中央车站。'},
        {speaker:'You',   en:'How much is the fare?', zh:'票价多少？'},
        {speaker:'Driver',en:'$2 with a transit card.', zh:'刷交通卡2美元。'},
        {speaker:'You',   en:'How long does it take?', zh:'需要多久？'},
        {speaker:'Driver',en:'About 20 minutes.', zh:'大约20分钟。'},
        {speaker:'You',   en:'Thanks for your help.', zh:'谢谢你的帮助。'},
        {speaker:'Driver',en:'You’re welcome.', zh:'不客气。'}
      ],
      '词：transfer 换乘；fare 票价；transit card 交通卡。',
      ['bus','transfer','fare','transit card','station','take','minutes','card']
    ),

    /* 3. 看病挂号（扩写） */
    L(
      'A-A1 生存-3',
      '看病挂号',
      'Doctor Visit',
      [
        {speaker:'You',   en:'I have a sore throat and a fever.', zh:'我嗓子疼并发烧。'},
        {speaker:'Nurse', en:'Please fill out this form.', zh:'请先填这张表。'},
        {speaker:'Doctor',en:'How long have you felt this way?', zh:'这种情况多久了？'},
        {speaker:'You',   en:'Two days.', zh:'两天。'},
        {speaker:'Doctor',en:'You need to rest and drink water.', zh:'要休息，多喝水。'},
        {speaker:'Doctor',en:'I’ll prescribe some medicine.', zh:'我给你开些药。'},
        {speaker:'You',   en:'Any side effects?', zh:'有副作用吗？'},
        {speaker:'Doctor',en:'Mild drowsiness. Take it after meals.', zh:'轻微困倦，饭后服用。'},
        {speaker:'You',   en:'Got it. Thank you.', zh:'明白。谢谢。'},
        {speaker:'Doctor',en:'Get well soon.', zh:'早日康复。'}
      ],
      '术语：prescribe 开处方；side effects 副作用；after meals 饭后。',
      ['fever','sore throat','prescribe','medicine','after meals','side effects','rest','water']
    ),

    /* 4. 银行与换汇（扩写） */
    L(
      'A-A1 生存-4',
      '银行与换汇',
      'Bank & Exchange',
      [
        {speaker:'You',   en:'I’d like to open a savings account.', zh:'我想开一个储蓄账户。'},
        {speaker:'Clerk', en:'Please show your ID and address.', zh:'请出示身份证和地址证明。'},
        {speaker:'You',   en:'Here they are.', zh:'给你。'},
        {speaker:'Clerk', en:'Would you like a debit card?', zh:'需要借记卡吗？'},
        {speaker:'You',   en:'Yes. Also, what’s today’s exchange rate?', zh:'要。今天汇率多少？'},
        {speaker:'Clerk', en:'1 dollar to 7.1 yuan.', zh:'1美元兑7.1元。'},
        {speaker:'You',   en:'Can I exchange $100?', zh:'我能换100美元吗？'},
        {speaker:'Clerk', en:'Sure. Please sign here.', zh:'可以。在这里签名。'},
        {speaker:'You',   en:'Thank you.', zh:'谢谢。'},
        {speaker:'Clerk', en:'You’re welcome.', zh:'不客气。'}
      ],
      '词：savings account 储蓄账户；debit card 借记卡；exchange rate 汇率。',
      ['account','debit card','exchange rate','ID','address','sign','dollar','yuan']
    ),

    /* 5. 网购与快递（扩写） */
    L(
      'A-A1 生存-5',
      '网购与快递',
      'Online Shopping & Delivery',
      [
        {speaker:'You',     en:'I ordered a phone case online.', zh:'我网购了手机壳。'},
        {speaker:'Courier', en:'Please confirm your address.', zh:'请确认地址。'},
        {speaker:'You',     en:'Building A, Room 1203.', zh:'A座1203。'},
        {speaker:'Courier', en:'Your package will arrive this afternoon.', zh:'包裹下午到。'},
        {speaker:'You',     en:'If no one is home, leave it at reception.', zh:'若没人，请放前台。'},
        {speaker:'Courier', en:'Sure. Please keep your phone on.', zh:'好的，请保持电话畅通。'},
        {speaker:'You',     en:'Thanks. Can I change the time?', zh:'谢谢。我能改时间吗？'},
        {speaker:'Courier', en:'Yes, reply to the SMS link.', zh:'可以，回复短信链接即可。'},
        {speaker:'You',     en:'Got it.', zh:'明白。'},
        {speaker:'Courier', en:'Have a nice day.', zh:'祝你愉快。'}
      ],
      '表达：confirm 确认；arrive 到达；reception 前台；reply 回复。',
      ['order','package','arrive','address','reception','confirm','reply','link']
    ),

    /* 6. 租房看房（扩写） */
    L(
      'A-A1 生存-6',
      '租房看房',
      'Apartment Viewing',
      [
        {speaker:'Agent', en:'This is a one-bedroom apartment.', zh:'这是一个一居室。'},
        {speaker:'You',   en:'Is the rent negotiable?', zh:'房租可谈吗？'},
        {speaker:'Agent', en:'A little. Utilities not included.', zh:'可以一点，水电不含。'},
        {speaker:'You',   en:'Is there a washing machine?', zh:'有洗衣机吗？'},
        {speaker:'Agent', en:'Yes, and subway is five minutes away.', zh:'有，地铁步行五分钟。'},
        {speaker:'You',   en:'Great. Any noise at night?', zh:'很好。晚上吵吗？'},
        {speaker:'Agent', en:'It’s quiet. Good for rest.', zh:'很安静，适合休息。'},
        {speaker:'You',   en:'Can I move in next week?', zh:'我下周能入住吗？'},
        {speaker:'Agent', en:'Yes. Sign the contract tomorrow.', zh:'可以。明天签合同。'},
        {speaker:'You',   en:'Deal.', zh:'成交。'}
      ],
      '词：rent 房租；utilities 水电；move in 入住；contract 合同；quiet 安静。',
      ['rent','utilities','washing machine','subway','quiet','contract','move in','sign']
    ),

    /* 7. 旅游咨询（扩写） */
    L(
      'A-A1 生存-7',
      '旅游信息咨询',
      'Tourist Information',
      [
        {speaker:'You',   en:'What attractions do you recommend?', zh:'你推荐哪些景点？'},
        {speaker:'Guide', en:'The old town and riverside park.', zh:'老城区和滨河公园。'},
        {speaker:'You',   en:'Is there a city pass?', zh:'有城市通票吗？'},
        {speaker:'Guide', en:'Yes, covers museums and buses.', zh:'有，包含博物馆和公交。'},
        {speaker:'You',   en:'How much is it?', zh:'多少钱？'},
        {speaker:'Guide', en:'$25 for one day.', zh:'一天25美元。'},
        {speaker:'You',   en:'Where to buy?', zh:'在哪里买？'},
        {speaker:'Guide', en:'At the information center.', zh:'在游客中心。'},
        {speaker:'You',   en:'Thanks a lot.', zh:'非常感谢。'},
        {speaker:'Guide', en:'Enjoy your trip!', zh:'祝旅途愉快！'}
      ],
      '词：attraction 景点；city pass 城市通票；information center 游客中心。',
      ['attraction','city pass','museum','bus','riverside','information center','buy','day']
    ),

    /* 8. 工作沟通：安排会议（扩写） */
    L(
      'A-A1 生存-8',
      '安排会议',
      'Schedule a Meeting',
      [
        {speaker:'You',       en:'Can we meet tomorrow morning?', zh:'我们明早能开会吗？'},
        {speaker:'Colleague', en:'I’m free at ten.', zh:'我十点有空。'},
        {speaker:'You',       en:'Agenda: timeline and budget.', zh:'议程：时间线与预算。'},
        {speaker:'Colleague', en:'I’ll invite the designer.', zh:'我把设计师也邀请上。'},
        {speaker:'You',       en:'Let’s use room 5F.', zh:'用五楼会议室。'},
        {speaker:'Colleague', en:'Okay, I’ll send a calendar invite.', zh:'好，我发日程邀请。'},
        {speaker:'You',       en:'Please attach the latest file.', zh:'请附上最新文件。'},
        {speaker:'Colleague', en:'Will do.', zh:'会的。'},
        {speaker:'You',       en:'Thanks!', zh:'谢谢！'},
        {speaker:'Colleague', en:'See you then.', zh:'到时见。'}
      ],
      '词：agenda 议程；timeline 时间线；calendar invite 日程邀请；attach 附件。',
      ['agenda','timeline','budget','invite','meeting room','calendar','attach','file']
    ),

    /* 9. 邮件与确认（扩写） */
    L(
      'A-A1 生存-9',
      '邮件与确认',
      'Email & Confirmation',
      [
        {speaker:'You',    en:'I sent the file. Did you receive it?', zh:'我发文件了，你收到了吗？'},
        {speaker:'Client', en:'Yes, but the attachment is too large.', zh:'收到了，但附件太大。'},
        {speaker:'You',    en:'I will share a link instead.', zh:'我改用链接分享。'},
        {speaker:'Client', en:'Great. Please allow access.', zh:'好，请开放访问权限。'},
        {speaker:'You',    en:'Done. Let me know if it works.', zh:'好了，看看是否能用。'},
        {speaker:'Client', en:'It works now, thanks.', zh:'现在可以了，谢谢。'},
        {speaker:'You',    en:'I’ll follow up tomorrow.', zh:'我明天再跟进。'},
        {speaker:'Client', en:'Talk soon.', zh:'回头聊。'},
        {speaker:'You',    en:'Have a nice day.', zh:'祝你愉快。'},
        {speaker:'Client', en:'You too.', zh:'你也是。'}
      ],
      '词：attachment 附件；allow access 开放权限；follow up 跟进。',
      ['attachment','share link','access','receive','works','allow','follow up','tomorrow']
    ),

    /* 10. 小型演示与反馈（扩写） */
    L(
      'A-A1 生存-10',
      '小型演示与反馈',
      'Mini Presentation & Feedback',
      [
        {speaker:'You',   en:'Let me give a quick demo.', zh:'我来做个快速演示。'},
        {speaker:'Team',  en:'Go ahead.', zh:'请开始。'},
        {speaker:'You',   en:'Here is the new layout and flow.', zh:'这是新的布局与流程。'},
        {speaker:'Team',  en:'Looks clear. What’s the timeline?', zh:'看起来清晰。时间线如何？'},
        {speaker:'You',   en:'Beta next week; launch next month.', zh:'下周内测，下月上线。'},
        {speaker:'Team',  en:'Any risks?', zh:'有风险吗？'},
        {speaker:'You',   en:'Scope change and tight schedule.', zh:'范围变化与进度紧。'},
        {speaker:'Team',  en:'Add a backup plan.', zh:'加个备选方案。'},
        {speaker:'You',   en:'Sure. Thanks for the feedback.', zh:'好的。谢谢反馈。'},
        {speaker:'Team',  en:'Great job.', zh:'做得好。'}
      ],
      '词：layout 布局；flow 流程；scope 范围；backup plan 备选方案。',
      ['demo','layout','flow','risk','scope','timeline','beta','backup plan']
    )
  ];

  window.COURSE_PART = { 'A1 生存': A1 };
})();

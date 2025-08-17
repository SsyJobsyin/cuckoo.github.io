/* adult-1-30.js  ·  成人课程 1–30（A0/A1/A2 各 10 课）
   结构：window.COURSE_PART = { 'A0 入门': [...], 'A1 生存': [...], 'A2 进阶': [...] }
   放置位置：/data/adult-1-30.js
*/
(function(){
  function mk(id, zh, en, lines, tip, vocab, ex){
    const useV = Array.isArray(vocab) && vocab.length ? vocab : ['hello','name','thanks','please'];
    return {
      id,
      titleZh: zh,
      titleEn: en,
      content: [
        { type:'phrase', en:`Today's topic: ${en}.`, zh:`本课主题：${zh}。` },
        { type:'dialogue', lines },
        { type:'tip', zh: tip || '多用礼貌用语 please / thank you，会让交流更顺畅。' }
      ],
      exercise: ex || [
        { type:'fill',   prompt:'补全：Nice to ____ you.', answer:'meet' },
        { type:'choice', prompt:`哪个词更贴近“${zh}”？`, choices:[useV[0] || 'hello','banana'], answer:0 },
        { type:'fill',   prompt:`拼写：请输入单词 “${(useV[1]||'name')}”`, answer:String(useV[1]||'name').toLowerCase() }
      ],
      gameVocab: useV.slice(0,6).map(w=>({word:w, zh:'本课词'}))
    };
  }

  const A0 = [
    mk(
      'A-A0 入门-1',
      '打招呼与寒暄',
      'Greetings & Small Talk',
      [
        {speaker:'You',   en:`Hi, I'm Alex. Nice to meet you.`, zh:'嗨，我叫 Alex。很高兴认识你。'},
        {speaker:'Mia',   en:`Nice to meet you too, Alex. Are you new here?`, zh:'我也很高兴认识你，你是新来的吗？'},
        {speaker:'You',   en:`Yes, today is my first day.`, zh:'是的，今天是我第一天。'},
        {speaker:'Mia',   en:`Welcome! Where are you from?`, zh:'欢迎！你来自哪里？'},
        {speaker:'You',   en:`I'm from Shanghai.`, zh:'我来自上海。'},
        {speaker:'Mia',   en:`Great city! If you need any help, just ask.`, zh:'很棒的城市！需要帮助随时问我。'},
        {speaker:'You',   en:`Thanks, I appreciate it.`, zh:'谢谢，太感谢了。'},
        {speaker:'Mia',   en:`No problem. Let's grab coffee later.`, zh:'不客气，待会一起喝咖啡吧。'}
      ],
      '自我介绍三件套：名字、来自哪里、第一天/职位。礼貌结束：Nice to meet you / See you later.',
      ['hi','meet','welcome','help','coffee','from']
    ),
    mk(
      'A-A0 入门-2',
      '自我介绍与身份',
      'Introduce Yourself',
      [
        {speaker:'You',   en:`My name is Eric, and I'm a designer.`, zh:'我叫 Eric，是一名设计师。'},
        {speaker:'Buddy', en:`Nice! Do you work in this building?`, zh:'不错！你在这栋楼里工作吗？'},
        {speaker:'You',   en:`Yes, on the 8th floor.`, zh:'是的，在8楼。'},
        {speaker:'Buddy', en:`Which team are you on?`, zh:'你在哪个团队？'},
        {speaker:'You',   en:`The product team.`, zh:'产品团队。'},
        {speaker:'Buddy', en:`Great, we often work with design.`, zh:'好呀，我们经常跟设计合作。'},
        {speaker:'You',   en:`Looking forward to working together.`, zh:'期待合作。'},
        {speaker:'Buddy', en:`Same here.`, zh:'彼此彼此。'}
      ],
      '身份描述常用：I am / I\'m + 职业；楼层/房间：on the 8th floor / in Room 305。',
      ['name','designer','team','floor','work','product']
    ),
    mk(
      'A-A0 入门-3',
      '咖啡店点单',
      'Ordering at a Café',
      [
        {speaker:'Barista', en:`Hi there! What can I get for you?`, zh:'你好！请问要点什么？'},
        {speaker:'You',     en:`A cappuccino, please.`, zh:'来一杯卡布奇诺，谢谢。'},
        {speaker:'Barista', en:`For here or to go?`, zh:'堂食还是外带？'},
        {speaker:'You',     en:`For here.`, zh:'堂食。'},
        {speaker:'Barista', en:`Any sugar or milk?`, zh:'需要加糖或牛奶吗？'},
        {speaker:'You',     en:`No sugar, extra milk foam, please.`, zh:'不要糖，奶泡多一点，谢谢。'},
        {speaker:'Barista', en:`Got it. That'll be $4.50.`, zh:'好的，一共4.50美元。'},
        {speaker:'You',     en:`Here you go.`, zh:'给你。'}
      ],
      '关键表达：for here / to go；现金或刷卡：cash or card。',
      ['cappuccino','to go','for here','sugar','milk','foam'],
      [
        {type:'choice', prompt:'“外带”英文？', choices:['to go','for here'], answer:0},
        {type:'fill',   prompt:'补全：Here you ____.（给你）', answer:'go'},
        {type:'fill',   prompt:'拼写：卡布奇诺（cappuccino）', answer:'cappuccino'}
      ]
    ),
    mk(
      'A-A0 入门-4',
      '问路与方向',
      'Asking for Directions',
      [
        {speaker:'You',   en:`Excuse me, where is the subway station?`, zh:'打扰一下，地铁站在哪？'},
        {speaker:'Local', en:`Go straight and turn left at the light.`, zh:'直走，到红绿灯处左转。'},
        {speaker:'You',   en:`Is it far from here?`, zh:'离这里远吗？'},
        {speaker:'Local', en:`About five minutes on foot.`, zh:'步行大约五分钟。'},
        {speaker:'You',   en:`Great, thanks!`, zh:'太好了，谢谢！'},
        {speaker:'Local', en:`You're welcome.`, zh:'不客气。'},
        {speaker:'You',   en:`Which line goes to the museum?`, zh:'去博物馆坐哪条线？'},
        {speaker:'Local', en:`Line 2. The station is on your left.`, zh:'2号线。站口在你左边。'}
      ],
      '方向词：straight 直行，turn left/right 左/右转；on your left/right 在你左/右侧。',
      ['straight','turn left','turn right','station','line','museum']
    ),
    mk(
      'A-A0 入门-5',
      '酒店入住',
      'Hotel Check-in',
      [
        {speaker:'You',   en:`Hello, I have a reservation under Chen.`, zh:'你好，我以 Chen 的名字预订了。'},
        {speaker:'Clerk', en:`Welcome. May I see your passport?`, zh:'欢迎。请出示护照。'},
        {speaker:'You',   en:`Here it is.`, zh:'给你。'},
        {speaker:'Clerk', en:`Would you like a room with a view?`, zh:'需要景观房吗？'},
        {speaker:'You',   en:`Yes, if possible.`, zh:'如果可以的话。'},
        {speaker:'Clerk', en:`Sure. Breakfast is from 7 to 10.`, zh:'当然。早餐时间7点到10点。'},
        {speaker:'You',   en:`Great. Where is the elevator?`, zh:'太好了。电梯在哪？'},
        {speaker:'Clerk', en:`On your right. Enjoy your stay.`, zh:'在你的右侧。祝你入住愉快。'}
      ],
      '常用词：reservation 预订、passport 护照、elevator 电梯、breakfast 早餐。',
      ['reservation','passport','elevator','breakfast','view','stay']
    ),
    mk(
      'A-A0 入门-6',
      '超市购物',
      'Grocery Shopping',
      [
        {speaker:'You',   en:`Excuse me, where can I find rice?`, zh:'请问大米在哪？'},
        {speaker:'Clerk', en:`Aisle 5, next to the noodles.`, zh:'5号货架，在面条旁边。'},
        {speaker:'You',   en:`Do you have soy sauce as well?`, zh:'有酱油吗？'},
        {speaker:'Clerk', en:`Yes, bottom shelf.`, zh:'有，在底层。'},
        {speaker:'You',   en:`Thanks. And is there a discount today?`, zh:'谢谢。今天有折扣吗？'},
        {speaker:'Clerk', en:`Buy two, get one free.`, zh:'买二赠一。'},
        {speaker:'You',   en:`Great deal!`, zh:'很划算！'},
        {speaker:'Clerk', en:`Please pay at the self-checkout.`, zh:'请到自助结账。'}
      ],
      '热词：aisle 货架、shelf 货层、discount 折扣、self-checkout 自助结账。',
      ['aisle','shelf','discount','checkout','rice','noodles']
    ),
    mk(
      'A-A0 入门-7',
      '电话与时间约定',
      'Phone & Appointment',
      [
        {speaker:'You',   en:`Hi, I'd like to book a haircut.`, zh:'你好，我想预约理发。'},
        {speaker:'Salon', en:`Sure. What time works for you?`, zh:'好的，什么时间合适？'},
        {speaker:'You',   en:`Tomorrow afternoon around three.`, zh:'明天下午三点左右。'},
        {speaker:'Salon', en:`We have a slot at 3:15.`, zh:'我们有3:15的空位。'},
        {speaker:'You',   en:`Perfect. What's the price?`, zh:'太好了。多少钱？'},
        {speaker:'Salon', en:`$18. See you then.`, zh:'18美元。到时见。'},
        {speaker:'You',   en:`Thanks. Bye.`, zh:'谢谢。再见。'},
        {speaker:'Salon', en:`Bye!`, zh:'再见！'}
      ],
      '常用：book 预约、slot 空档、around 大约；时间说法 3:15 = three fifteen。',
      ['book','appointment','slot','price','tomorrow','afternoon']
    ),
    mk(
      'A-A0 入门-8',
      '家庭与朋友',
      'Family & Friends',
      [
        {speaker:'You',   en:`This is my cousin, Lily.`, zh:'这是我表妹 Lily。'},
        {speaker:'Lily',  en:`Nice to meet you!`, zh:'很高兴认识你！'},
        {speaker:'You',   en:`We grew up in the same city.`, zh:'我们在同一个城市长大。'},
        {speaker:'Friend',en:`Cool. Do you see each other often?`, zh:'不错。你们经常见面吗？'},
        {speaker:'You',   en:`Not really, but we chat online.`, zh:'不太，经常线上聊天。'},
        {speaker:'Lily',  en:`We're planning a trip next month.`, zh:'我们打算下个月旅行。'},
        {speaker:'Friend',en:`Have fun!`, zh:'玩得开心！'},
        {speaker:'You',   en:`Thanks!`, zh:'谢谢！'}
      ],
      '家人称呼：cousin 表兄妹、aunt 阿姨、uncle 叔叔；see each other 见面。',
      ['cousin','grew up','online','trip','next month','city']
    ),
    mk(
      'A-A0 入门-9',
      '兴趣与爱好',
      'Hobbies',
      [
        {speaker:'You',   en:`I enjoy jogging in the morning.`, zh:'我喜欢早上慢跑。'},
        {speaker:'Buddy', en:`Nice! I prefer yoga.`, zh:'不错！我更喜欢瑜伽。'},
        {speaker:'You',   en:`Do you play any instruments?`, zh:'你会乐器吗？'},
        {speaker:'Buddy', en:`A little guitar.`, zh:'会一点吉他。'},
        {speaker:'You',   en:`Maybe we can start a small band.`, zh:'也许我们可以组个小乐队。'},
        {speaker:'Buddy', en:`That sounds fun.`, zh:'听起来很有趣。'},
        {speaker:'You',   en:`Let's practice on weekends.`, zh:'周末一起练习吧。'},
        {speaker:'Buddy', en:`Deal!`, zh:'说定了！'}
      ],
      '表示喜欢：like / enjoy / prefer；乐器前常用 play + the guitar / the piano。',
      ['jogging','yoga','guitar','practice','weekends','band']
    ),
    mk(
      'A-A0 入门-10',
      '日程与提醒',
      'Daily Schedule',
      [
        {speaker:'You',   en:`I usually wake up at seven.`, zh:'我通常七点起床。'},
        {speaker:'Roomie',en:`Do you eat breakfast at home?`, zh:'你在家吃早餐吗？'},
        {speaker:'You',   en:`Yes, toast and milk.`, zh:'是的，吐司和牛奶。'},
        {speaker:'Roomie',en:`When do you start work?`, zh:'你几点开始工作？'},
        {speaker:'You',   en:`At nine. I set reminders on my phone.`, zh:'九点。我在手机上设提醒。'},
        {speaker:'Roomie',en:`Good habit!`, zh:'好习惯！'},
        {speaker:'You',   en:`I sleep before eleven.`, zh:'我十一点前睡觉。'},
        {speaker:'Roomie',en:`Nice and healthy.`, zh:'很健康。'}
      ],
      '日常搭配：wake up 起床、have breakfast 吃早餐、set reminders 设提醒。',
      ['wake up','breakfast','toast','reminder','before','sleep']
    )
  ];

  const A1 = [
    mk(
      'A-A1 生存-1',
      '餐厅点餐与找位',
      'Restaurant: Seating & Ordering',
      [
        {speaker:'Host',  en:`Table for two?`, zh:'两位吗？'},
        {speaker:'You',   en:`Yes, by the window if possible.`, zh:'是的，靠窗可以吗？'},
        {speaker:'Host',  en:`Sure. Here are the menus.`, zh:'当然。这是菜单。'},
        {speaker:'Server',en:`Would you like any drinks?`, zh:'需要饮料吗？'},
        {speaker:'You',   en:`Water first, please.`, zh:'先来水，谢谢。'},
        {speaker:'Server',en:`Any appetizers?`, zh:'要前菜吗？'},
        {speaker:'You',   en:`Caesar salad to share.`, zh:'点一份凯撒沙拉分享。'},
        {speaker:'Server',en:`Coming right up.`, zh:'马上来。'}
      ],
      '常用顺序：就座 → 饮料 → 前菜 → 主菜；by the window 靠窗。',
      ['table','menu','appetizer','salad','share','by the window']
    ),
    mk(
      'A-A1 生存-2',
      '公交地铁出行',
      'Public Transport',
      [
        {speaker:'You',   en:`Which bus goes to the museum?`, zh:'去博物馆坐哪路公交？'},
        {speaker:'Driver',en:`Take bus 16 and transfer to Line 2.`, zh:'先坐16路，再换2号线。'},
        {speaker:'You',   en:`Where should I transfer?`, zh:'在哪里换乘？'},
        {speaker:'Driver',en:`At Central Station.`, zh:'在中央车站。'},
        {speaker:'You',   en:`How much is the fare?`, zh:'票价多少？'},
        {speaker:'Driver',en:`$2 with a transit card.`, zh:'刷卡2美元。'},
        {speaker:'You',   en:`Thanks for the help.`, zh:'谢谢你的帮助。'},
        {speaker:'Driver',en:`You're welcome.`, zh:'不客气。'}
      ],
      '关键词：transfer 换乘、fare 票价、transit card 交通卡。',
      ['bus','transfer','fare','transit card','station','take']
    ),
    mk(
      'A-A1 生存-3',
      '看病挂号',
      'Doctor Visit',
      [
        {speaker:'You',   en:`I have a sore throat and a fever.`, zh:'我嗓子疼并发烧。'},
        {speaker:'Nurse', en:`Please fill out this form.`, zh:'请先填这张表。'},
        {speaker:'Doctor',en:`How long have you felt this way?`, zh:'这种情况多久了？'},
        {speaker:'You',   en:`Two days.`, zh:'两天了。'},
        {speaker:'Doctor',en:`You need to rest and drink more water.`, zh:'需要休息，多喝水。'},
        {speaker:'Doctor',en:`I'll prescribe some medicine.`, zh:'我给你开些药。'},
        {speaker:'You',   en:`Thank you, doctor.`, zh:'谢谢医生。'},
        {speaker:'Doctor',en:`Get well soon.`, zh:'早日康复。'}
      ],
      '就医词：fever 发烧、sore throat 嗓子疼、prescribe 开处方、get well soon 早日康复。',
      ['fever','sore throat','rest','water','prescribe','medicine']
    ),
    mk(
      'A-A1 生存-4',
      '银行与换汇',
      'Bank & Currency Exchange',
      [
        {speaker:'You',   en:`I'd like to open a savings account.`, zh:'我想开一个储蓄账户。'},
        {speaker:'Clerk', en:`Please show your ID and address.`, zh:'请出示身份证件和地址证明。'},
        {speaker:'You',   en:`Here they are.`, zh:'给你。'},
        {speaker:'Clerk', en:`Would you like a debit card as well?`, zh:'需要借记卡吗？'},
        {speaker:'You',   en:`Yes, please. And what's the exchange rate today?`, zh:'要的。今天的汇率是多少？'},
        {speaker:'Clerk', en:`1 dollar to 7.1 yuan.`, zh:'1美元兑7.1人民币。'},
        {speaker:'You',   en:`Thanks.`, zh:'谢谢。'},
        {speaker:'Clerk', en:`You're welcome.`, zh:'不客气。'}
      ],
      '关键词：savings account 储蓄账户、debit card 借记卡、exchange rate 汇率。',
      ['account','debit card','exchange rate','ID','address','rate']
    ),
    mk(
      'A-A1 生存-5',
      '网购与快递',
      'Online Shopping & Delivery',
      [
        {speaker:'You',   en:`I ordered a phone case online.`, zh:'我在网上买了一个手机壳。'},
        {speaker:'Courier',en:`Please confirm your address.`, zh:'请确认你的地址。'},
        {speaker:'You',   en:`Building A, Room 1203.`, zh:'A座1203。'},
        {speaker:'Courier',en:`Your package will arrive this afternoon.`, zh:'你的包裹今天下午到。'},
        {speaker:'You',   en:`Thank you.`, zh:'谢谢。'},
        {speaker:'Courier',en:`If no one is home, we can leave it at reception.`, zh:'如果家里没人，我们可以放在前台。'},
        {speaker:'You',   en:`Okay, that's fine.`, zh:'好的没问题。'},
        {speaker:'Courier',en:`Have a nice day.`, zh:'祝你有美好的一天。'}
      ],
      '高频：order 下单、package 包裹、arrive 到达、reception 前台。',
      ['order','package','arrive','address','reception','confirm']
    ),
    mk(
      'A-A1 生存-6',
      '租房看房',
      'Apartment Viewing',
      [
        {speaker:'Agent', en:`This is a one-bedroom apartment.`, zh:'这是一居室。'},
        {speaker:'You',   en:`Is the rent negotiable?`, zh:'房租可谈吗？'},
        {speaker:'Agent', en:`A little. Utilities are not included.`, zh:'可以一点，水电另算。'},
        {speaker:'You',   en:`Is there a washing machine?`, zh:'有洗衣机吗？'},
        {speaker:'Agent', en:`Yes, and the subway is five minutes away.`, zh:'有，地铁步行五分钟。'},
        {speaker:'You',   en:`Great. Can I move in next week?`, zh:'很好。我下周能入住吗？'},
        {speaker:'Agent', en:`Sure, we can sign the contract tomorrow.`, zh:'可以，明天签合同。'},
        {speaker:'You',   en:`Deal.`, zh:'成交。'}
      ],
      '词汇：rent 房租、utilities 水电、move in 入住、contract 合同。',
      ['rent','utilities','washing machine','subway','contract','move in']
    ),
    mk(
      'A-A1 生存-7',
      '旅游咨询',
      'Tourist Information',
      [
        {speaker:'You',   en:`What attractions do you recommend?`, zh:'你推荐哪些景点？'},
        {speaker:'Guide', en:`The old town and the riverside park.`, zh:'老城区和滨河公园。'},
        {speaker:'You',   en:`Is there a city pass?`, zh:'有城市通票吗？'},
        {speaker:'Guide', en:`Yes, it covers museums and buses.`, zh:'有，包含博物馆和公交。'},
        {speaker:'You',   en:`Perfect. How much is it?`, zh:'太好了。多少钱？'},
        {speaker:'Guide', en:`$25 for one day.`, zh:'一天25美元。'},
        {speaker:'You',   en:`I'll take one.`, zh:'我要一张。'},
        {speaker:'Guide', en:`Enjoy your trip!`, zh:'祝旅途愉快！'}
      ],
      '搭配：recommend 推荐、attraction 景点、city pass 通票、cover 包含。',
      ['recommend','attraction','city pass','museum','bus','riverside']
    ),
    mk(
      'A-A1 生存-8',
      '工作沟通：安排会议',
      'Work: Schedule a Meeting',
      [
        {speaker:'You',   en:`Can we meet tomorrow morning?`, zh:'我们明早能开个会吗？'},
        {speaker:'Colleague', en:`I’m free at 10.`, zh:'我10点有空。'},
        {speaker:'You',   en:`Great. Agenda: timeline and budget.`, zh:'好。议程：时间线和预算。'},
        {speaker:'Colleague', en:`I'll invite the designer as well.`, zh:'我也把设计师拉上。'},
        {speaker:'You',   en:`Let's use the meeting room on 5F.`, zh:'我们用5楼会议室。'},
        {speaker:'Colleague', en:`Okay, I'll send a calendar invite.`, zh:'好，我发日程邀请。'},
        {speaker:'You',   en:`Thanks!`, zh:'谢谢！'},
        {speaker:'Colleague', en:`See you then.`, zh:'到时见。'}
      ],
      '关键词：agenda 议程、timeline 时间线、budget 预算、invite 日程邀请。',
      ['agenda','timeline','budget','invite','meeting room','calendar']
    ),
    mk(
      'A-A1 生存-9',
      '邮件与确认',
      'Email & Confirmation',
      [
        {speaker:'You',   en:`I sent the file. Did you receive it?`, zh:'我已发送文件，你收到了吗？'},
        {speaker:'Client',en:`Yes, but the attachment is too large.`, zh:'收到了，但附件太大。'},
        {speaker:'You',   en:`I'll share a link instead.`, zh:'我改用链接分享。'},
        {speaker:'Client',en:`Great. Please allow access.`, zh:'好，请开放访问权限。'},
        {speaker:'You',   en:`Done. Let me know if it works.`, zh:'好了，试试是否可用。'},
        {speaker:'Client',en:`It works now. Thank you.`, zh:'现在可以了，谢谢。'},
        {speaker:'You',   en:`You're welcome.`, zh:'不客气。'},
        {speaker:'Client',en:`Talk soon.`, zh:'回头聊。'}
      ],
      '常见：attachment 附件、allow access 开放权限、share a link 分享链接。',
      ['attachment','share link','access','receive','works','allow']
    ),
    mk(
      'A-A1 生存-10',
      '简单演示与反馈',
      'Mini Presentation & Feedback',
      [
        {speaker:'You',   en:`Let me give a quick demo.`, zh:'我做个快速演示。'},
        {speaker:'Team',  en:`Go ahead.`, zh:'请开始。'},
        {speaker:'You',   en:`Here is the new layout and the flow.`, zh:'这是新布局和流程。'},
        {speaker:'Team',  en:`Looks clear. What's the timeline?`, zh:'看起来清晰。时间线如何？'},
        {speaker:'You',   en:`Beta next week; launch next month.`, zh:'下周内测，下月上线。'},
        {speaker:'Team',  en:`Any risks?`, zh:'有什么风险？'},
        {speaker:'You',   en:`Scope change and tight schedule.`, zh:'范围变化与时间紧张。'},
        {speaker:'Team',  en:`Thanks. We'll share feedback soon.`, zh:'谢谢。我们尽快反馈。'}
      ],
      '词汇：demo 演示、layout 布局、flow 流程、risk 风险、scope 范围。',
      ['demo','layout','flow','risk','scope','timeline']
    )
  ];

  const A2 = [
    mk(
      'A-A2 进阶-1',
      '项目汇报：进度与风险',
      'Project Update: Progress & Risks',
      [
        {speaker:'You',   en:`We finished the core features.`, zh:'我们已完成核心功能。'},
        {speaker:'Manager',en:`Great. Any blockers?`, zh:'很好。有阻碍吗？'},
        {speaker:'You',   en:`Vendor delivery is delayed by a week.`, zh:'供应商交付延后一周。'},
        {speaker:'Manager',en:`What's your mitigation plan?`, zh:'你的缓解方案是什么？'},
        {speaker:'You',   en:`We’ll parallelize testing and adjust scope.`, zh:'并行测试并调整范围。'},
        {speaker:'Manager',en:`Sounds good. Keep me posted.`, zh:'不错，随时更新我。'},
        {speaker:'You',   en:`Will do.`, zh:'好的。'},
        {speaker:'Manager',en:`Thanks for the transparency.`, zh:'感谢你坦诚。'}
      ],
      '术语：blocker 阻碍、mitigation 缓解、parallelize 并行、keep me posted 随时同步。',
      ['feature','blocker','mitigation','parallel','scope','update']
    ),
    mk(
      'A-A2 进阶-2',
      '客户沟通：需求澄清',
      'Client Call: Clarifying Requirements',
      [
        {speaker:'You',   en:`To confirm, you need export in CSV, right?`, zh:'确认一下，你们需要 CSV 导出，对吗？'},
        {speaker:'Client',en:`Yes, and weekly reports by email.`, zh:'对，还要每周邮件报告。'},
        {speaker:'You',   en:`Got it. Do you have a preferred layout?`, zh:'明白。你们有偏好的布局吗？'},
        {speaker:'Client',en:`Simple table is fine.`, zh:'简单表格即可。'},
        {speaker:'You',   en:`We can ship a beta next Friday.`, zh:'我们下周五可提供测试版。'},
        {speaker:'Client',en:`Perfect. We'll test and give feedback.`, zh:'太好了，我们测试后反馈。'},
        {speaker:'You',   en:`Thanks for the input.`, zh:'谢谢你的意见。'},
        {speaker:'Client',en:`Talk soon.`, zh:'回头聊。'}
      ],
      '关键：confirm 确认、preferred 偏好、ship 交付、feedback 反馈。',
      ['confirm','CSV','weekly report','layout','beta','feedback']
    ),
    mk(
      'A-A2 进阶-3',
      '基础谈判：价格与让步',
      'Negotiation: Price & Concessions',
      [
        {speaker:'You',   en:`Our quote is based on the full scope.`, zh:'我们的报价基于完整范围。'},
        {speaker:'Buyer', en:`Can you offer a discount?`, zh:'能给个折扣吗？'},
        {speaker:'You',   en:`If we reduce the scope, we can lower the price.`, zh:'若减少范围，我们可以降价。'},
        {speaker:'Buyer', en:`What if we extend the timeline instead?`, zh:'如果延长周期呢？'},
        {speaker:'You',   en:`Then we can split payments quarterly.`, zh:'那我们可以按季度分期。'},
        {speaker:'Buyer', en:`That works for us.`, zh:'这对我们可行。'},
        {speaker:'You',   en:`Great, I'll update the proposal.`, zh:'好的，我更新方案。'},
        {speaker:'Buyer', en:`Looking forward to it.`, zh:'期待。'}
      ],
      '词汇：quote 报价、concession 让步、proposal 方案、quarterly 季度的。',
      ['quote','discount','scope','timeline','proposal','quarterly']
    ),
    mk(
      'A-A2 进阶-4',
      '演讲排练：开场与结构',
      'Presentation Rehearsal: Opening & Structure',
      [
        {speaker:'Coach', en:`Start with a story to engage the audience.`, zh:'用一个故事开场，抓住听众。'},
        {speaker:'You',   en:`Then outline the three key points.`, zh:'然后概述三大要点。'},
        {speaker:'Coach', en:`Keep slides simple and readable.`, zh:'保持幻灯片简洁可读。'},
        {speaker:'You',   en:`And end with a clear call to action.`, zh:'最后以明确的行动号召收尾。'},
        {speaker:'Coach', en:`Good. Practice your timing.`, zh:'好。练好时间控制。'},
        {speaker:'You',   en:`Got it.`, zh:'明白。'},
        {speaker:'Coach', en:`You’re ready.`, zh:'你准备好了。'},
        {speaker:'You',   en:`Thank you!`, zh:'谢谢！'}
      ],
      '术语：engage 吸引、outline 概述、call to action 行动号召、timing 节奏。',
      ['story','audience','outline','slides','call to action','timing']
    ),
    mk(
      'A-A2 进阶-5',
      '远程协作：在线工具',
      'Remote Collaboration: Tools',
      [
        {speaker:'You',   en:`Let's create a shared doc for notes.`, zh:'我们建个共享文档做笔记。'},
        {speaker:'Peer',  en:`I'll set up a channel for updates.`, zh:'我建一个频道同步更新。'},
        {speaker:'You',   en:`We can track tasks on a board.`, zh:'我们用看板跟踪任务。'},
        {speaker:'Peer',  en:`Daily stand-up at 9 works?`, zh:'每天 9 点站会可以吗？'},
        {speaker:'You',   en:`Works for me.`, zh:'我没问题。'},
        {speaker:'Peer',  en:`Great. I'll share access.`, zh:'好的。我开权限。'},
        {speaker:'You',   en:`Thanks!`, zh:'谢谢！'},
        {speaker:'Peer',  en:`Let's keep it async and concise.`, zh:'尽量异步且简洁。'}
      ],
      '关键词：shared doc 共享文档、channel 频道、board 看板、stand-up 站会、async 异步。',
      ['shared doc','channel','board','stand-up','access','async']
    ),
    mk(
      'A-A2 进阶-6',
      '投诉与解决方案',
      'Complaint & Resolution',
      [
        {speaker:'You',   en:`My order arrived damaged.`, zh:'我收到的订单有破损。'},
        {speaker:'Support',en:`Sorry about that. Could you send photos?`, zh:'很抱歉。可以发照片吗？'},
        {speaker:'You',   en:`Here they are.`, zh:'在这里。'},
        {speaker:'Support',en:`We can offer a replacement or a refund.`, zh:'我们可补发或退款。'},
        {speaker:'You',   en:`Please send a replacement.`, zh:'请补发一个。'},
        {speaker:'Support',en:`Done. You'll get a new one in 3 days.`, zh:'好的，三天内送达。'},
        {speaker:'You',   en:`Thanks for the quick response.`, zh:'谢谢你们的快速处理。'},
        {speaker:'Support',en:`You're welcome.`, zh:'不客气。'}
      ],
      '词汇：damaged 破损、replacement 补发、refund 退款、response 响应。',
      ['damaged','replacement','refund','photos','response','offer']
    ),
    mk(
      'A-A2 进阶-7',
      '解读图表与趋势',
      'Reading Charts & Trends',
      [
        {speaker:'You',   en:`The chart shows a steady increase.`, zh:'图表显示稳定增长。'},
        {speaker:'Analyst',en:`Revenue peaked in Q3.`, zh:'收入在第三季度达峰。'},
        {speaker:'You',   en:`Costs also rose, but at a slower rate.`, zh:'成本也上升，但速度更慢。'},
        {speaker:'Analyst',en:`The trend suggests strong demand.`, zh:'趋势表明需求旺盛。'},
        {speaker:'You',   en:`We need to forecast next quarter.`, zh:'我们要预测下季度。'},
        {speaker:'Analyst',en:`Let's run a scenario analysis.`, zh:'做个情景分析吧。'},
        {speaker:'You',   en:`Agreed.`, zh:'同意。'},
        {speaker:'Analyst',en:`I'll share the model.`, zh:'我来分享模型。'}
      ],
      '术语：steady increase 稳步增长、peak 达峰、forecast 预测、scenario 情景。',
      ['chart','trend','increase','peak','forecast','scenario']
    ),
    mk(
      'A-A2 进阶-8',
      '活动策划与分工',
      'Event Planning & Roles',
      [
        {speaker:'You',   en:`We need a venue and a timeline.`, zh:'我们需要场地和时间线。'},
        {speaker:'Lead',  en:`I'll handle the venue.`, zh:'我负责场地。'},
        {speaker:'You',   en:`I'll take care of promotion.`, zh:'我负责推广。'},
        {speaker:'Lead',  en:`Who designs the posters?`, zh:'谁做海报？'},
        {speaker:'You',   en:`The design team.`, zh:'设计团队。'},
        {speaker:'Lead',  en:`Great. Let's set a weekly check-in.`, zh:'好。设个每周同步。'},
        {speaker:'You',   en:`Works for me.`, zh:'好。'},
        {speaker:'Lead',  en:`Thanks, everyone.`, zh:'谢谢大家。'}
      ],
      '搭配：take care of 负责、handle 处理、check-in 同步。',
      ['venue','timeline','promotion','poster','weekly','check-in']
    ),
    mk(
      'A-A2 进阶-9',
      '跨文化交流礼仪',
      'Cross-cultural Etiquette',
      [
        {speaker:'You',   en:`Any tips for today’s meeting with the Japan team?`, zh:'今天和日本团队的会，有什么注意点？'},
        {speaker:'Mentor',en:`Be punctual and listen more at first.`, zh:'准时，先多听。'},
        {speaker:'You',   en:`Should I use first names?`, zh:'我应该直呼其名吗？'},
        {speaker:'Mentor',en:`Use last names with san at the beginning.`, zh:'一开始用姓氏+さん比较好。'},
        {speaker:'You',   en:`Got it.`, zh:'明白。'},
        {speaker:'Mentor',en:`Keep slides simple and avoid slang.`, zh:'PPT简洁，避免俚语。'},
        {speaker:'You',   en:`Thanks for the advice.`, zh:'谢谢建议。'},
        {speaker:'Mentor',en:`You’ll do great.`, zh:'你会做得很好的。'}
      ],
      '要点：punctual 守时、slang 俚语、advice 建议、avoid 避免。',
      ['punctual','listen','last name','simple','slang','advice']
    ),
    mk(
      'A-A2 进阶-10',
      '面试准备：自我亮点',
      'Interview Prep: Highlights',
      [
        {speaker:'You',   en:`My strength is turning ideas into clear products.`, zh:'我的优势是把想法落地成清晰的产品。'},
        {speaker:'Coach', en:`Give a concrete example.`, zh:'给个具体例子。'},
        {speaker:'You',   en:`I led a redesign that raised conversion by 20%.`, zh:'我主导的改版带来20%的转化提升。'},
        {speaker:'Coach', en:`Nice. End with what you want next.`, zh:'很好。最后说你下一步想做什么。'},
        {speaker:'You',   en:`I want to build tools that help small teams move faster.`, zh:'我想打造帮助小团队更快推进的工具。'},
        {speaker:'Coach', en:`Great closing.`, zh:'很好的收尾。'},
        {speaker:'You',   en:`Thank you!`, zh:'谢谢！'},
        {speaker:'Coach', en:`Good luck.`, zh:'祝你好运。'}
      ],
      'STAR 法：Situation 场景、Task 任务、Action 行动、Result 结果；closing 收尾。',
      ['strength','example','redesign','conversion','closing','result']
    )
  ];

  window.COURSE_PART = {
    'A0 入门': A0,
    'A1 生存': A1,
    'A2 进阶': A2
  };
})();

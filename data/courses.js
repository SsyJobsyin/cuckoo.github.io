/* ==========================================
   Ladder English - 全量课程数据（120节）
   用法：在 index.html 里先引入本文件，再引入 app.js
   window.COURSES 会被 app.js 直接使用
   ========================================== */

(function(){
  const rand = (arr)=>arr[Math.floor(Math.random()*arr.length)];
  const lower = (s)=> (typeof s==='string'? s.toLowerCase(): String(s??'topic').toLowerCase());

  /* 轨道与主题（各60） */
  const adultLevels=['A0 入门','A1 生存','A2 进阶','B1 门槛','B2 优势','C1 高级'];
  const kidsLevels =['G1','G2','G3','G4','G5','G6','G7','G8','G9'];
  const adultTopics=['打招呼','自我介绍','餐厅点餐','问路交通','旅馆办理','工作沟通','邮件会议','兴趣爱好','日常作息','健康药店',
  '银行取款','网购快递','手机应用','租房看房','城市景点','职业发展','项目汇报','客户沟通','跨文化交流','投诉与解决',
  '采访提问','环保节能','新闻观点','学习方法','志愿公益','数据图表','谈判妥协','演讲叙事','产品对比','市场品牌',
  '风险应对','团队协作','远程办公','批判思维','时间管理','抽象概念','因果推演','隐喻类比','学术讨论','策略制定',
  '行业趋势','伦理选择','领导激励','跨学科整合','反思复盘','旅行计划','电影音乐','运动健身','节日传统',
  '购物寒暄','天气心情','颜色物品','简单方位','国家语言','家庭朋友','课堂表达','数字时间','自然与季节','媒体素养'];
  const kidTopics=['颜色','动物','数字与形状','学校与文具','家庭成员','食物饮料','天气衣物','身体健康','交通工具','节日活动',
  '日常作息','爱好运动','地点方向','自然季节','职业梦想','故事童话','安全礼貌','环保地球','科技机器人','旅行城市',
  '水果蔬菜','房屋房间','宠物护理','海洋世界','森林探险','太空星球','音乐节奏','绘画手工','校内活动','朋友相处',
  '情绪表达','时间日期','公园游玩','露营野炊','迷宫寻宝','拼图工坊','动物救援','小小科学家','植物种植','家务分工',
  '交通规则','垃圾分类','节约用水','节电护家','家乡特色','中国美食','中国地理','传统节日','英语儿歌','绕口令',
  '童话改编','角色扮演','礼物选择','生日派对','新年计划','暑期旅行','开学第一天','期末复盘'];

  /* 词汇模板 */
  const bank = {
    '餐厅点餐': ['menu','order','rice','tea','sandwich','water'],
    '问路交通': ['left','right','bus','station','stop','ticket'],
    '工作沟通': ['team','meeting','email','project','deadline','report'],
    '数据图表': ['data','chart','increase','percent','trend','survey'],
    '颜色': ['red','blue','green','yellow','black','white'],
    '动物': ['cat','dog','fox','whale','panda','tiger'],
    '学校与文具': ['pen','book','bag','desk','pencil','ruler'],
  };
  const wordsOf = (t)=> bank[t] || ['learn','word','speak','phrase','study','practice'];

  /* 生成一节课（更丰富的内容模版） */
  function makeLesson(id, zh, en, ws){
    zh = zh || '主题'; en = en || zh; ws = Array.isArray(ws)&&ws.length? ws : ['learn','word','speak','practice'];
    const examples = [
      {speaker:'You',   en:`I want to talk about ${lower(en)}.`, zh:`我想聊聊${zh}。`},
      {speaker:'Buddy', en:`Great. Let's start with a simple example.`, zh:`太好了，我们从一个简单例子开始。`}
    ];
    const patternsAdult = [
      {type:'phrase',  en:`Today's topic: ${en}.`, zh:`本课主题：${zh}。`},
      {type:'dialogue',lines:examples.concat([
        {speaker:'You',   en:`Could you give me some common phrases about ${lower(en)}?`, zh:`你能给我一些与“${zh}”相关的常用表达吗？`},
        {speaker:'Buddy', en:`Sure: ${ws.slice(0,3).join(', ')}.`, zh:`当然，比如：${ws.slice(0,3).join('、')}。`}
      ])},
      {type:'tip', zh:`重点：${zh} 常用表达、场景与礼貌说法。`, en:`Focus: key phrases and polite expressions.`}
    ];
    const patternsKids = [
      {type:'phrase',  en:`Let's learn ${en}!`, zh:`我们来学习“${zh}”！`},
      {type:'dialogue',lines:examples.concat([
        {speaker:'Buddy', en:`Look at this!`, zh:`你看这个！`},
        {speaker:'You',   en:`Wow, so cool!`, zh:`哇，太酷啦！`}
      ])},
      {type:'tip', zh:`小贴士：把新词做成小卡片，反复读。`, en:`Tip: Make flashcards and repeat.`}
    ];
    const isKids = /G\d/.test(id);
    const content = isKids ? patternsKids : patternsAdult;

    /* 练习：填空/选择/拼写 */
    const vocab0 = ws[0] || 'hello';
    const ex = [
      {type:'fill',   prompt:`填空：I'd ____ a coffee, please.（礼貌点餐）`, answer:'like'},
      {type:'choice', prompt:`哪个与“${zh}”更相关？`, choices:[vocab0,'苹果'], answer:0},
      {type:'fill',   prompt:`拼写：请输入单词 “${vocab0}”`, answer:vocab0.toLowerCase()}
    ];

    return {
      id,
      titleZh: zh,
      titleEn: en,
      content,
      exercise: ex,
      gameVocab: ws.slice(0,6).map(w=>({word:w, zh:'本课词'}))
    };
  }

  /* 构建成人60课 */
  const adult = {};
  adultLevels.forEach(lv => adult[lv]=[]);
  adultTopics.forEach((t,i)=>{
    const lv = adultLevels[Math.floor(i/10)];
    const id = `A-${lv}-${(i%10)+1}`;
    adult[lv].push(makeLesson(id, t, 'Topic '+(i+1), wordsOf(t)));
  });

  /* 构建少儿60课（按 7/7/7/7/7/7/6/6/6 分配到 9 个年级段） */
  const kids = {};
  const dist=[7,7,7,7,7,7,6,6,6]; let p=0;
  kidsLevels.forEach((lv,idx)=>{
    kids[lv]=[];
    for(let j=0;j<dist[idx];j++){
      const t = kidTopics[p++];
      const id = `K-${lv}-${j+1}`;
      kids[lv].push(makeLesson(id, t, t, wordsOf(t)));
    }
  });

  /* 增强若干“示范课”内容（成人 A0 前6，少儿 G1 前6） */
  function enrichAdult(lv, idx, zh, blocks, extraWords){
    const id = `A-${lv}-${idx+1}`;
    const ws = (wordsOf(zh)).concat(extraWords||[]);
    adult[lv][idx] = {
      id, titleZh: zh, titleEn: zh,
      content: blocks,
      exercise: [
        {type:'fill',   prompt:`补全句：I am ____ from China.`, answer:'from'},
        {type:'choice', prompt:`“${zh}”相关词？`, choices:[ws[0]||'hello','banana'], answer:0},
        {type:'fill',   prompt:`拼写：请输入单词 “${(ws[1]||'name')}”`, answer:String(ws[1]||'name').toLowerCase()}
      ],
      gameVocab: ws.slice(0,6).map(w=>({word:w, zh:'本课词'}))
    };
  }
  enrichAdult('A0 入门',0,'打招呼',[
    {type:'phrase', en:'Hi! Nice to meet you!', zh:'嗨！很高兴认识你！'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'Hi, I am Lily. What is your name?', zh:'嗨，我叫 Lily。你叫什么名字？'},
      {speaker:'Buddy', en:"I'm Tom. Nice to meet you, Lily.",   zh:'我叫 Tom。很高兴认识你，Lily。'},
      {speaker:'You',   en:'Nice to meet you too!',              zh:'我也很高兴认识你！'}
    ]},
    {type:'tip', zh:'第一次见面：Nice to meet you. 回应：Nice to meet you, too.'}
  ],['hi','hello','name','meet','nice','too']);
  enrichAdult('A0 入门',1,'自我介绍',[
    {type:'phrase', en:'I am from China.', zh:'我来自中国。'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'My name is Eric. I am a student.', zh:'我叫 Eric。我是一名学生。'},
      {speaker:'Buddy', en:'Nice to meet you, Eric!',          zh:'很高兴认识你，Eric！'}
    ]},
    {type:'tip', zh:'I am (= I\'m) + 身份/职业/国籍。'}
  ],['from','student','teacher','country','China','I']);
  enrichAdult('A0 入门',2,'餐厅点餐',[
    {type:'phrase', en:'I would like a coffee, please.', zh:'请给我一杯咖啡。'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'Menu, please.', zh:'请给我菜单。'},
      {speaker:'Buddy', en:'Here you are. What would you like?', zh:'给您。您想要点什么？'},
      {speaker:'You',   en:'A sandwich and tea, please.',   zh:'请来一个三明治和一杯茶。'}
    ]},
    {type:'tip', zh:'礼貌点餐常用 I would like… / Can I have…?'}
  ],['menu','order','tea','sandwich','please','coffee']);
  enrichAdult('A0 入门',3,'问路交通',[
    {type:'phrase', en:'Excuse me, where is the bus station?', zh:'打扰一下，公交站在哪？'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'Is it on the left or right?', zh:'在左边还是右边？'},
      {speaker:'Buddy', en:'Go straight and turn left.',  zh:'直走然后左转。'}
    ]},
    {type:'tip', zh:'方向：left 左，right 右；go straight 直行；turn left/right 左/右转。'}
  ],['left','right','bus','station','straight','turn']);
  enrichAdult('A0 入门',4,'旅馆办理',[
    {type:'phrase', en:'I have a reservation.', zh:'我有预订。'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'I booked a room for two nights.', zh:'我预订了两晚的房间。'},
      {speaker:'Buddy', en:'Please show your ID.',            zh:'请出示身份证件。'}
    ]},
    {type:'tip', zh:'酒店常用：reservation 预订，check in 办理入住，ID 证件。'}
  ],['reservation','room','check in','ID','nights','book']);
  enrichAdult('A0 入门',5,'工作沟通',[
    {type:'phrase', en:'We have a team meeting at 10.', zh:'我们10点有团队会议。'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'I will send an email later.', zh:'我待会发一封邮件。'},
      {speaker:'Buddy', en:'Please include the report.',  zh:'请把报告附上。'}
    ]},
    {type:'tip', zh:'办公室高频：team 团队，meeting 会议，email 邮件，report 报告。'}
  ],['team','meeting','email','report','include','later']);

  function enrichKids(lv, idx, zh, blocks, extraWords){
    const id = `K-${lv}-${idx+1}`;
    const ws = (wordsOf(zh)).concat(extraWords||[]);
    kids[lv][idx] = {
      id, titleZh: zh, titleEn: zh,
      content: blocks,
      exercise: [
        {type:'choice', prompt:`和“${zh}”更相关？`, choices:[ws[0]||'red','banana'], answer:0},
        {type:'fill',   prompt:`拼写：请输入单词 “${(ws[1]||'blue')}”`, answer:String(ws[1]||'blue').toLowerCase()},
        {type:'fill',   prompt:`英文表达：我喜欢猫 — I ____ cats.`, answer:'like'}
      ],
      gameVocab: ws.slice(0,6).map(w=>({word:w, zh:'本课词'}))
    };
  }
  enrichKids('G1',0,'颜色',[
    {type:'phrase', en:'Red, blue, green, yellow!', zh:'红、蓝、绿、黄！'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'What color is the apple?', zh:'苹果是什么颜色？'},
      {speaker:'Buddy', en:'It is red!',               zh:'是红色！'}
    ]},
    {type:'tip', zh:'颜色放在名词前：a red apple 一个红苹果。'}
  ],['red','blue','green','yellow','black','white']);
  enrichKids('G1',1,'动物',[
    {type:'phrase', en:'I like cats and dogs.', zh:'我喜欢猫和狗。'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'Look! A fox!', zh:'看！一只狐狸！'},
      {speaker:'Buddy', en:'Wow, it is cute!', zh:'哇，好可爱！'}
    ]},
    {type:'tip', zh:'常见动物：cat, dog, fox, whale 等。'}
  ],['cat','dog','fox','whale','panda','tiger']);
  enrichKids('G1',2,'学校与文具',[
    {type:'phrase', en:'This is my new bag.', zh:'这是我的新书包。'},
    {type:'dialogue',lines:[
      {speaker:'You',   en:'Can I use your pen?', zh:'我可以用你的笔吗？'},
      {speaker:'Buddy', en:'Sure, here you are!', zh:'当然，给你！'}
    ]},
    {type:'tip', zh:'文具：pen 笔、book 书、bag 书包、desk 课桌。'}
  ],['pen','book','bag','desk','pencil','ruler']);

  /* 输出给全站使用 */
  window.COURSES = { adult, kids };
})();

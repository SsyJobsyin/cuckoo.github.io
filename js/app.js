/* =========================
   Ladder English - app.js
   完整版 v-peppa7
   ========================= */

/* —— 工具函数（安全兜底） —— */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
function el(id){ return document.getElementById(id); }
function setText(id,v){ const x=el(id); if(x) x.textContent=v; }
function setHTML(id,v){ const x=el(id); if(x) x.innerHTML=v; }
function setWidth(id,v){ const x=el(id); if(x) x.style.width=v; }
function lower(s){ return typeof s==='string'? s.toLowerCase() : String(s??'topic').toLowerCase(); }
function asDays(v){
  if(typeof v==='number') return v;
  if(v && typeof v==='object' && typeof v.days==='number') return v.days;
  const n = Number(v); return Number.isFinite(n)? n : 0;
}
const store={
  get(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set(k,v){ localStorage.setItem(k, JSON.stringify(v)) }
};
function say(t,lang='en'){
  if(!('speechSynthesis' in window)) return;
  const u=new SpeechSynthesisUtterance(t);
  u.lang=lang==='en'?'en-US':'zh-CN';
  u.rate=Number(el('ttsRate')?.value||1);
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
function toast(msg){
  const t=el('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1400);
}

/* —— 全局状态 —— */
const state = {
  track: 'adult',
  progress: store.get('progress',{}),     // {id:{score,done}}
  activity: store.get('activity',[]),
  posts: store.get('posts',[]),
  circles: store.get('circles',[]),
  xp: store.get('xp',0),
  badges: store.get('badges',[]),
  streak: asDays(store.get('streak',0)),  // 仅展示，计算逻辑后续再加
  current: null,
  game:{time:60,timer:null,score:0,sel:null,mode:'match'}
};

/* —— 经验 & 徽章 —— */
function addXP(n){
  state.xp += n; store.set('xp',state.xp);
  checkBadges(); renderBadges();
}
function checkBadges(){
  const got=[];
  if(state.xp>=100 && !state.badges.includes('新手启程')) got.push('新手启程');
  if(state.xp>=300 && !state.badges.includes('稳步进阶')) got.push('稳步进阶');
  if(state.xp>=600 && !state.badges.includes('学习达人')) got.push('学习达人');
  if(got.length){
    state.badges = state.badges.concat(got);
    store.set('badges', state.badges);
    buddySay('🎖️ 获得徽章：'+got.join('、'));
  }
}
function renderBadges(){
  const box = el('badges'); if(!box) return;
  box.textContent = state.badges.length ? state.badges.join(' · ') : '—';
}

/* —— 课程数据（120 课自动生成 + 若干加强版内容） —— */
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

function wordsOf(t){
  const m={'餐厅点餐':['menu','order','rice','tea'],
           '问路交通':['left','right','bus','station'],
           '工作沟通':['team','meeting','email','project'],
           '数据图表':['data','chart','increase','percent'],
           '颜色':['red','blue','green','yellow'],
           '动物':['cat','dog','fox','whale'],
           '学校与文具':['pen','book','bag','desk']};
  return m[t] || ['learn','word','speak','phrase'];
}
function makeLesson(id, zh, en, ws){
  zh = zh || '主题'; en = en || zh; ws = Array.isArray(ws)&&ws.length? ws:['learn','word','speak','phrase'];
  return {
    id, titleZh: zh, titleEn: en,
    content: [
      {type:'phrase',  en:`Today's topic: ${en}.`, zh:`本课主题：${zh}。`},
      {type:'dialogue',lines:[
        {speaker:'You',   en:`I want to talk about ${lower(en)}.`, zh:`我想聊聊${zh}。`},
        {speaker:'Buddy', en:`Great! Let's start with examples.`,  zh:`太好了！从例子开始。`}
      ]},
      {type:'tip', zh:`重点：${zh} 的高频表达与常见场景。`, en:`Focus on high-frequency phrases.`}
    ],
    exercise: [
      {type:'fill',   prompt:`补全：I'd ____ a coffee, please.`, answer:'like'},
      {type:'choice', prompt:`哪个和“${zh}”更相关？`, choices:[ws[0]||'hello','苹果'], answer:0}
    ],
    gameVocab: ws.map(w=>({word:w, zh:'本课词'}))
  };
}
const lessons = (window.COURSES || {adult:{},kids:{}});


/* 自动生成 120 课 */
if (!window.COURSES) {
(function build(){
  adultLevels.forEach(lv=>lessons.adult[lv]=[]);
  adultTopics.forEach((t,i)=>{
    const topicZh=t||`主题 ${i+1}`;
    const lv=adultLevels[Math.floor(i/10)];
    const id=`A-${lv}-${(i%10)+1}`;
    lessons.adult[lv].push(makeLesson(id, topicZh, `Topic ${i+1}`, wordsOf(topicZh)));
  });
  const dist=[7,7,7,7,7,7,6,6,6]; let k=0;
  kidsLevels.forEach((lv,i)=>{
    lessons.kids[lv]=[];
    for(let j=0;j<dist[i];j++){
      const t=kidTopics[k++] || `少儿主题 ${k}`;
      const id=`K-${lv}-${j+1}`;
      lessons.kids[lv].push(makeLesson(id, t, t, wordsOf(t)));
    }
  });
})();

/* 加强：前 6 节示范课（成人/少儿）替换为更丰富内容 */
(function enrich(){
  // 成人 A0 入门 第1-3课
  const A0 = lessons.adult['A0 入门'];
  if(A0){
    A0[0]={
      id:'A-A0 入门-1', titleZh:'打招呼', titleEn:'Greeting',
      content:[
        {type:'phrase', en:'Hi! Nice to meet you!', zh:'嗨！很高兴认识你！'},
        {type:'dialogue',lines:[
          {speaker:'You',   en:'Hi, I am Lily. What is your name?', zh:'嗨，我叫 Lily。你叫什么名字？'},
          {speaker:'Buddy', en:"I'm Tom. Nice to meet you, Lily.",   zh:'我叫 Tom。很高兴认识你，Lily。'},
          {speaker:'You',   en:'Nice to meet you too!',              zh:'我也很高兴认识你！'}
        ]},
        {type:'tip', zh:'用 Hi/Hello 打招呼，Nice to meet you 表示第一次见面很高兴。'}
      ],
      exercise:[
        {type:'fill',   prompt:'补全：Nice to ____ you.', answer:'meet'},
        {type:'choice', prompt:'哪个是“你好”？', choices:['Hi','Bye'], answer:0}
      ],
      gameVocab:[{word:'hi',zh:'嗨'},{word:'hello',zh:'你好'},{word:'name',zh:'名字'},{word:'meet',zh:'见面'}]
    };
    A0[1]={
      id:'A-A0 入门-2', titleZh:'自我介绍', titleEn:'Introduce Yourself',
      content:[
        {type:'phrase', en:'I am from China.', zh:'我来自中国。'},
        {type:'dialogue',lines:[
          {speaker:'You',   en:'My name is Eric. I am a student.', zh:'我叫 Eric。我是一名学生。'},
          {speaker:'Buddy', en:'Nice to meet you, Eric!',          zh:'很高兴认识你，Eric！'}
        ]},
        {type:'tip', zh:'介绍自己时可用 I am (I\'m) + 职业/身份/国籍。'}
      ],
      exercise:[
        {type:'fill',   prompt:'补全：I ___ a teacher.', answer:'am'},
        {type:'choice', prompt:'哪句是“我来自中国”？', choices:['I am from China.','I am China.'], answer:0}
      ],
      gameVocab:[{word:'from',zh:'来自'},{word:'student',zh:'学生'},{word:'teacher',zh:'老师'},{word:'country',zh:'国家'}]
    };
    A0[2]={
      id:'A-A0 入门-3', titleZh:'餐厅点餐', titleEn:'Order Food',
      content:[
        {type:'phrase', en:'I would like a coffee, please.', zh:'请给我来一杯咖啡。'},
        {type:'dialogue',lines:[
          {speaker:'You',   en:'Menu, please.', zh:'请给我菜单。'},
          {speaker:'Buddy', en:'Here you are. What would you like?', zh:'菜单在这。您要点什么？'},
          {speaker:'You',   en:'I would like a sandwich and tea.',   zh:'我想要一个三明治和一杯茶。'}
        ]},
        {type:'tip', zh:'礼貌点餐常用 I would like… 或 Can I have…?'}
      ],
      exercise:[
        {type:'fill',   prompt:'补全：I would ____ a tea.', answer:'like'},
        {type:'choice', prompt:'哪一个更像餐厅会用的词？', choices:['menu','computer'], answer:0}
      ],
      gameVocab:[{word:'menu',zh:'菜单'},{word:'order',zh:'点单'},{word:'tea',zh:'茶'},{word:'sandwich',zh:'三明治'}]
    };
  }
  // 少儿 G1 第1-3课
  const G1 = lessons.kids['G1'];
  if(G1){
    G1[0]={
      id:'K-G1-1', titleZh:'颜色 Color', titleEn:'Colors',
      content:[
        {type:'phrase', en:'Red, blue, green, yellow!', zh:'红、蓝、绿、黄！'},
        {type:'dialogue',lines:[
          {speaker:'You',   en:'What color is the apple?', zh:'苹果是什么颜色？'},
          {speaker:'Buddy', en:'It is red!',              zh:'是红色！'}
        ]},
        {type:'tip', zh:'颜色放在名词前：a red apple 一个红苹果。'}
      ],
      exercise:[
        {type:'choice', prompt:'苹果通常是？', choices:['red','purple'], answer:0},
        {type:'fill',   prompt:'补全：a ____ apple', answer:'red'}
      ],
      gameVocab:[{word:'red',zh:'红色'},{word:'blue',zh:'蓝色'},{word:'green',zh:'绿色'},{word:'yellow',zh:'黄色'}]
    };
    G1[1]={
      id:'K-G1-2', titleZh:'动物 Animals', titleEn:'Animals',
      content:[
        {type:'phrase', en:'I like cats and dogs.', zh:'我喜欢猫和狗。'},
        {type:'dialogue',lines:[
          {speaker:'You',   en:'Look! A fox!', zh:'看！一只狐狸！'},
          {speaker:'Buddy', en:'Wow, it is cute!', zh:'哇，好可爱！'}
        ]},
        {type:'tip', zh:'动物名词常见：cat, dog, fox, whale 等。'}
      ],
      exercise:[
        {type:'choice', prompt:'哪一个是“狗”？', choices:['dog','cat'], answer:0},
        {type:'fill',   prompt:'补全：I ____ cats.', answer:'like'}
      ],
      gameVocab:[{word:'cat',zh:'猫'},{word:'dog',zh:'狗'},{word:'fox',zh:'狐狸'},{word:'whale',zh:'鲸'}]
    };
    G1[2]={
      id:'K-G1-3', titleZh:'学校与文具', titleEn:'School & Stationery',
      content:[
        {type:'phrase', en:'This is my new bag.', zh:'这是我的新书包。'},
        {type:'dialogue',lines:[
          {speaker:'You',   en:'Can I use your pen?', zh:'我可以用你的笔吗？'},
          {speaker:'Buddy', en:'Sure, here you are!',   zh:'当然，给你！'}
        ]},
        {type:'tip', zh:'常见文具：pen 笔、book 书、bag 书包、desk 课桌。'}
      ],
      exercise:[
        {type:'choice', prompt:'哪一个是“书包”？', choices:['bag','desk'], answer:0},
        {type:'fill',   prompt:'补全：This is my ____.', answer:'book'}
      ],
      gameVocab:[{word:'pen',zh:'笔'},{word:'book',zh:'书'},{word:'bag',zh:'书包'},{word:'desk',zh:'课桌'}]
    };
  }
})();
}
/* —— 学习伙伴 —— */
function buddySay(text){
  const box=el('buddy'); if(!box) return;
  el('buddyText').textContent=text;
  box.classList.remove('hidden');
  setTimeout(()=>box.classList.add('hidden'),5000);
}
el('buddyClose')?.addEventListener('click',()=>el('buddy').classList.add('hidden'));

/* —— 首页 —— */
function renderHome(){
  const items=Object.values(state.progress||{});
  const done = items.filter(x=>x && x.done).length;
  const all  = items.length||1;
  setWidth('overall', Math.round(done/all*100)+'%');

  // streak & badges
  setText('streak', String(state.streak||0));
  renderBadges();

  const html=(state.activity||[]).slice().reverse().slice(0,8)
    .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')
    || '<li class="small">还没有学习记录</li>';
  setHTML('activity', html);
}

/* —— 课程目录 —— */
function renderCourses(){
  const wrap=el('ladder'); if(!wrap) return; wrap.innerHTML='';
  const tabs=$$('.tab');
  tabs.forEach(b=>b.classList.toggle('active',b.dataset.track===state.track));
  tabs.forEach(b=>b.onclick=()=>{ state.track=b.dataset.track; renderCourses(); });

  const lvls=state.track==='adult'? adultLevels : kidsLevels;
  lvls.forEach(level=>{
    const arr=(state.track==='adult'?lessons.adult[level]:lessons.kids[level])||[];
    const done=arr.filter(ls=>state.progress[ls.id]?.done).length;
    const pct=Math.round(done/arr.length*100);
    const d=document.createElement('div'); d.className='card';
    d.innerHTML=`
      <div class="row"><h3 style="margin:0">${level}</h3><span class="small">${done}/${arr.length} 完成</span></div>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <div class="grid cols-2" style="margin-top:8px">
        ${arr.slice(0,6).map(ls=>`<button class="btn secondary" data-id="${ls.id}">📖 ${ls.titleZh}</button>`).join('')}
        ${arr.length>6?`<div class="small">…… 共 ${arr.length} 课</div>`:''}
      </div>`;
    wrap.appendChild(d);
  });
  wrap.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>openLesson(b.dataset.id));
}

/* —— 单课 —— */
function openLesson(id){
  const all = state.track==='adult' ? Object.values(lessons.adult).flat()
                                    : Object.values(lessons.kids).flat();
  const ls  = all.find(x=>x.id===id); if(!ls) return; state.current=ls;
  setText('lessonTitle','📖 '+ls.titleZh);

  const box=el('lessonContent'); box.innerHTML=''; const speakAll=[];
  ls.content.forEach(block=>{
    const d=document.createElement('div'); d.className='card';
    if(block.type==='phrase'){
      d.innerHTML=`<div class="row">
        <strong>${block.en}</strong>
        <button class="btn secondary" data-say="${encodeURIComponent(block.en)}" style="padding:6px 8px">🎧</button>
      </div><div class="small">🇨🇳 ${block.zh}</div>`;
      speakAll.push(block.en);
    }else if(block.type==='dialogue'){
      d.innerHTML=block.lines.map(line=>`
        <div class="row"><span class="tag">${line.speaker}</span>
        <b>${line.en}</b>
        <button class="btn secondary" data-say="${encodeURIComponent(line.en)}" style="padding:6px 8px">🎧</button></div>
        <div class="small">🇨🇳 ${line.zh}</div>`).join('');
      block.lines.forEach(l=>speakAll.push(l.en));
    }else{
      d.innerHTML='💡 '+block.zh;
    }
    box.appendChild(d);
  });
  box.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>say(decodeURIComponent(b.dataset.say),'en'));
  el('readAll')?.addEventListener('click',()=>{ speakAll.forEach((t,i)=>setTimeout(()=>say(t,'en'),i*1100)); toast('开始朗读'); });

  const ex=el('exercise'); ex.innerHTML='';
  ls.exercise.forEach((e,i)=>{
    const c=document.createElement('div'); c.className='card';
    if(e.type==='fill'){
      c.innerHTML=`<div>${e.prompt}</div><input data-ex="${i}" placeholder="填空答案 like / order / ...">`;
    }else{
      c.innerHTML=`<div>${e.prompt}</div>` + e.choices.map((c2,idx)=>`<label class="row" style="gap:6px"><input type="radio" name="ex${i}" value="${idx}"> ${c2}</label>`).join('');
    }
    ex.appendChild(c);
  });
  el('submitEx')?.addEventListener('click', grade);
  show('lesson');
}
function grade(){
  const ls=state.current; if(!ls) return;
  let score=0,total=ls.exercise.length;
  ls.exercise.forEach((e,i)=>{
    if(e.type==='fill'){
      const v=(document.querySelector(`[data-ex="${i}"]`)?.value||'').trim().toLowerCase();
      if(v===String(e.answer).toLowerCase()) score++;
    }else{
      const ck=document.querySelector(`input[name="ex${i}"]:checked`);
      if(ck && Number(ck.value)===e.answer) score++;
    }
  });
  const pct=Math.round(score/total*100);
  state.progress[ls.id]={score:pct,done:pct>=70};
  state.activity.push({t:Date.now(),msg:`完成《${ls.titleZh}》— ${pct}%`});
  store.set('progress',state.progress); store.set('activity',state.activity.slice(-20));
  toast(`得分：${pct}%`); renderHome();
  if(pct>=90){ buddySay('太棒啦！你完成得非常好！🎉 小星星+1'); addXP(30); }
  else if(pct>=70){ addXP(20); }
  else { buddySay('别担心，错误是通往成功的桥🌈 我们再来一次！'); addXP(10); }
}

/* —— 小游戏（配对 + 拼写） —— */
function learnedVocab(){
  const ids=Object.keys(state.progress).filter(id=>state.progress[id].done);
  const all=state.track==='adult'?Object.values(lessons.adult).flat():Object.values(lessons.kids).flat();
  const sel=all.filter(ls=>ids.includes(ls.id)).flatMap(ls=>ls.gameVocab);
  return sel.length? sel : [{word:'hello',zh:'你好'},{word:'name',zh:'名字'},{word:'rice',zh:'米饭'}];
}
function startGame(){
  clearInterval(state.game.timer);
  state.game={time:60,timer:null,score:0,sel:null,mode:state.game.mode||'match'};
  setText('timer',60); setText('score',0);

  const vocab=learnedVocab();
  const btnM=el('gmMatchBtn'), btnS=el('gmSpellBtn');
  if(btnM && btnS){
    btnM.onclick=()=>{ state.game.mode='match'; btnM.classList.add('active'); btnS.classList.remove('active'); buildMatch(); };
    btnS.onclick=()=>{ state.game.mode='spell'; btnS.classList.add('active'); btnM.classList.remove('active'); buildSpell(); };
    (state.game.mode==='spell'?btnS:btnM).classList.add('active');
    (state.game.mode==='spell'?btnM:btnS).classList.remove('active');
  }

  state.game.timer=setInterval(()=>{
    state.game.time--; setText('timer',state.game.time);
    if(state.game.time<=0){
      clearInterval(state.game.timer);
      toast(`时间到！得分：${state.game.score}`);
      if(state.game.score>=80){ buddySay('太棒！你在游戏里表现出色！🎉'); addXP(25); }
      else { addXP(10); }
    }
  },1000);

  function buildMatch(){
    const pairs=vocab.map(v=>({key:v.word,left:v.word,right:v.zh||v.word}));
    const L=pairs.slice().sort(()=>Math.random()-0.5), R=pairs.slice().sort(()=>Math.random()-0.5);
    el('gameArea').innerHTML=`
      <div class="grid cols-2">
        <div id="left">${L.map(p=>`<div class="word" data-key="${p.key}">🔤 ${p.left}</div>`).join('')}</div>
        <div id="right">${R.map(p=>`<div class="word" data-key="${p.key}">🧠 ${p.right}</div>`).join('')}</div>
      </div>`;
    $$('#left .word').forEach(w=>w.onclick=()=>{ $$('#left .word').forEach(x=>x.classList.remove('sel')); w.classList.add('sel'); state.game.sel=w; say(w.textContent.replace('🔤','').trim(),'en'); });
    $$('#right .word').forEach(t=>t.onclick=()=>{ const selw=state.game.sel; if(!selw){toast('先点左侧单词');return;}
      if(selw.dataset.key===t.dataset.key){ state.game.score+=10; setText('score',state.game.score); selw.classList.remove('sel'); selw.classList.add('ok'); selw.style.pointerEvents='none'; t.classList.add('ok'); }
      else { state.game.score=Math.max(0,state.game.score-5); setText('score',state.game.score); t.classList.add('bad'); setTimeout(()=>t.classList.remove('bad'),280); }
    });
    el('restart').onclick=()=>{ state.game.mode='match'; startGame(); };
    el('speakAll').onclick=()=> $$('#left .word').forEach((w,i)=>setTimeout(()=>say(w.textContent.replace('🔤','').trim(),'en'),i*800));
  }
  function buildSpell(){
    const list=vocab.slice().sort(()=>Math.random()-0.5).slice(0,8);
    let idx=0,right=0;
    el('gameArea').innerHTML=`
      <div class="card">
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn secondary" id="hear">🎧 听</button>
          <input id="spellIn" placeholder="输入你听到的单词…" autocomplete="off"/>
          <button class="btn" id="check">提交</button>
        </div>
        <div class="small" style="margin-top:6px">共 ${list.length} 个词，第 <span id="cur">1</span> 个</div>
      </div>`;
    const hear=()=>say(list[idx].word,'en'); el('hear').onclick=hear; hear();
    const input=el('spellIn');
    const check=()=>{
      const v=(input.value||'').trim().toLowerCase();
      const ans=String(list[idx].word).toLowerCase();
      if(!v) return;
      if(v===ans){ state.game.score+=12; right++; toast('✅ 正确 +12'); }
      else{ state.game.score=Math.max(0,state.game.score-4); toast('❌ 再试 -4'); }
      setText('score',state.game.score); idx++; input.value='';
      if(idx>=list.length){ buddySay(`拼写完成：${right}/${list.length}`); addXP(15); startGame(); }
      else { setText('cur',idx+1); hear(); }
    };
    el('check').onclick=check; input.addEventListener('keydown',e=>{ if(e.key==='Enter') check(); });
    el('restart').onclick=()=>{ state.game.mode='spell'; startGame(); };
    el('speakAll').onclick=()=> list.forEach((w,i)=>setTimeout(()=>say(w.word,'en'),i*700));
  }
  state.game.mode==='spell' ? buildSpell() : buildMatch();
}

/* —— 学习圈（极简本地演示） —— */
function renderCircles(){
  const sel=el('circleSel'); if(!sel) return;
  sel.innerHTML = state.circles.map(c=>`<option value="${c.name}">${c.name}</option>`).join('');
  const board=el('circleBoard'); if(board) board.innerHTML='';
}
function bindCircles(){
  el('createCircle')?.addEventListener('click',()=>{
    const name=el('circleName').value.trim();
    if(!name){toast('先输入圈名');return;}
    if(state.circles.some(c=>c.name===name)){toast('已存在');return;}
    state.circles.push({name,checkins:0}); store.set('circles',state.circles); renderCircles(); toast('已创建');
  });
  el('joinCircle')?.addEventListener('click',()=>toast('加入成功（演示）'));
  el('checkin')?.addEventListener('click',()=>{
    if(!state.circles.length){toast('先创建或选择一个圈');return;}
    state.circles[0].checkins++; store.set('circles',state.circles); renderCircles(); toast('今日打卡+1');
  });
}

/* —— 路由 —— */
function show(id){
  $$("main section").forEach(s=>s.classList.add('hidden'));
  const v=el(id); if(v) v.classList.remove('hidden');
  if(id==='courses') renderCourses();
  if(id==='game')    startGame();
  if(id==='circles') renderCircles();
  if(id==='home')    renderHome();
}
$("[data-goto='home']")?.addEventListener('click',()=>show('home'));
$("[data-goto='courses']")?.addEventListener('click',()=>show('courses'));
$("[data-goto='game']")?.addEventListener('click',()=>show('game'));
$("[data-goto='community']")?.addEventListener('click',()=>show('community'));
$("[data-goto='circles']")?.addEventListener('click',()=>show('circles'));

/* —— 初始化 —— */
function init(){
  const sel=el('trackSel');
  if(sel){ sel.value=state.track; sel.onchange=(e)=>{ state.track=e.target.value; document.body.setAttribute('data-theme',state.track); renderCourses(); }; }
  bindCircles(); renderHome(); show('home');
}
document.addEventListener('DOMContentLoaded', init);

/* === 小工具 & 兜底 === */
// 工具函数区
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function asDays(v) {
  if (typeof v === 'number') return v;
  if (v && typeof v === 'object') {
    if (typeof v.days === 'number') return v.days;
  }
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
function el(id){ return document.getElementById(id); }
function setText(id, v){ const x=el(id); if(x) x.textContent = v; }
function setHTML(id, v){ const x=el(id); if(x) x.innerHTML   = v; }
function setWidth(id,v){ const x=el(id); if(x) x.style.width = v; }
function lower(s){ return typeof s==='string' ? s.toLowerCase() : String(s??'topic').toLowerCase(); }
const store={ get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}, set(k,v){localStorage.setItem(k,JSON.stringify(v))} };
function say(t,lang='en'){ if(!('speechSynthesis'in window))return; const u=new SpeechSynthesisUtterance(t); u.lang=lang==='en'?'en-US':'zh-CN'; u.rate=Number(el('ttsRate')?.value||1); speechSynthesis.cancel(); speechSynthesis.speak(u); }
function toast(msg){ const t=el('toast'); if(!t) return; t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1400); }

/* === 全局状态 === */
const state = {
  track: 'adult',
  progress: store.get('progress',{}),   // {id:{score,done}}
  activity: store.get('activity',[]),
  posts: store.get('posts',[]),
  circles: store.get('circles',[]),
  current: null,
  game:{time:60,timer:null,score:0,sel:null}
};

/* === 数据：120 课自动生成 === */
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
  const m={'餐厅点餐':['menu','order','rice','tea'],'问路交通':['left','right','bus','station'],
           '工作沟通':['team','meeting','email','project'],'数据图表':['data','chart','increase','percent'],
           '颜色':['red','blue','green','yellow'],'动物':['cat','dog','fox','whale'],'学校与文具':['pen','book','bag','desk']};
  return m[t]||['learn','word','speak','phrase'];
}

function makeLesson(id, zh, en, ws){
  zh = zh || '主题'; en = en || zh; ws = Array.isArray(ws)&&ws.length?ws:['learn','word','speak','phrase'];
  return {
    id, titleZh: zh, titleEn: en,
    content:[
      {type:'phrase',  en:`Today's topic: ${en}.`, zh:`本课主题：${zh}。`},
      {type:'dialogue',lines:[
        {speaker:'You',   en:`I want to talk about ${lower(en)}.`, zh:`我想聊聊${zh}。`},
        {speaker:'Buddy', en:`Great! Let's start with examples.`,  zh:`太好了！从例子开始。`}
      ]},
      {type:'tip', zh:`重点：${zh} 的高频表达与常见场景。`, en:`Focus on high-frequency phrases.`}
    ],
    exercise:[
      {type:'fill',   prompt:`补全：I'd ____ a coffee, please.`, answer:'like'},
      {type:'choice', prompt:`哪个和“${zh}”更相关？`, choices:[ws[0]||'hello','苹果'], answer:0}
    ],
    gameVocab: ws.map(w=>({word:w, zh:'本课词', en:'lesson word'}))
  };
}

const lessons={adult:{},kids:{}};
(function build(){
  adultLevels.forEach(lv=>lessons.adult[lv]=[]);
  adultTopics.forEach((t,i)=>{
    const topicZh=t||`主题 ${i+1}`;
    const lv=adultLevels[Math.floor(i/10)];
    const id=`A-${lv}-${(i%10)+1}`;
    lessons.adult[lv].push(makeLesson(id,topicZh,`Topic ${i+1}`,wordsOf(topicZh)));
  });
  const dist=[7,7,7,7,7,7,6,6,6]; let k=0;
  kidsLevels.forEach((lv,i)=>{
    lessons.kids[lv]=[];
    for(let j=0;j<dist[i];j++){
      const t=kidTopics[k++]||`少儿主题 ${k}`;
      const id=`K-${lv}-${j+1}`;
      lessons.kids[lv].push(makeLesson(id,t,t,wordsOf(t)));
    }
  });
})();

/* === 学习伙伴 === */
function buddySay(text){
  const box=el('buddy'); if(!box) return;
  el('buddyText').textContent=text; box.classList.remove('hidden');
  setTimeout(()=>box.classList.add('hidden'),5000);
}
const buddyClose=el('buddyClose'); if(buddyClose) buddyClose.onclick=()=>el('buddy').classList.add('hidden');

/* === 首页 === */
function renderHome(){
  const items=Object.values(state.progress||{}), done=items.filter(x=>x&&x.done).length, all=items.length||1;
  setWidth('overall', Math.round(done/all*100)+'%');
  // streak / badges 可按需计算；这里先静态展示
  setText('streak', String(store.get('streak',0)));
  setText('badges','—');

  const html=(state.activity||[]).slice().reverse().slice(0,8)
    .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')
    || '<li class="small">还没有学习记录</li>';
  setHTML('activity', html);
}

/* === 课程目录 === */
function renderCourses(){
  const wrap=el('ladder'); if(!wrap) return; wrap.innerHTML='';
  const tabs=$$('.tab'); tabs.forEach(b=>b.classList.toggle('active',b.dataset.track===state.track));
  tabs.forEach(b=>b.onclick=()=>{state.track=b.dataset.track; renderCourses();});

  const lvls=state.track==='adult'?adultLevels:kidsLevels;
  lvls.forEach(level=>{
    const arr=(state.track==='adult'?lessons.adult[level]:lessons.kids[level])||[];
    const done=arr.filter(ls=>state.progress[ls.id]?.done).length;
    const pct=Math.round(done/arr.length*100);
    const div=document.createElement('div'); div.className='card';
    div.innerHTML=`
      <div class="row"><h3 style="margin:0">${level}</h3><span class="small">${done}/${arr.length} 完成</span></div>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <div class="grid cols-2" style="margin-top:8px">
        ${arr.slice(0,6).map(ls=>`<button class="btn secondary" data-id="${ls.id}">📖 ${ls.titleZh}</button>`).join('')}
        ${arr.length>6?`<div class="small">…… 共 ${arr.length} 课</div>`:''}
      </div>`;
    wrap.appendChild(div);
  });
  wrap.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>openLesson(b.dataset.id));
}

/* === 单课 === */
function openLesson(id){
  const all=state.track==='adult'?Object.values(lessons.adult).flat():Object.values(lessons.kids).flat();
  const ls=all.find(x=>x.id===id); if(!ls) return; state.current=ls;
  setText('lessonTitle','📖 '+ls.titleZh);

  const box=el('lessonContent'); box.innerHTML=''; const speakAll=[];
  ls.content.forEach(block=>{
    const d=document.createElement('div'); d.className='card';
    if(block.type==='phrase'){
      d.innerHTML=`<div class="row"><strong>${block.en}</strong>
      <button class="btn secondary" data-say="${encodeURIComponent(block.en)}" style="padding:6px 8px">🎧</button></div>
      <div class="small">🇨🇳 ${block.zh}</div>`; speakAll.push(block.en);
    }else if(block.type==='dialogue'){
      d.innerHTML=block.lines.map(line=>`
        <div class="row"><span class="tag">${line.speaker}</span>
        <b>${line.en}</b>
        <button class="btn secondary" data-say="${encodeURIComponent(line.en)}" style="padding:6px 8px">🎧</button></div>
        <div class="small">🇨🇳 ${line.zh}</div>`).join(''); block.lines.forEach(l=>speakAll.push(l.en));
    }else{ d.innerHTML='💡 '+block.zh; }
    box.appendChild(d);
  });
  box.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>say(decodeURIComponent(b.dataset.say),'en'));
  const readAll=el('readAll'); if(readAll) readAll.onclick=()=>{ speakAll.forEach((t,i)=>setTimeout(()=>say(t,'en'),i*1100)); toast('开始朗读'); };

  const ex=el('exercise'); ex.innerHTML='';
  ls.exercise.forEach((e,i)=>{
    const c=document.createElement('div'); c.className='card';
    if(e.type==='fill'){
      c.innerHTML=`<div>${e.prompt}</div><input data-ex="${i}" placeholder="填空答案 like / order / ...">`;
    }else{
      c.innerHTML=`<div>${e.prompt}</div>`+e.choices.map((c2,idx)=>`<label class="row" style="gap:6px"><input type="radio" name="ex${i}" value="${idx}"> ${c2}</label>`).join('');
    }
    ex.appendChild(c);
  });

  const submit=el('submitEx'); if(submit) submit.onclick=grade;
  show('lesson');
}

function grade(){
  const ls=state.current; if(!ls) return; let score=0,total=ls.exercise.length;
  ls.exercise.forEach((e,i)=>{
    if(e.type==='fill'){ const v=(el(`[data-ex="${i}"]`)?.value||'').trim().toLowerCase(); if(v===String(e.answer).toLowerCase()) score++; }
    else { const ck=document.querySelector(`input[name="ex${i}"]:checked`); if(ck && Number(ck.value)===e.answer) score++; }
  });
  const pct=Math.round(score/total*100);
  state.progress[ls.id]={score:pct,done:pct>=70};
  state.activity.push({t:Date.now(),msg:`完成《${ls.titleZh}》— ${pct}%`});
  store.set('progress',state.progress); store.set('activity',state.activity.slice(-20));
  toast(`得分：${pct}%`); renderHome();
  if(pct>=90) buddySay('太棒啦！你完成得非常好！🎉 小星星+1'); else if(pct<60) buddySay('别担心，错误是通往成功的桥🌈 我们再来一次！');
}

/* === 小游戏 === */
function learnedVocab(){
  const ids=Object.keys(state.progress).filter(id=>state.progress[id].done);
  const all=state.track==='adult'?Object.values(lessons.adult).flat():Object.values(lessons.kids).flat();
  const sel=all.filter(ls=>ids.includes(ls.id)).flatMap(ls=>ls.gameVocab);
  return sel.length?sel:[{word:'hello',zh:'你好'},{word:'name',zh:'名字'},{word:'rice',zh:'米饭'}];
}

function startGame(){
  clearInterval(state.game.timer);
  state.game={time:60,timer:null,score:0,sel:null};
  setText('timer',60); setText('score',0);
  const vocab=learnedVocab();
  let pairs=vocab.map(v=>({key:v.word,left:v.word,right:v.zh||v.word}));
  const L=pairs.slice().sort(()=>Math.random()-0.5), R=pairs.slice().sort(()=>Math.random()-0.5);
  el('gameArea').innerHTML=`
    <div class="grid cols-2">
      <div id="left">${L.map(p=>`<div class="word" data-key="${p.key}">🔤 ${p.left}</div>`).join('')}</div>
      <div id="right">${R.map(p=>`<div class="word" data-key="${p.key}">🧠 ${p.right}</div>`).join('')}</div>
    </div>`;
  $$('#left .word').forEach(w=>w.onclick=()=>{ $$('#left .word').forEach(x=>x.classList.remove('sel')); w.classList.add('sel'); state.game.sel=w; say(w.textContent.replace('🔤','').trim(),'en'); });
  $$('#right .word').forEach(t=>t.onclick=()=>{ const sel=state.game.sel; if(!sel){toast('先点左侧单词');return;}
    if(sel.dataset.key===t.dataset.key){ state.game.score+=10; setText('score',state.game.score); sel.classList.remove('sel'); sel.classList.add('ok'); sel.style.pointerEvents='none'; t.classList.add('ok'); }
    else { state.game.score=Math.max(0,state.game.score-5); setText('score',state.game.score); t.classList.add('bad'); setTimeout(()=>t.classList.remove('bad'),280); }
  });
  const restart=el('restart'); if(restart) restart.onclick=startGame;
  const speakAll=el('speakAll'); if(speakAll) speakAll.onclick=()=>$$('#left .word').forEach((w,i)=>setTimeout(()=>say(w.textContent.replace('🔤','').trim(),'en'),i*800));
  state.game.timer=setInterval(()=>{ state.game.time--; setText('timer',state.game.time); if(state.game.time<=0){ clearInterval(state.game.timer); toast(`时间到！得分：${state.game.score}`); if(state.game.score>=80) buddySay('太棒！你在游戏里表现出色！🎉'); }},1000);
}

/* === 学习圈（本地演示极简） === */
function renderCircles(){
  const sel=el('circleSel'); if(!sel) return;
  sel.innerHTML = state.circles.map(c=>`<option value="${c.name}">${c.name}</option>`).join('');
  const board=el('circleBoard'); if(board) board.innerHTML='';
}
function bindCircles(){
  const cBtn=el('createCircle'); if(cBtn) cBtn.onclick=()=>{ const name=el('circleName').value.trim(); if(!name){toast('先输入圈名');return;} if(state.circles.some(c=>c.name===name)){toast('已存在');return;} state.circles.push({name,checkins:0}); store.set('circles',state.circles); renderCircles(); toast('已创建'); };
  const jBtn=el('joinCircle'); if(jBtn) jBtn.onclick=()=>toast('加入成功（演示）');
  const check=el('checkin'); if(check) check.onclick=()=>{ if(!state.circles.length){toast('先创建或选择一个圈');return;} state.circles[0].checkins++; store.set('circles',state.circles); renderCircles(); toast('今日打卡+1'); };
}

/* === 路由 === */
function show(id){ $$("main section").forEach(s=>s.classList.add('hidden')); const v=el(id); if(v) v.classList.remove('hidden');
  if(id==='courses') renderCourses(); if(id==='game') startGame(); if(id==='circles') renderCircles(); if(id==='home') renderHome(); }
$("[data-goto='home']")?.addEventListener('click',()=>show('home'));
$("[data-goto='courses']")?.addEventListener('click',()=>show('courses'));
$("[data-goto='game']")?.addEventListener('click',()=>show('game'));
$("[data-goto='community']")?.addEventListener('click',()=>show('community'));
$("[data-goto='circles']")?.addEventListener('click',()=>show('circles'));

/* === 初始化 === */
function init(){
  // 轨道切换
  const sel=el('trackSel'); if(sel){ sel.value=state.track; sel.onchange=(e)=>{ state.track=e.target.value; document.body.setAttribute('data-theme',state.track); renderCourses(); }; }
  bindCircles(); renderHome(); show('home');
}
document.addEventListener('DOMContentLoaded', init);

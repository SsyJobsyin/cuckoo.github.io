'use strict';
// —— 小工具：安全拿元素 / 设置文本 / 设置宽度 / 安全转小写
const $ = s => document.querySelector(s);
function el(id){ return document.getElementById(id); }
function setText(id, text){ const x = el(id); if (x) x.function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = text; }
function setHTML(id, html){ const x = el(id); if (x) x.innerHTML = html; }
function setWidth(id, pct){ const x = el(id); if (x) xfunction renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = pct; }
function lower(s){
  return typeof s === 'string' ? s.toLowerCase()
       : String(s ?? 'topic').toLowerCase();
}

function lower(s){
  return typeof s === 'string' ? s.toLowerCase()
       : String(s ?? 'topic').toLowerCase();
}/* ===== 工具 ===== */
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};
function toast(m){const t=$("#toast");t.function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400)}
function speak(text){ if(!('speechSynthesis'in window))return; const u=new SpeechSynthesisUtterance(text); u.lang='en-US'; u.rate=Number($("#ttsRate")?.value||1); speechSynthesis.cancel(); speechSynthesis.speak(u); }

/* ===== 全局状态 ===== */
const state={
  track: localStorage.getItem('track')||'adult', // adult / kids
  progress: store.get('progress',{}), // {id:{done,score}}
  activity: store.get('activity',[]),
  points: Number(localStorage.getItem('points')||0),
  streak: store.get('streak',{lastDay:null,count:0}),
  currentLesson:null,
  game:{time:60,timer:null,score:0,selectedLeft:null},
  posts: store.get('posts',[])
};

/* ===== 鼓励系统 ===== */
const buddyMsg={
  celebrate:[
    {zh:"太棒啦！你完成了一课 🎉",story:"小狐第一次闯关成功，得到一颗发光的小星星。"},
    {zh:"超棒！连续学习 +1 🔥",story:"小狐把叶子贴在树屋，每坚持一天就多一片叶子。"}
  ],
  encourage:[
    {zh:"别担心，错误是通往成功的桥 🌈",story:"小狐曾错了五次，后来念给朋友听就记住啦。"},
    {zh:"慢一点也没关系，我们一起走 🧸",story:"一步一步，也能登上山顶。"}
  ]
};
function cheer(type){ const pool=buddyMsg[type]||buddyMsg.encourage; const p=pool[Math.floor(Math.random()*pool.length)];
  $("#buddyText").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = p.zh + "\n" + p.story; $("#buddy").classList.remove('hidden'); setTimeout(()=>$("#buddy").classList.add('hidden'),6000);
}
$("#buddyClose").onclick=()=>$("#buddy").classList.add('hidden');

/* ===== 课程数据（120） ===== */
const adultLevels=['A0 入门','A1 生存','A2 进阶','B1 门槛','B2 优势','C1 高级'];
const kidsLevels =['G1','G2','G3','G4','G5','G6','G7','G8','G9'];
const adultTopics=[
 '打招呼与自我介绍','点餐表达','问路与交通','旅馆办理','工作沟通','邮件与会议','兴趣爱好','日常作息','健康与药店','银行与取款',
 '网购与快递','手机与应用','租房看房','城市与景点','职业发展','项目汇报','客户沟通','跨文化交流','投诉与解决','采访与提问',
 '环保与节能','新闻与观点','学习方法','志愿与公益','数据与图表','谈判与妥协','演讲与叙事','产品对比','市场与品牌','风险与应对',
 '团队协作','远程办公','批判性思维','时间管理','抽象概念','因果推演','类比与隐喻','学术讨论','策略制定','行业趋势',
 '伦理与选择','领导与激励','跨学科整合','反思与复盘','旅行计划','电影与音乐','运动与健身','节日与传统','购物寒暄','天气与心情',
 '颜色与物品','简单方位','国家与语言','家庭与朋友','课堂表达','数字与时间','自然与季节','情绪表达','求助与建议','目标与计划'
]; // 60
const kidTopics=[
 '颜色','动物','数字与形状','学校与文具','家庭成员','食物与饮料','天气与衣物','身体与健康','交通工具','节日与活动',
 '日常作息','爱好与运动','地点与方向','自然与季节','职业与梦想','故事与童话','安全与礼貌','环保与地球','科技与机器人','旅行与城市',
 '水果蔬菜','房屋房间','宠物护理','海洋世界','森林探险','太空星球','音乐节奏','绘画手工','校内活动','朋友相处',
 '时间日期','公园游玩','露营野炊','迷宫寻宝','拼图工坊','动物救援','小小科学家','植物种植','家务分工','交通规则',
 '垃圾分类','节约用水','节电护家','家乡特色','中国美食','中国地理','传统节日','英语儿歌','绕口令','角色扮演',
 '礼物选择','生日派对','新年计划','暑期旅行','开学第一天','期末复盘','颜色进阶','动物进阶','自然进阶','城市探索'
]; // 60

function wordBank(zh){
  const m={'点餐表达':['menu','order','rice','tea'],'问路与交通':['left','right','bus','station'],
  '工作沟通':['team','meeting','email','boss'],'数据与图表':['data','chart','increase','percent'],
  '颜色':['red','blue','green','yellow'],'动物':['cat','dog','fox','whale'],'学校与文具':['pen','book','bag','desk']};
  return m[zh] || ['learn','word','phrase','speak'];
}
function makeLesson(id, zh, en, ws){
  zh = zh || '主题';
  en = en || zh; // en 缺失时退回中文标题
  ws = Array.isArray(ws) && ws.length ? ws : ['learn','word','speak','phrase'];

  return {
    id,
    titleZh: zh,
    titleEn: en,
    content: [
      { type:'phrase',  en:`Today's topic: ${en}.`, zh:`本课主题：${zh}。` },
      { type:'dialogue', lines:[
        { speaker:'You',   en:`I want to talk about ${lower(en)}.`, zh:`我想聊聊${zh}。` },
        { speaker:'Buddy', en:`Great! Let's start with examples.`,  zh:`太好了！从例子开始。` }
      ]},
      { type:'tip', zh:`重点：${zh} 的高频表达与常见场景。`, en:`Focus on high-frequency phrases.` }
    ],
    exercise: [
      { type:'fill',   prompt:`补全：I'd ____ a coffee, please.`, answer:'like' },
      { type:'choice', prompt:`哪个和“${zh}”更相关？`, choices:[ ws[0] || 'hello', '苹果' ], answer:0 }
    ],
    gameVocab: ws.map(w=>({word:w, zh:'本课词', en:'lesson word'}))
  };
}
  
const lessons={adult:{},kids:{}};
(function build(){
  adultLevels.forEach(lv=>lessons.adult[lv]=[]);
  adultTopics.forEach((t,i)=>{
  const topicZh = t || `主题 ${i+1}`;           // ← 兜底
  const lv = adultLevels[Math.floor(i/10)];
  const id = `A-${lv}-${(i%10)+1}`;
  lessons.adult[lv].push(makeLesson(id, topicZh, `Topic ${i+1}`, wordsOf(topicZh)));
});
  const dist = [7,7,7,7,7,7,6,6,6]; let k=0;
kidsLevels.forEach((lv,i)=>{
  lessons.kids[lv]=[];
  for(let j=0;j<dist[i];j++){
    const t = kidTopics[k++] || `少儿主题 ${k}`; // ← 兜底
    const id = `K-${lv}-${j+1}`;
    lessons.kids[lv].push(makeLesson(id, t, t, wordsOf(t)));
  }
});

/* ===== 主题切换（成人/少儿） ===== */
function applyTheme(){ document.body.classList.toggle('theme-kids', state.track==='kids'); document.body.classList.toggle('theme-adult', state.track==='adult'); }
$("#trackSel").value=state.track; $("#trackSel").onchange=e=>{ state.track=e.target.value; localStorage.setItem('track',state.track); applyTheme(); renderCourses(); };

/* ===== 首页统计/打卡 ===== */
function tickStreak(){
  const today = new Date(); today.setHours(0,0,0,0);
  const last = state.streak.lastDay? new Date(state.streak.lastDay): null;
  if(!last || (today - last) > 24*3600*1000){ // 新的一天
    // 是否连续
    const isConsecutive = last && (today - last === 24*3600*1000);
    state.streak.count = isConsecutive ? (state.streak.count+1) : 1;
    state.streak.lastDay = today.toISOString();
    store.set('streak', state.streak);
    if(state.streak.count===3 || state.streak.count===7 || state.streak.count===14){
      state.points += 20; localStorage.setItem('points', state.points); cheer('celebrate');
      state.activity.push({t:Date.now(),msg:`连续学习 ${state.streak.count} 天，奖励 +20 分`});
    }
  }
}
function renderHome(){
  const all=Object.keys(state.progress).length, passed=Object.values(state.progress).filter(x=>x.done).length;
  $("#overall")function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = (all?Math.round(passed/all*100):0)+'%';
  $("#activity").innerHTML = state.activity.slice().reverse().slice(0,8).map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('') || `<li class="small">还没有学习记录</li>`;
  $("#statPassed").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = passed;
  $("#statPoints").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = state.points;
  $("#statStreak").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = (state.streak.count||0)+'🔥';
}

/* ===== 课程列表 ===== */
function renderCourses(){
  $$(".tab").forEach(t=>t.classList.toggle('active', t.dataset.track===state.track));
  $$(".tab").forEach(t=>t.onclick=()=>{ state.track=t.dataset.track; $("#trackSel").value=state.track; applyTheme(); renderCourses(); });
  const wrap=$("#ladder"); wrap.innerHTML='';
  const map = state.track==='adult'? lessons.adult : lessons.kids;
  Object.keys(map).forEach(level=>{
    const arr=map[level]; const done=arr.filter(ls=>state.progress[ls.id]?.done).length; const pct=arr.length?Math.round(done/arr.length*100):0;
    const div=document.createElement('div'); div.className='item';
    div.innerHTML=`<h3>${level}</h3>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <div class="small" style="margin:6px 0">${done}/${arr.length} 课已完成</div>
      <div class="grid cols-2">${arr.slice(0,6).map(ls=>`<button class="btn secondary" data-id="${ls.id}">📖 ${ls.titleZh}</button>`).join('')}${arr.length>6?`<div class="small">…… 共 ${arr.length} 课</div>`:''}</div>`;
    wrap.appendChild(div);
  });
  wrap.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>openLesson(b.dataset.id));
}

/* ===== 单课 ===== */
function openLesson(id){
  const arr = state.track==='adult'? Object.values(lessons.adult).flat() : Object.values(lessons.kids).flat();
  const ls = arr.find(x=>x.id===id); if(!ls) return; state.currentLesson=ls;
  $("#lessonTitle").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }='📖 '+ls.titleZh;
  const box=$("#lessonContent"); box.innerHTML=''; const speakAll=[];
  ls.content.forEach(block=>{
    const d=document.createElement('div'); d.className='item';
    if(block.type==='phrase'){ d.innerHTML=`<div><strong>${block.en}</strong> <button class="btn secondary" data-say="${encodeURIComponent(block.en)}" style="padding:6px 8px">🎧</button></div><div class="small">🇨🇳 ${block.zh}</div>`; speakAll.push(block.en); }
    else if(block.type==='dialogue'){ d.innerHTML=block.lines.map(line=>`<div style="display:flex;gap:6px;align-items:center"><span class="badge">${line.speaker}</span><span style="font-weight:600">${line.en}</span><button class="btn secondary" data-say="${encodeURIComponent(line.en)}" style="padding:6px 8px">🎧</button></div><blockquote class="small">🇨🇳 ${line.zh}</blockquote>`).join(''); block.lines.forEach(l=>speakAll.push(l.en)); }
    else if(block.type==='tip'){ d.innerHTML=`💡 ${block.zh}`; }
    box.appendChild(d);
  });
  box.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>speak(decodeURIComponent(b.dataset.say)));
  $("#readAll").onclick=()=>{speakAll.forEach((t,i)=>setTimeout(()=>speak(t),i*1100));toast('开始朗读');};

  const ex=$("#exercise"); ex.innerHTML='';
  ls.exercise.forEach((q,i)=>{
    const d=document.createElement('div'); d.className='item';
    if(q.type==='fill'){ d.innerHTML=`<div>${q.promptZh}</div><input data-ex="${i}" placeholder="在此作答…" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:10px">`; }
    else{ d.innerHTML=`<div>${q.promptZh}</div>${(q.choicesZh||['A','B']).map((c,idx)=>`<label class="word" style="display:block"><input type="radio" name="ex${i}" value="${idx}"> ${c}</label>`).join('')}`; }
    ex.appendChild(d);
  });
  $("#submitEx").onclick=gradeLesson;
  show('lesson');
}
function gradeLesson(){
  const ls=state.currentLesson; let score=0,total=ls.exercise.length;
  ls.exercise.forEach((q,i)=>{
    if(q.type==='fill'){ const v=(($(`[data-ex="${i}"]`)||{}).value||'').trim().toLowerCase(); if(v===String(q.answer).toLowerCase())score++; }
    else{ const ck=document.querySelector(`input[name="ex${i}"]:checked`); if(ck&&Number(ck.value)===q.answer)score++; }
  });
  const pct=Math.round(score/total*100);
  state.progress[ls.id]={done:pct>=70,score:pct};
  state.points += pct>=90? 15 : (pct>=70? 8 : 2);
  localStorage.setItem('points',state.points);
  state.activity.push({t:Date.now(),msg:`完成《${ls.titleZh}》— ${pct}%，积分 +${pct>=90?15:(pct>=70?8:2)}`});
  store.set('progress',state.progress); store.set('activity',state.activity.slice(-30));
  renderHome();
  toast(`得分：${pct}%`);
  if(pct>=90)cheer('celebrate'); else if(pct<60)cheer('encourage');
}

/* ===== 游戏（配对） ===== */
function poolVocab(){
  const doneIds=Object.keys(state.progress).filter(id=>state.progress[id].done);
  const all=(state.track==='adult'?Object.values(lessons.adult):Object.values(lessons.kids)).flat();
  const pick=all.filter(ls=>doneIds.includes(ls.id)).flatMap(ls=>ls.gameVocab);
  return pick.length?pick:[{word:'hello',zh:'你好',en:'greeting'},{word:'name',zh:'名字',en:'name'},{word:'rice',zh:'米饭',en:'rice'}];
}
function startGame(){
  clearInterval(state.game.timer); state.game={time:60,timer:null,score:0,selectedLeft:null};
  $("#timer").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }=60; $("#score").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }=0;
  const vocab=poolVocab(); let pairs=vocab.map(v=>({key:v.word,left:v.word,right:v.zh||v.en}));
  const L=pairs.slice().sort(()=>Math.random()-0.5), R=pairs.slice().sort(()=>Math.random()-0.5);
  $("#gameArea").innerHTML=`<div class="grid cols-2"><div id="left">${L.map(p=>`<div class="word" data-key="${p.key}">🔤 ${p.left}</div>`).join('')}</div><div id="right">${R.map(p=>`<div class="word" data-key="${p.key}">🧠 ${p.right}</div>`).join('')}</div></div>`;
  $("#restart").onclick=startGame; $("#speakAll").onclick=()=> $$("#left .word").forEach((w,i)=>setTimeout(()=>speak(w.function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }.replace('🔤','').trim()),i*800));
  $$("#left .word").forEach(w=>w.onclick=()=>{ $$("#left .word").forEach(x=>x.classList.remove('sel')); w.classList.add('sel'); state.game.selectedLeft=w; speak(w.function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }.replace('🔤','').trim()); });
  $$("#right .word").forEach(t=>t.onclick=()=>{
    const Lsel=state.game.selectedLeft; if(!Lsel){toast('先点左侧单词');return;}
    if(Lsel.dataset.key===t.dataset.key){
      state.game.score+=10; $("#score").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }=state.game.score; Lsel.classList.remove('sel'); Lsel.classList.add('ok'); Lsel.style.pointerEvents='none'; t.classList.add('ok'); state.game.selectedLeft=null; toast('正确 +10');
    }else{
      state.game.score=Math.max(0,state.game.score-5); $("#score").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }=state.game.score; t.classList.add('bad'); setTimeout(()=>t.classList.remove('bad'),350); toast('再试一次 -5');
    }
  });
  state.game.timer=setInterval(()=>{ state.game.time--; $("#timer").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }=state.game.time; if(state.game.time<=0){ clearInterval(state.game.timer); toast(`时间到！得分：${state.game.score}`); }},1000);
}

/* ===== 社区（本机演示） ===== */
let media,chunks=[];
$("#recBtn").onclick=async ()=>{
  try{
    if(!media){ const s=await navigator.mediaDevices.getUserMedia({audio:true}); media=new MediaRecorder(s); media.ondataavailable=e=>chunks.push(e.data); media.onstop=()=>{ const blob=new Blob(chunks,{type:'audio/webm'}); chunks=[]; const url=URL.createObjectURL(blob); const au=$("#preview"); au.src=url; au.classList.remove('hidden'); au.dataset.blobUrl=url; }; }
    if(media.state==='recording'){ media.stop(); $("#recBtn").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }='🎙️ 录音'; toast('录音已停止'); }
    else{ media.start(); $("#recBtn").function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall')function renderHome(){   const items = Object.values(state.progress || {});   const done  = items.filter(x=>x && x.done).length;   const all   = items.length || 1;    setWidth('overall', Math.round(done/all*100) + '%');   // 原来：document.getElementById('overall').style.width = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... } = ...   // 如果你有连续学习天数、徽章等，也用 setText：   // setText('streak', calcStreak());   // setText('badges', '—');    const html = (state.activity || []).slice().reverse().slice(0,8)                .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('')             || '<li class="small">还没有学习记录</li>';   setHTML('activity', html);                              // 原来：document.getElementById('activity').innerHTML = ... }='⏺ 正在录音…'; toast('开始录音'); }
  }catch{ toast('此设备不支持录音或权限被拒绝'); }
};
$("#postBtn").onclick=()=>{ const text=$("#postText").value.trim(); const audioUrl=$("#preview").dataset.blobUrl||null; if(!text && !audioUrl){toast('写点内容或录一段音频吧');return;}
  state.posts.push({id:Date.now(),text,audioUrl,likes:0,comments:[]});
  store.set('posts',state.posts); $("#postText").value=''; $("#preview").classList.add('hidden'); $("#preview").removeAttribute('data-blob-url'); renderFeed(); toast('已发布（保存在本机浏览器）'); };
function renderFeed(){
  const wrap=$("#feed"); wrap.innerHTML=''; if(!state.posts.length){wrap.innerHTML=`<div class="small">还没有帖子，发一个试试～</div>`;return;}
  state.posts.slice().reverse().forEach(p=>{
    const d=document.createElement('div'); d.className='card';
    d.innerHTML=`<div>${p.text? p.text.replace(/\n/g,'<br/>') : ''}</div>${p.audioUrl? `<audio controls src="${p.audioUrl}"></audio>`:''}
      <div class="cta"><button class="btn secondary" data-like="${p.id}">👍 ${p.likes}</button>
      <button class="btn secondary" data-cmt="${p.id}">💬 评论</button><button class="btn secondary" data-share="${p.id}">🔗 转发</button></div>
      <div class="small" id="c_${p.id}">${(p.comments||[]).map(c=>`<div>🗨️ ${c}</div>`).join('')}</div>`;
    wrap.appendChild(d);
  });
  wrap.querySelectorAll('[data-like]').forEach(b=>b.onclick=()=>{ const id=Number(b.dataset.like); const p=state.posts.find(x=>x.id===id); p.likes++; store.set('posts',state.posts); renderFeed(); });
  wrap.querySelectorAll('[data-cmt]').forEach(b=>b.onclick=()=>{ const id=Number(b.dataset.cmt); const t=prompt('输入你的评论'); if(!t)return; const p=state.posts.find(x=>x.id===id); p.comments.push(t); store.set('posts',state.posts); renderFeed(); });
  wrap.querySelectorAll('[data-share]').forEach(b=>b.onclick=()=>{ navigator.clipboard?.writeText(location.href+'#post-'+b.dataset.share); toast('已复制链接（演示）'); });
}

/* ===== 导出进度 ===== */
$("#export").onclick=(e)=>{e.preventDefault(); const data={track:state.track,progress:state.progress,activity:state.activity,points:state.points,streak:state.streak,posts:state.posts}; const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='ladder_progress.json'; a.click(); URL.revokeObjectURL(url);};

/* ===== 路由 ===== */
function show(id){ $$("main section").forEach(s=>s.classList.add('hidden')); $("#"+id).classList.remove('hidden'); if(id==='courses')renderCourses(); if(id==='game')startGame(); if(id==='community')renderFeed(); }
$$("[data-goto='home']").forEach(b=>b.onclick=()=>show('home'));
$$("[data-goto='courses']").forEach(b=>b.onclick=()=>show('courses'));
$$("[data-goto='game']").forEach(b=>b.onclick=()=>show('game'));
$$("[data-goto='community']").forEach(b=>b.onclick=()=>show('community'));

/* ===== 初始化 ===== */
function init(){ applyTheme(); tickStreak(); renderHome(); renderCourses(); renderFeed(); show('home'); }
document.addEventListener('DOMContentLoaded', () => {
  init();
});

'use strict';

/* ====== 工具 ====== */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const store = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def } catch{ return def } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1400); }
function speak(text, lang='en'){
  if(!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  const rate = Number($("#ttsRate")?.value||1);
  u.lang = lang==='en' ? 'en-US' : 'zh-CN';
  u.rate = rate; speechSynthesis.cancel(); speechSynthesis.speak(u);
}

/* ====== 全局状态 ====== */
const state = {
  lang: localStorage.getItem('ui_lang') || 'zh',
  track: 'adult', // 默认成人
  progress: store.get('progress', {}), // { lessonId: {done:true, score:90} }
  activity: store.get('activity', []), // 最近记录
  currentLesson: null,
  game: { time: 60, timer: null, score: 0, selectedLeft: null },
  posts: store.get('posts', []) // 本地“社区”
};

/* ====== 学习伙伴 ====== */
const buddy = {
  celebrate: [
    {zh:"太棒啦！你完成了阶段目标🎉", en:"Awesome! You hit a milestone! 🎉",
      storyZh:"小狐第一次闯关成功时，得到了一颗发光小星星。", storyEn:"Fox got a glowing star on its first win."},
    {zh:"进步飞快！又学会一个单词⭐", en:"Zooming ahead! Another word! ⭐",
      storyZh:"每记住一个词，小狐树屋上就多一片叶子。", storyEn:"Each word adds a leaf to Fox’s treehouse."}
  ],
  encourage: [
    {zh:"别担心，错误是通往成功的桥🌈", en:"Mistakes are bridges to success 🌈",
      storyZh:"小狐曾错了五次，后来念给朋友听就记住啦。", storyEn:"Fox got it right after saying it to a friend."},
    {zh:"慢一点也没关系，我们一起走🧸", en:"It’s okay to go slow; we’ll walk together 🧸",
      storyZh:"旅行时，小狐一步步走，也到达了山顶。", storyEn:"Step by step, Fox reached the peak."}
  ]
};
function cheer(type){
  const pool = buddy[type] || buddy.encourage;
  const pick = pool[Math.floor(Math.random()*pool.length)];
  const lang = state.lang === 'zh' ? 'zh' : 'en';
  const msg = pick[lang] + "\n" + (lang==='zh'?pick.storyZh:pick.storyEn);
  $("#buddyText").textContent = msg;
  $("#buddy").classList.remove('hidden');
  setTimeout(()=>$("#buddy").classList.add('hidden'), 6000);
}
$("#buddyClose").onclick = ()=>$("#buddy").classList.add('hidden');

/* ====== 课程数据（生成 120 课） ====== */
const adultLevels = ['A0 入门','A1 生存','A2 进阶','B1 门槛','B2 优势','C1 高级'];
const kidsLevels  = ['G1','G2','G3','G4','G5','G6','G7','G8','G9'];
const adultTopics = ['打招呼','自我介绍','餐厅点餐','问路交通','旅馆办理','工作沟通','邮件会议','兴趣爱好',
  '日常作息','健康药店','银行取款','网购快递','手机应用','租房看房','城市景点','职业发展',
  '项目汇报','客户沟通','跨文化交流','投诉与解决','采访提问','环保节能','新闻观点','学习方法',
  '志愿公益','数据图表','谈判与妥协','演讲叙事','产品对比','市场品牌','风险应对','团队协作',
  '远程办公','批判思维','时间管理','抽象概念','因果推演','隐喻类比','学术讨论','策略制定',
  '行业趋势','伦理选择','领导激励','跨学科整合','反思复盘','旅行计划','电影音乐','运动健身',
  '节日传统','购物寒暄','天气心情','颜色物品','简单方位','国家语言','家庭朋友','课堂表达',
  '数字时间','自然与季节']; // 共60
const kidTopics = ['颜色','动物','数字与形状','学校与文具','家庭成员','食物饮料','天气衣物','身体健康',
  '交通工具','节日活动','日常作息','爱好运动','地点方向','自然季节','职业梦想','故事童话',
  '安全礼貌','环保地球','科技机器人','旅行城市','水果蔬菜','房屋房间','宠物护理','海洋世界',
  '森林探险','太空星球','音乐节奏','绘画手工','校内活动','朋友相处','情绪表达','时间日期',
  '公园游玩','露营野炊','迷宫寻宝','拼图工坊','动物救援','小小科学家','植物种植','家务分工',
  '交通规则','垃圾分类','节约用水','节电护家','家乡特色','中国美食','中国地理','传统节日',
  '英语儿歌','绕口令','童话改编','角色扮演','礼物选择','生日派对','新年计划','暑期旅行',
  '开学第一天','期末复盘']; // 共60

function makeLesson(id, titleZh, titleEn, words){
  return {
    id, titleZh, titleEn,
    content: [
      {type:'phrase', en:`Today's topic: ${titleEn}.`, zh:`本课主题：${titleZh}。`},
      {type:'dialogue', lines:[
        {speaker:'You', en:`I want to talk about ${titleEn.toLowerCase()}.`, zh:`我想聊聊${titleZh}。`},
        {speaker:'Buddy', en:`Great! Let's start with some examples.`, zh:`太好了！我们从例子开始。`}
      ]},
      {type:'tip', zh:`重点：${titleZh} 的高频表达与场景。`, en:`Focus on high-frequency phrases for ${titleEn}.`}
    ],
    exercise: [
      {type:'fill',  promptZh:`补全：I'd ____ a coffee, please.`, promptEn:`Fill: I'd ____ a coffee, please.`, answer:'like'},
      {type:'choice',promptZh:`哪个和“${titleZh}”更相关？`,promptEn:`Which is related to ${titleEn}?`,
        choicesZh:[(words[0]||'hello'),'苹果'], choicesEn:[(words[0]||'hello'),'apple'], answer:0}
    ],
    gameVocab: (words.length?words:['hello','team','order','phone']).map(w=>({word:w, zh:'本课词', en:'lesson word'}))
  };
}
function wordBank(topicZh){
  const banks = {
    '餐厅点餐':['menu','order','rice','tea'],
    '问路交通':['left','right','bus','station'],
    '工作沟通':['team','meeting','email','boss'],
    '数据图表':['data','chart','increase','percent'],
    '颜色':['red','blue','green','yellow'],
    '动物':['cat','dog','fox','whale'],
    '学校与文具':['pen','book','bag','desk']
  };
  return banks[topicZh] || ['learn','word','phrase','speak'];
}

const lessons = { adult:{}, kids:{} };
(function buildAll(){
  // 成人：6级均分60课
  adultLevels.forEach((level, i)=>{
    lessons.adult[level] = [];
  });
  adultTopics.forEach((t, i)=>{
    const level = adultLevels[Math.floor(i / 10)]; // 每级10课
    const id = `a-${level.replace(/\s/g,'')}-${(i%10)+1}`;
    const en = 'Topic ' + (i+1);
    lessons.adult[level].push(makeLesson(id, t, en, wordBank(t)));
  });

  // 少儿：9级均分60课（前6级7课，后3级6课≈60）
  const dist = [7,7,7,7,7,7,6,6,6];
  let idx=0;
  kidsLevels.forEach((lv, i)=>{
    lessons.kids[lv] = [];
    for(let j=0;j<dist[i];j++){
      const t = kidTopics[idx++]; const id = `k-${lv}-${j+1}`;
      lessons.kids[lv].push(makeLesson(id, t, t, wordBank(t)));
    }
  });
})();

/* ====== 导航/路由 ====== */
function show(id){
  $$("main section, main > section, .container>section").forEach(s=>s.classList.add('hidden'));
  $("#"+id).classList.remove('hidden');
  if(id==='courses') renderCourses();
  if(id==='game') startGame();
}
$$(".nav [data-goto], [data-goto]").forEach(b=>b.onclick=()=>show(b.dataset.goto));
$("#lang").onchange = (e)=>{ state.lang = e.target.value; localStorage.setItem('ui_lang', state.lang); toast(state.lang==='zh'?'已切换为中文':'Switched to English'); };

/* ====== 首页 ====== */
function renderHome(){
  const all = Object.keys(state.progress).length;
  const passed = Object.values(state.progress).filter(x=>x.done).length;
  const pct = all ? Math.round(passed/all*100) : 0;
  $("#overall").style.width = pct + "%";
  $("#activity").innerHTML = state.activity.slice().reverse().slice(0,8)
    .map(a=>`<li>${new Date(a.t).toLocaleString()} — ${a.msg}</li>`).join('') || `<li class="small">还没有学习记录</li>`;
}

/* ====== 课程列表 ====== */
function renderCourses(){
  const track = state.track;
  $$(".tab").forEach(t=>t.classList.toggle('active', t.dataset.track===track));
  $$(".tab").forEach(t=>t.onclick=()=>{ state.track=t.dataset.track; renderCourses(); });

  const wrap = $("#ladder"); wrap.innerHTML='';
  const levels = track==='adult'? adultLevels : kidsLevels;
  levels.forEach(level=>{
    const arr = (track==='adult'? lessons.adult[level] : lessons.kids[level]) || [];
    const done = arr.filter(ls=>state.progress[ls.id]?.done).length;
    const pct = arr.length? Math.round(done/arr.length*100) : 0;
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `
      <h3>${level}</h3>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <div class="small" style="margin:6px 0">${done}/${arr.length} 课已完成</div>
      <div class="grid cols-2">
        ${arr.slice(0,6).map(ls=>`<button class="btn secondary" data-id="${ls.id}">📖 ${ls.titleZh}</button>`).join('')}
        ${arr.length>6?`<div class="small">…… 共 ${arr.length} 课</div>`:''}
      </div>`;
    wrap.appendChild(div);
  });
  wrap.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>openLesson(b.dataset.id));
}

/* ====== 打开单课 ====== */
function openLesson(id){
  const arr = state.track==='adult' ? Object.values(lessons.adult).flat()
                                    : Object.values(lessons.kids).flat();
  const ls = arr.find(l=>l.id===id); if(!ls) return;
  state.currentLesson = ls;
  $("#lessonTitle").textContent = "📖 " + ls.titleZh;

  // 内容
  const box = $("#lessonContent"); box.innerHTML='';
  const speakAll = [];
  ls.content.forEach(block=>{
    const d = document.createElement('div'); d.className='item';
    if(block.type==='phrase'){
      d.innerHTML = `<div><strong>${block.en}</strong>
        <button class="btn secondary" data-say="${encodeURIComponent(block.en)}" style="padding:6px 8px">🎧</button></div>
        <div class="small">🇨🇳 ${block.zh}</div>`;
      speakAll.push(block.en);
    }else if(block.type==='dialogue'){
      d.innerHTML = block.lines.map(line=>`
        <div style="display:flex;gap:6px;align-items:center">
          <span class="badge">${line.speaker}</span>
          <span style="font-weight:600">${line.en}</span>
          <button class="btn secondary" data-say="${encodeURIComponent(line.en)}" style="padding:6px 8px">🎧</button>
        </div>
        <blockquote class="small">🇨🇳 ${line.zh}</blockquote>`).join('');
      block.lines.forEach(l=>speakAll.push(l.en));
    }else if(block.type==='tip'){
      d.innerHTML = `💡 ${block.zh}`;
    }
    box.appendChild(d);
  });
  box.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>speak(decodeURIComponent(b.dataset.say),'en'));
  $("#readAll").onclick = ()=>{ speakAll.forEach((t,i)=>setTimeout(()=>speak(t,'en'), i*1200)); toast('开始朗读'); };

  // 练习
  const exBox = $("#exercise"); exBox.innerHTML='';
  ls.exercise.forEach((ex,i)=>{
    const d = document.createElement('div'); d.className='item';
    if(ex.type==='fill'){
      d.innerHTML = `<div>${ex.promptZh}</div><input data-ex="${i}" placeholder="在此作答…" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:10px">`;
    }else{
      d.innerHTML = `<div>${ex.promptZh}</div>` +
        (ex.choicesZh || ['A','B','C']).map((c,idx)=>`<label class="word" style="display:block"><input type="radio" name="ex${i}" value="${idx}"> ${c}</label>`).join('');
    }
    exBox.appendChild(d);
  });
  $("#submitEx").onclick = gradeLesson;

  show('lesson');
}

/* ====== 批改 ====== */
function gradeLesson(){
  const ls = state.currentLesson; let score=0, total=ls.exercise.length;
  ls.exercise.forEach((ex,i)=>{
    if(ex.type==='fill'){
      const v = (($(`[data-ex="${i}"]`)||{}).value||'').trim().toLowerCase();
      if(v === String(ex.answer).toLowerCase()) score++;
    }else{
      const ck = document.querySelector(`input[name="ex${i}"]:checked`);
      if(ck && Number(ck.value)===ex.answer) score++;
    }
  });
  const pct = Math.round(score/total*100);
  state.progress[ls.id] = {done: pct>=70, score:pct};
  state.activity.push({t:Date.now(), msg:`完成《${ls.titleZh}》— ${pct}%`});
  store.set('progress', state.progress);
  store.set('activity', state.activity.slice(-20));
  renderHome();
  toast(`得分：${pct}%`);
  if(pct>=90) cheer('celebrate'); else if(pct<60) cheer('encourage');
}

/* ====== 游戏（配对） ====== */
function poolVocab(){
  // 优先用已完成课程的词；没有时用默认
  const doneIds = Object.keys(state.progress).filter(id=>state.progress[id].done);
  const all = (state.track==='adult'? Object.values(lessons.adult) : Object.values(lessons.kids)).flat();
  const selected = all.filter(ls=>doneIds.includes(ls.id)).flatMap(ls=>ls.gameVocab);
  return (selected.length?selected:[{word:'hello',zh:'你好',en:'greeting'},{word:'name',zh:'名字',en:'name'},{word:'rice',zh:'米饭',en:'rice'}]);
}
function startGame(){
  clearInterval(state.game.timer);
  state.game = { time:60, timer:null, score:0, selectedLeft:null };
  $("#timer").textContent = 60; $("#score").textContent = 0;

  const vocab = poolVocab();
  let pairs = vocab.map(v=>({key:v.word,left:v.word,right:(state.lang==='zh'?(v.zh||v.en):(v.en||v.zh))}));
  const L = pairs.slice().sort(()=>Math.random()-0.5);
  const R = pairs.slice().sort(()=>Math.random()-0.5);
  $("#gameArea").innerHTML = `
    <div class="grid cols-2">
      <div id="left">${L.map(p=>`<div class="word" data-key="${p.key}">🔤 ${p.left}</div>`).join('')}</div>
      <div id="right">${R.map(p=>`<div class="word" data-key="${p.key}">🧠 ${p.right}</div>`).join('')}</div>
    </div>`;

  $("#restart").onclick = startGame;
  $("#speakAll").onclick = ()=> $$("#left .word").forEach((w,i)=>setTimeout(()=>speak(w.textContent.replace('🔤','').trim(),'en'),i*800));

  $$("#left .word").forEach(w=>w.onclick=()=>{ $$("#left .word").forEach(x=>x.classList.remove('sel')); w.classList.add('sel'); state.game.selectedLeft=w; speak(w.textContent.replace('🔤','').trim(),'en'); });
  $$("#right .word").forEach(t=>t.onclick=()=>{
    const Lsel = state.game.selectedLeft;
    if(!Lsel){ toast('先点左侧单词'); return; }
    if(Lsel.dataset.key===t.dataset.key){
      state.game.score += 10; $("#score").textContent = state.game.score;
      Lsel.classList.remove('sel'); Lsel.classList.add('ok'); Lsel.style.pointerEvents='none';
      t.classList.add('ok'); state.game.selectedLeft=null; toast('正确 +10');
    }else{
      state.game.score = Math.max(0, state.game.score-5); $("#score").textContent = state.game.score;
      t.classList.add('bad'); setTimeout(()=>t.classList.remove('bad'), 350); toast('再试一次 -5');
    }
  });

  state.game.timer = setInterval(()=>{
    state.game.time--; $("#timer").textContent = state.game.time;
    if(state.game.time<=0){ clearInterval(state.game.timer); toast(`时间到！得分：${state.game.score}`); }
  },1000);
}

/* ====== 社区（演示：本地存储） ====== */
let media, chunks=[];
$("#recBtn").onclick = async ()=>{
  try{
    if(!media){
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      media = new MediaRecorder(stream);
      media.ondataavailable = e=>chunks.push(e.data);
      media.onstop = ()=>{
        const blob = new Blob(chunks,{type:'audio/webm'}); chunks=[];
        const url = URL.createObjectURL(blob);
        const au = $("#preview"); au.src = url; au.classList.remove('hidden');
        au.dataset.blobUrl = url;
      };
    }
    if(media.state==='recording'){ media.stop(); $("#recBtn").textContent='🎙️ 录音'; toast('录音已停止'); }
    else { media.start(); $("#recBtn").textContent='⏺ 正在录音…'; toast('开始录音'); }
  }catch{ toast('此设备不支持录音或权限被拒绝'); }
};
$("#postBtn").onclick = ()=>{
  const text = $("#postText").value.trim();
  const audioUrl = $("#preview").dataset.blobUrl || null;
  if(!text && !audioUrl){ toast('写点内容或录一段音频吧'); return; }
  state.posts.push({id:Date.now(), text, audioUrl, likes:0, comments:[]});
  store.set('posts', state.posts); $("#postText").value=''; $("#preview").classList.add('hidden'); $("#preview").removeAttribute('data-blob-url');
  renderFeed(); toast('已发布（保存在本机浏览器）');
};
function renderFeed(){
  const wrap = $("#feed"); wrap.innerHTML='';
  if(!state.posts.length){ wrap.innerHTML = `<div class="small">还没有帖子，发一个试试～</div>`; return; }
  state.posts.slice().reverse().forEach(p=>{
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `
      <div>${p.text? p.text.replace(/\n/g,'<br>') : ''}</div>
      ${p.audioUrl? `<audio controls src="${p.audioUrl}"></audio>`:''}
      <div class="cta">
        <button class="btn secondary" data-like="${p.id}">👍 ${p.likes}</button>
        <button class="btn secondary" data-cmt="${p.id}">💬 评论</button>
        <button class="btn secondary" data-share="${p.id}">🔗 转发</button>
      </div>
      <div class="small" id="c_${p.id}">
        ${(p.comments||[]).map(c=>`<div>🗨️ ${c}</div>`).join('')}
      </div>`;
    wrap.appendChild(d);
  });
  wrap.querySelectorAll('[data-like]').forEach(b=>b.onclick=()=>{
    const id = Number(b.dataset.like); const p = state.posts.find(x=>x.id===id); p.likes++; store.set('posts',state.posts); renderFeed();
  });
  wrap.querySelectorAll('[data-cmt]').forEach(b=>b.onclick=()=>{
    const id = Number(b.dataset.cmt); const t = prompt('输入你的评论'); if(!t) return;
    const p = state.posts.find(x=>x.id===id); p.comments.push(t); store.set('posts',state.posts); renderFeed();
  });
  wrap.querySelectorAll('[data-share]').forEach(b=>b.onclick=()=>{ toast('已复制链接（演示）'); });
}

/* ====== 导出进度 ====== */
$("#export").onclick = (e)=>{ e.preventDefault();
  const data = {progress:state.progress, activity:state.activity, posts:state.posts};
  const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href=url; a.download='ladder_progress.json'; a.click(); URL.revokeObjectURL(url);
};

/* ====== 初始化 ====== */
function init(){
  $("#lang").value = state.lang;
  $$(".nav [data-goto]").forEach(b=>b.onclick=()=>show(b.dataset.goto));
  renderHome(); renderCourses(); renderFeed();
  show('home');
}
init();


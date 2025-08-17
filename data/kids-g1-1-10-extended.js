/* 少儿 G1 · 1–10 课 · 长对话版（每课≈8–10轮，含中英对照+练习+小游戏词） */
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
        {type:'choice', prompt:`哪个词更贴近“${zh}”？`, choices:[(vocab&&vocab[0])||'hello','apple'], answer:0},
        {type:'fill',   prompt:'补全：Good ____！（早上好/晚上好都可用这个词）', answer:'morning'},
        {type:'fill',   prompt:`拼写：请输入单词 “${(vocab&&vocab[1])||'friend'}”`, answer:String((vocab&&vocab[1])||'friend').toLowerCase()}
      ],
      gameVocab: (vocab||[]).slice(0,8).map(w=>({word:w, zh:'本课词'}))
    };
  }

  const G1 = [
    /* 1. Hello, My Friend! */
    L(
      'K-G1-1',
      '你好，朋友！',
      'Hello, My Friend!',
      [
        {speaker:'Tom',   en:"Hello! What's your name?", zh:'你好！你叫什么名字？'},
        {speaker:'Anna',  en:"Hi! I'm Anna. What's your name?", zh:'嗨！我叫 Anna。你呢？'},
        {speaker:'Tom',   en:"I'm Tom. Nice to meet you!", zh:'我叫 Tom。很高兴认识你！'},
        {speaker:'Anna',  en:"Nice to meet you too!", zh:'我也很高兴认识你！'},
        {speaker:'Tom',   en:"Do you want to play?", zh:'你想玩吗？'},
        {speaker:'Anna',  en:"Yes! Let's play tag.", zh:'想！我们玩追逐游戏吧。'},
        {speaker:'Tom',   en:"Great! Ready, set, go!", zh:'太好了！预备，开始！'},
        {speaker:'Anna',  en:"Ha-ha! You can't catch me!", zh:'哈哈！你抓不到我！'}
      ],
      '礼貌用语：Nice to meet you! / Thank you / Please。',
      ['hello','friend','name','play','tag','nice','meet','hi']
    ),

    /* 2. My Family */
    L(
      'K-G1-2',
      '我的家人',
      'My Family',
      [
        {speaker:'Anna',  en:"This is my mother.", zh:'这是我的妈妈。'},
        {speaker:'Tom',   en:"Hello, mother!", zh:'你好，阿姨！'},
        {speaker:'Anna',  en:"This is my father.", zh:'这是我的爸爸。'},
        {speaker:'Tom',   en:"Good evening, father!", zh:'晚上好，叔叔！'},
        {speaker:'Anna',  en:"I have a brother and a sister.", zh:'我有一个哥哥和一个姐姐。'},
        {speaker:'Tom',   en:"Wow! Big family!", zh:'哇！大家庭！'},
        {speaker:'Anna',  en:"I love my family.", zh:'我爱我的家人。'},
        {speaker:'Tom',   en:"Me too!", zh:'我也是！'}
      ],
      '家庭词汇：father / mother / brother / sister；表达爱：I love my family.',
      ['father','mother','brother','sister','family','love','good evening','hello']
    ),

    /* 3. Colors Everywhere */
    L(
      'K-G1-3',
      '到处都是颜色',
      'Colors Everywhere',
      [
        {speaker:'Tom',   en:"Look! The sky is blue.", zh:'看！天空是蓝色的。'},
        {speaker:'Anna',  en:"The grass is green.", zh:'草是绿色的。'},
        {speaker:'Tom',   en:"I like red apples.", zh:'我喜欢红苹果。'},
        {speaker:'Anna',  en:"I like yellow bananas.", zh:'我喜欢黄香蕉。'},
        {speaker:'Tom',   en:"What color do you like?", zh:'你喜欢什么颜色？'},
        {speaker:'Anna',  en:"I like pink!", zh:'我喜欢粉色！'},
        {speaker:'Tom',   en:"Pink is cute!", zh:'粉色很可爱！'},
        {speaker:'Anna',  en:"Colors are fun!", zh:'颜色真有趣！'}
      ],
      '颜色词：red/blue/green/yellow/pink；问喜欢：What color do you like?',
      ['red','blue','green','yellow','pink','color','apple','banana']
    ),

    /* 4. At School */
    L(
      'K-G1-4',
      '在学校',
      'At School',
      [
        {speaker:'Teacher', en:"Good morning, class!", zh:'早上好，同学们！'},
        {speaker:'Students',en:"Good morning, teacher!", zh:'老师早！'},
        {speaker:'Tom',     en:"I have a book.", zh:'我有一本书。'},
        {speaker:'Anna',    en:"I have a pen.", zh:'我有一支笔。'},
        {speaker:'Teacher', en:"Open your books, please.", zh:'请打开书。'},
        {speaker:'Students',en:"Okay!", zh:'好的！'},
        {speaker:'Teacher', en:"Read after me.", zh:'跟我读。'},
        {speaker:'Students',en:"Yes, teacher!", zh:'好的，老师！'}
      ],
      '课堂指令：Open your books / Read after me；称呼：teacher / class。',
      ['teacher','class','book','pen','open','read','please','good morning']
    ),

    /* 5. Animals */
    L(
      'K-G1-5',
      '动物朋友',
      'Animals',
      [
        {speaker:'Anna',  en:"Look, a dog!", zh:'看，一只狗！'},
        {speaker:'Tom',   en:"Woof! Woof!", zh:'汪！汪！'},
        {speaker:'Anna',  en:"Look, a cat!", zh:'看，一只猫！'},
        {speaker:'Tom',   en:"Meow! Meow!", zh:'喵！喵！'},
        {speaker:'Anna',  en:"I see a bird.", zh:'我看见一只鸟。'},
        {speaker:'Tom',   en:"I see a fish.", zh:'我看见一条鱼。'},
        {speaker:'Anna',  en:"Animals are cute!", zh:'动物很可爱！'},
        {speaker:'Tom',   en:"Yes! I like animals.", zh:'是的！我喜欢动物。'}
      ],
      '动物词：dog/cat/bird/fish；仿声词帮助记忆。',
      ['dog','cat','bird','fish','look','see','cute','like']
    ),

    /* 6. Numbers */
    L(
      'K-G1-6',
      '数一数',
      'Numbers',
      [
        {speaker:'Tom',   en:"One apple.", zh:'一个苹果。'},
        {speaker:'Anna',  en:"Two bananas.", zh:'两个香蕉。'},
        {speaker:'Tom',   en:"Three cats.", zh:'三只猫。'},
        {speaker:'Anna',  en:"Four dogs.", zh:'四只狗。'},
        {speaker:'Tom',   en:"Five books.", zh:'五本书。'},
        {speaker:'Anna',  en:"Six pens.", zh:'六支笔。'},
        {speaker:'Tom',   en:"We can count!", zh:'我们会数数啦！'},
        {speaker:'Anna',  en:"Yes, 1 to 6!", zh:'对，1到6！'}
      ],
      '数词：one/two/three/four/five/six；名词复数+s。',
      ['one','two','three','four','five','six','count','books']
    ),

    /* 7. Fruits */
    L(
      'K-G1-7',
      '我爱水果',
      'Fruits',
      [
        {speaker:'Anna',  en:"I like apples.", zh:'我喜欢苹果。'},
        {speaker:'Tom',   en:"I like bananas.", zh:'我喜欢香蕉。'},
        {speaker:'Anna',  en:"Oranges are sweet.", zh:'橙子很甜。'},
        {speaker:'Tom',   en:"Grapes are small.", zh:'葡萄很小。'},
        {speaker:'Anna',  en:"What fruit do you like?", zh:'你喜欢什么水果？'},
        {speaker:'Tom',   en:"I like strawberries!", zh:'我喜欢草莓！'},
        {speaker:'Anna',  en:"Yummy!", zh:'好吃！'},
        {speaker:'Tom',   en:"Fruits are healthy.", zh:'水果很健康。'}
      ],
      '水果词：apple/banana/orange/grape/strawberry；问喜欢：What fruit do you like?',
      ['apple','banana','orange','grape','strawberry','fruit','sweet','healthy']
    ),

    /* 8. Weather */
    L(
      'K-G1-8',
      '今天天气',
      'Weather',
      [
        {speaker:'Tom',   en:"Today is sunny!", zh:'今天是晴天！'},
        {speaker:'Anna',  en:"Yay! Let's play outside.", zh:'耶！我们去外面玩吧。'},
        {speaker:'Tom',   en:"Tomorrow is rainy.", zh:'明天要下雨。'},
        {speaker:'Anna',  en:"Oh no, stay at home.", zh:'哎呀，那就在家吧。'},
        {speaker:'Tom',   en:"Cloudy is okay.", zh:'多云也可以。'},
        {speaker:'Anna',  en:"Windy is fun too!", zh:'有风也很好玩！'},
        {speaker:'Tom',   en:"What’s the weather today?", zh:'今天天气怎么样？'},
        {speaker:'Anna',  en:"It is sunny!", zh:'是晴天！'}
      ],
      '天气词：sunny/rainy/cloudy/windy；句型：It is … today.',
      ['sunny','rainy','cloudy','windy','play','outside','today','tomorrow']
    ),

    /* 9. Food */
    L(
      'K-G1-9',
      '美味食物',
      'Food',
      [
        {speaker:'Anna',  en:"I eat bread.", zh:'我吃面包。'},
        {speaker:'Tom',   en:"I drink milk.", zh:'我喝牛奶。'},
        {speaker:'Anna',  en:"I like rice.", zh:'我喜欢米饭。'},
        {speaker:'Tom',   en:"I like eggs.", zh:'我喜欢鸡蛋。'},
        {speaker:'Anna',  en:"What do you like?", zh:'你喜欢什么？'},
        {speaker:'Tom',   en:"I like noodles!", zh:'我喜欢面条！'},
        {speaker:'Anna',  en:"Yummy lunch!", zh:'午饭真好吃！'},
        {speaker:'Tom',   en:"Yes, yummy!", zh:'是的，好吃！'}
      ],
      '食物词：bread/milk/rice/egg/noodles；句型：I like …',
      ['bread','milk','rice','egg','noodles','eat','drink','like']
    ),

    /* 10. Good Night */
    L(
      'K-G1-10',
      '一天的问候',
      'Good Night',
      [
        {speaker:'Anna',  en:"Good morning, Tom!", zh:'早上好，Tom！'},
        {speaker:'Tom',   en:"Good morning, Anna!", zh:'早上好，Anna！'},
        {speaker:'Anna',  en:"Good afternoon, teacher!", zh:'下午好，老师！'},
        {speaker:'Tom',   en:"Good evening, father!", zh:'晚上好，爸爸！'},
        {speaker:'Anna',  en:"Good night, mother!", zh:'晚安，妈妈！'},
        {speaker:'Tom',   en:"Good night, Anna!", zh:'晚安，Anna！'},
        {speaker:'Anna',  en:"See you tomorrow!", zh:'明天见！'},
        {speaker:'Tom',   en:"See you!", zh:'再见！'}
      ],
      '一日问候：Good morning / afternoon / evening / night；See you tomorrow.',
      ['good morning','good afternoon','good evening','good night','see you','tomorrow','father','mother']
    )
  ];

  // 导出为课程分包（被 courses-loader.js 合并到 window.COURSES.kids）
  window.COURSE_PART = { 'G1': G1 };
})();

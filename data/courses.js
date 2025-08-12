/* 测试版：只放极少几课，用“超显眼标题”确认是否加载成功 */
(function(){
  // 结构必须与 app.js 期望一致：{ adult:{<level>: Lesson[]}, kids:{<level>: Lesson[]} }
  // level 名必须与页面数组里一致：成人 ['A0 入门','A1 生存',...], 少儿 ['G1', 'G2', ...]
  window.COURSES = {
    adult: {
      'A0 入门': [
        {
          id: 'A-A0 入门-1',
          titleZh: '【测试】机场换登机牌（长对话）',
          titleEn: 'TEST: Boarding Pass – Long Dialogue',
          content: [
            {type:'phrase', en:'Good morning, I need to reprint my boarding pass.', zh:'早上好，我需要重新打印登机牌。'},
            {type:'dialogue', lines: [
              {speaker:'You',   en:'Hi, my online check-in failed. Could you help me?', zh:'你好，我的在线值机失败了，能帮我吗？'},
              {speaker:'Agent', en:'Sure. May I have your passport?', zh:'当然，可以出示护照吗？'},
              {speaker:'You',   en:'Here you go.', zh:'给你。'},
              {speaker:'Agent', en:'Thank you. I found your booking. Do you have any luggage to check?', zh:'谢谢。已找到您的预订。有托运行李吗？'},
              {speaker:'You',   en:'Just one bag.', zh:'只有一个包。'},
              {speaker:'Agent', en:'Please put it on the belt. Your boarding pass is reprinted. Boarding at Gate 23, 9:15.', zh:'请放到传送带上。您的登机牌已重新打印。登机口23，9:15登机。'},
              {speaker:'You',   en:'Great. Which way is security?', zh:'太好了。安检怎么走？'},
              {speaker:'Agent', en:'Straight ahead. Have a nice trip!', zh:'一直往前走。旅途愉快！'},
              {speaker:'You',   en:'Thanks a lot!', zh:'非常感谢！'}
            ]},
            {type:'tip', zh:'办理值机/重打登机牌常用：boarding pass, check-in, luggage, gate。'}
          ],
          exercise: [
            {type:'fill',   prompt:'填空：Boarding at ____ 23.', answer:'Gate'},
            {type:'choice', prompt:'安检英文是？', choices:['security check','city check'], answer:0},
            {type:'fill',   prompt:'请拼写“登机牌”对应英文：boarding ____', answer:'pass'}
          ],
          gameVocab: [{word:'boarding pass', zh:'登机牌'}, {word:'gate', zh:'登机口'}, {word:'security', zh:'安检'}, {word:'luggage', zh:'行李'}]
        }
      ],
      // 其他 level 先留空数组，页面会优雅降级
      'A1 生存':[], 'A2 进阶':[], 'B1 门槛':[], 'B2 优势':[], 'C1 高级':[]
    },
    kids: {
      'G1': [
        {
          id: 'K-G1-1',
          titleZh: '【测试】动物园探险（长对话）',
          titleEn: 'TEST: Zoo Adventure – Long Dialogue',
          content: [
            {type:'phrase', en:'Look at the animals!', zh:'看这些动物！'},
            {type:'dialogue', lines: [
              {speaker:'Tom',  en:'Mom, can we see the lions first?', zh:'妈妈，我们能先去看狮子吗？'},
              {speaker:'Mom',  en:'Sure. Lions are strong and brave.', zh:'当然。狮子强壮又勇敢。'},
              {speaker:'Tom',  en:'Wow, the lion is huge!', zh:'哇，这只狮子好大！'},
              {speaker:'Mom',  en:'Do you hear it roar?', zh:'你听到它在咆哮吗？'},
              {speaker:'Tom',  en:'Yes! After lions, I want to see the penguins.', zh:'听到了！看完狮子我想去看企鹅。'},
              {speaker:'Mom',  en:'Great idea. Penguins are cute and they waddle.', zh:'好主意。企鹅很可爱，走路一摇一摆。'},
              {speaker:'Tom',  en:'Look! That penguin is swimming!', zh:'看！那只企鹅在游泳！'},
              {speaker:'Mom',  en:'Let’s take a photo and say “cheese”!', zh:'我们拍张照片，说“茄子”！'},
              {speaker:'Tom',  en:'Cheese!', zh:'茄子！'}
            ]},
            {type:'tip', zh:'动物园常见：lion 狮子、penguin 企鹅、giraffe 长颈鹿。'}
          ],
          exercise: [
            {type:'choice', prompt:'哪一个是“狮子”？', choices:['lion','tiger'], answer:0},
            {type:'fill',   prompt:'拼写：请写出“企鹅”英文：', answer:'penguin'},
            {type:'fill',   prompt:'英文表达：我们拍照 — Let’s take a ____.', answer:'photo'}
          ],
          gameVocab: [{word:'lion', zh:'狮子'}, {word:'penguin', zh:'企鹅'}, {word:'photo', zh:'照片'}]
        }
      ],
      'G2':[], 'G3':[], 'G4':[], 'G5':[], 'G6':[], 'G7':[], 'G8':[], 'G9':[]
    }
  };
})();

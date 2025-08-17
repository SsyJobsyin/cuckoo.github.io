// data/courses-loader.js  ·  先最小化：只加载 adult-1-30.js
(function () {
  // 确保对象存在
  window.COURSES = window.COURSES || { adult: {}, kids: {} };

  function merge(target, source) {
    for (const k in source) target[k] = source[k];
  }

  // 目前只加载一包（注意版本号可改成你想要的）
  const scripts = [
  'data/adult-1-30.js?v=full5',
  'data/adult-31-60.js?v=full5',
  'data/kids-1-30.js?v=full5',
  'data/kids-31-60.js?v=full5',
  'data/adult-a0-1-5-extended.js?v=a0x2',   // 你已添加
  'data/adult-a0-6-10-extended.js?v=a0x3',  // 新增
  'data/adult-a1-1-10-extended.js?v=a1x1'   // 新增
];


  let i = 0;
  function loadNext() {
    if (i >= scripts.length) return;
    const s = document.createElement('script');
    s.src = scripts[i];
    s.onload = () => {
      if (window.COURSE_PART) {
        // 这包是成人的，合并到 adult 下
        merge(window.COURSES.adult, window.COURSE_PART);
        delete window.COURSE_PART;
      }
      i++;
      loadNext();
    };
    s.onerror = () => { i++; loadNext(); };
    document.head.appendChild(s);
  }
  loadNext();
})();

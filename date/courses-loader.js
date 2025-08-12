(function(){
  window.COURSES = { adult: {}, kids: {} };

  function mergeCourses(target, source) {
    for (let key in source) {
      target[key] = source[key];
    }
  }

  // 按顺序加载四个分包
  const scripts = [
    'data/adult-1-30.js?v=full1',
    'data/adult-31-60.js?v=full1',
    'data/kids-1-30.js?v=full1',
    'data/kids-31-60.js?v=full1'
  ];

  let loaded = 0;
  function loadNext() {
    if (loaded >= scripts.length) return;

    const s = document.createElement('script');
    s.src = scripts[loaded];
    s.onload = function(){
      if (window.COURSE_PART) {
        if (loaded < 2) mergeCourses(window.COURSES.adult, window.COURSE_PART);
        else mergeCourses(window.COURSES.kids, window.COURSE_PART);
        delete window.COURSE_PART;
      }
      loaded++;
      loadNext();
    };
    document.head.appendChild(s);
  }
  loadNext();
})();

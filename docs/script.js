window.addEventListener('load', () => {  
  setTimeout(() => {
    window.scrollTo(0, 0);
    const elements = document.querySelectorAll('.hidden');
    const scrollElements = [];

    // 最初に見えている要素だけ delay をつけて順番に表示
    let initialIndex = 0;
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delay = initialIndex * 0.2;
        initialIndex++;
        const imgs = el.querySelectorAll('img');
        const showElement = () => el.classList.add('show');

        if (imgs.length > 0) {
          let loadedCount = 0;
          imgs.forEach(img => {
            if (img.complete) {
              loadedCount++;
              if (loadedCount === imgs.length) setTimeout(showElement, delay * 1000);
            } else {
              img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === imgs.length) setTimeout(showElement, delay * 1000);
              });
            }
          });
        } else {
          setTimeout(showElement, delay * 1000);
        }
      } else {
        scrollElements.push(el);
      }
    });

    // スクロールで出てくる要素
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const imgs = el.querySelectorAll('img');
          const showNow = () => {
            el.classList.add('show');
            obs.unobserve(el);
          };

          if (imgs.length > 0) {
            let loadedCount = 0;
            imgs.forEach(img => {
              if (img.complete) {
                loadedCount++;
                if (loadedCount === imgs.length) showNow();
              } else {
                img.addEventListener('load', () => {
                  loadedCount++;
                  if (loadedCount === imgs.length) showNow();
                });
              }
            });
          } else {
            showNow();
          }
        }
      });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => observer.observe(el));

  }, 100);
});

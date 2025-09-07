window.addEventListener('DOMContentLoaded', () => {
    // ページロード直後に少し遅延させてトップにスクロール
    setTimeout(() => window.scrollTo(0, 0), 50);

    const elements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const imgs = el.querySelectorAll('img');
                
                if (imgs.length > 0) {
                    let loadedCount = 0;
                    imgs.forEach(img => {
                        if (img.complete) {
                            loadedCount++;
                            if (loadedCount === imgs.length) {
                                el.classList.add('show');
                                observer.unobserve(el);
                            }
                        } else {
                            img.addEventListener('load', () => {
                                loadedCount++;
                                if (loadedCount === imgs.length) {
                                    el.classList.add('show');
                                    observer.unobserve(el);
                                }
                            });
                        }
                    });
                } else {
                    el.classList.add('show');
                    observer.unobserve(el);
                }
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
});

/* home.js — 메인 페이지 전용: 배경 글씨 전환, Work hover, 라이트박스 */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 글씨를 부드럽게 바꾸는 공통 함수
  const swapText = (el, word) => {
    if (!el || el.textContent === word) return;
    el.classList.add('is-out');
    setTimeout(() => { el.textContent = word; el.classList.remove('is-out'); }, 220);
  };

  /* 1) Hero: DESIGN → PUBLISH → INTERACTION 자동 전환 */
  const heroBg = document.querySelector('.hero .bg-text');
  if (heroBg && !reduce) {
    const words = (heroBg.dataset.words || 'DESIGN,PUBLISH,INTERACTION').split(',');
    let i = 0;
    setInterval(() => { i = (i + 1) % words.length; swapText(heroBg, words[i]); }, 2500);
  }

  /* 2) Work: 마우스를 올린 프로젝트 이름으로 배경 글씨 변경 */
  const workBg = document.querySelector('.work .bg-text');
  const targets = document.querySelectorAll('[data-bg-word]');
  if (workBg) {
    const base = workBg.textContent;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (!isTouch) {
      targets.forEach(t => {
        t.addEventListener('mouseenter', () => swapText(workBg, t.dataset.bgWord));
        t.addEventListener('focusin', () => swapText(workBg, t.dataset.bgWord));
      });
      document.querySelector('.work').addEventListener('mouseleave', () => swapText(workBg, base));
    } else if ('IntersectionObserver' in window) {
      // 모바일: 화면 가운데에 온 항목으로 변경 + 목록 행 강조
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          en.target.classList.toggle('is-active', en.isIntersecting && en.target.classList.contains('more-row'));
          if (en.isIntersecting) swapText(workBg, en.target.dataset.bgWord);
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      targets.forEach(t => io.observe(t));
    }
  }

  /* 3) Lightbox */
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  const all = [...document.querySelectorAll('[data-lightbox]')];
  let thumbs = all; // 같은 data-group 안에서만 넘겨 봄
  const img = lb.querySelector('img');
  const cap = lb.querySelector('figcaption');
  let idx = 0, lastFocus = null;

  const show = n => {
    idx = (n + thumbs.length) % thumbs.length;
    const t = thumbs[idx];
    img.src = t.dataset.lightbox;
    img.alt = t.dataset.caption || '';
    cap.textContent = `${idx + 1} / ${thumbs.length}  ·  ${t.dataset.caption || ''}`;
  };
  const open = n => {
    lastFocus = document.activeElement;
    show(n);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  };
  const close = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus();
  };

  all.forEach(t => t.addEventListener('click', () => {
    const g = t.dataset.group;
    thumbs = g ? all.filter(x => x.dataset.group === g) : all;
    open(thumbs.indexOf(t));
  }));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  window.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  // 스와이프
  let sx = 0;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });
})();

/* common.js — 모든 페이지 공통: 헤더 상태, 모바일 메뉴, 스크롤 등장 효과 */
(() => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const btn = document.querySelector('.menu-btn');
  if (btn) {
    const close = () => { document.body.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.gnb a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // Reveal on scroll
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-in'));
  }

  // Back to top
  document.querySelectorAll('[data-top]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }));
})();

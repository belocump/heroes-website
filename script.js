/* =============================================
   HEROES FC — script.js
   ============================================= */

/* ── ヘッダー：スクロールで影を追加 ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── ハンバーガーメニュー ── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// モバイルナビのリンクをタップしたら閉じる
mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ── フローティングボタン：CTAセクションより上でのみ表示 ── */
const floatingBtn = document.getElementById('floating-btn');
const reserveSection = document.getElementById('reserve');

function updateFloatingBtn() {
  const scrollY    = window.scrollY;
  const heroH      = document.querySelector('.hero').offsetHeight;
  const reserveTop = reserveSection.getBoundingClientRect().top + scrollY;

  const shouldShow = scrollY > heroH * 0.6 && scrollY + window.innerHeight < reserveTop + 60;
  floatingBtn.classList.toggle('visible', shouldShow);
}
window.addEventListener('scroll', updateFloatingBtn, { passive: true });

/* ── スクロールアニメーション（Intersection Observer） ── */
const animTargets = document.querySelectorAll(
  '.event-card, .feature-item, .staff__card, .section-header, .indoor-banner__item, .cancel-policy__box'
);

animTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

animTargets.forEach(el => observer.observe(el));

/* ── イベントカードの時差アニメーション ── */
document.querySelectorAll('.event-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll('.feature-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

/* ── スムーズスクロール（hrefが#で始まるすべてのリンク） ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerH = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── 予約ボタン：外部URLをここに設定する ── */
const RESERVE_URL = '#'; // ← ここに外部予約サービスのURLを入れる

document.querySelectorAll('a[href="#reserve"]').forEach(btn => {
  // CTA内の「今すぐ予約」は外部URLへ直接飛ばす
  if (btn.id === 'reserve-btn' || btn.classList.contains('floating-btn__link')) {
    btn.addEventListener('click', e => {
      if (RESERVE_URL !== '#') {
        e.preventDefault();
        window.open(RESERVE_URL, '_blank', 'noopener,noreferrer');
      }
    });
  }
});

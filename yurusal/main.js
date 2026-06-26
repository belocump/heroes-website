// 申し込みセクションが画面内に入ったらフローティングボタンを非表示
const floatCta = document.getElementById('floatCta');
const entrySection = document.getElementById('entry');
const observer = new IntersectionObserver(([entry]) => {
  floatCta.classList.toggle('is-hidden', entry.isIntersecting);
}, { threshold: 0.1 });
observer.observe(entrySection);

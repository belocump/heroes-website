/* =============================================
   HEROES FC — script.js
   ============================================= */

/* ── ヘッダー：スクロールで影を追加 ── */
const header = document.getElementById("header");
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

/* ── ハンバーガーメニュー ── */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

// モバイルナビのリンクをタップしたら閉じる
mobileNav.querySelectorAll(".mobile-nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

/* ── フローティングボタン：CTAセクションより上でのみ表示 ── */
const floatingBtn = document.getElementById("floating-btn");
const reserveSection = document.getElementById("reserve");

function updateFloatingBtn() {
  const scrollY = window.scrollY;
  const heroH = document.querySelector(".hero").offsetHeight;
  const reserveTop = reserveSection.getBoundingClientRect().top + scrollY;

  const shouldShow =
    scrollY > heroH * 0.6 && scrollY + window.innerHeight < reserveTop + 60;
  floatingBtn.classList.toggle("visible", shouldShow);
}
window.addEventListener("scroll", updateFloatingBtn, { passive: true });

/* ── スクロールアニメーション（Intersection Observer） ── */
const animTargets = document.querySelectorAll(
  ".event-card, .feature-item, .staff__card, .section-header, .indoor-banner__item, .cancel-policy__box",
);

animTargets.forEach((el) => el.classList.add("fade-up"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

animTargets.forEach((el) => observer.observe(el));

/* ── イベントカードの時差アニメーション ── */
document.querySelectorAll(".event-card").forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll(".feature-item").forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

/* ── ヒーローカルーセル ── */
(function () {
  const imgs = Array.from(
    document.querySelectorAll("#hero-carousel .hero__carousel-img"),
  );
  const dotsWrap = document.getElementById("hero-dots");
  if (!imgs.length || !dotsWrap) return;

  /* ドットを枚数分生成 */
  const dots = imgs.map((_, i) => {
    const btn = document.createElement("button");
    btn.className = "hero__dot" + (i === 0 ? " is-active" : "");
    btn.setAttribute("aria-label", "スライド" + (i + 1));
    btn.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(btn);
    return btn;
  });

  let current = 0;

  function goTo(next) {
    imgs[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = next;
    imgs[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  /* 4秒ごとに自動切り替え */
  setInterval(() => goTo((current + 1) % imgs.length), 4000);
})();

/* ── スムーズスクロール（hrefが#で始まるすべてのリンク） ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerH = header.offsetHeight;
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ── キャンセルポリシー モーダル（外部HTMLを fetch で読み込み） ── */
(function () {
  const openBtn = document.getElementById("cancel-policy-btn");

  fetch("contents/modal_cancel_policy.html")
    .then((res) => res.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);

      const modal = document.getElementById("cancel-modal");
      const closeBtn = document.getElementById("modal-close");
      const overlay = document.getElementById("modal-overlay");

      function openModal() {
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeBtn.focus();
      }

      function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
        openBtn.focus();
      }

      openBtn.addEventListener("click", openModal);
      closeBtn.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);

      // Escキーで閉じる
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) closeModal();
      });
    });
})();

/* ── 予約ボタン：外部URLをここに設定する ── */
const RESERVE_URL = "#"; // ← ここに外部予約サービスのURLを入れる

document.querySelectorAll('a[href="#reserve"]').forEach((btn) => {
  // CTA内の「今すぐ予約」は外部URLへ直接飛ばす
  if (
    btn.id === "reserve-btn" ||
    btn.classList.contains("floating-btn__link")
  ) {
    btn.addEventListener("click", (e) => {
      if (RESERVE_URL !== "#") {
        e.preventDefault();
        window.open(RESERVE_URL, "_blank", "noopener,noreferrer");
      }
    });
  }
});

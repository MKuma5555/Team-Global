const firstView = document.querySelector(".vid");
const vid = firstView.querySelector("video");

vid.pause();

let targetTime = 0;
let ticking = false;

const scroll = () => {
  const distance = window.scrollY - firstView.offsetTop;
  const total = firstView.clientHeight - window.innerHeight;
  let percentage = distance / total;
  percentage = Math.max(0, percentage);
  percentage = Math.min(percentage, 1);

  if (vid.duration > 0) {
    targetTime = percentage * vid.duration;
    if (!ticking) {
      requestAnimationFrame(updateVideo);
      ticking = true;
    }
  }
};

const updateVideo = () => {
  const diff = targetTime - vid.currentTime;
  vid.currentTime += diff * 0.8; // 動画の再生位置を少しずつ調整
  if (Math.abs(diff) > 0.01) {
    requestAnimationFrame(updateVideo);
  } else {
    ticking = false;
  }
};

scroll();
window.addEventListener("scroll", scroll);

// modal close  and timing of pop up button
const mainTag = document.querySelector("main");
const trialModalBox = document.querySelector(".trial_modal_box");
const trialModalCloseButton = document.querySelector(
  ".trial_modal_close_button"
);
// This is the button to close the modal
const backToTopBtn = document.querySelector(".back_to_top_btn");

trialModalBox.style.opacity = "0";
trialModalBox.style.visibility = "hidden";
trialModalBox.style.transition =
  "opacity 0.1s ease-in-out, visibility 0.3s ease-in-out";

backToTopBtn.style.opacity = "0";
backToTopBtn.style.visibility = "hidden";
backToTopBtn.style.transition =
  "opacity 0.1s ease-in-out, visibility 0.3s ease-in-out";

const handleModalDisplay = () => {
  const mainTagTop = mainTag.getBoundingClientRect().top;

  if (mainTagTop <= window.innerHeight) {
    trialModalBox.style.opacity = "1";
    trialModalBox.style.visibility = "visible";
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.visibility = "visible";
  } else {
    trialModalBox.style.opacity = "0";
    trialModalBox.style.visibility = "hidden";
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.visibility = "hidden";
  }
};

handleModalDisplay();
window.addEventListener("scroll", handleModalDisplay);

trialModalCloseButton.addEventListener("click", () => {
  trialModalBox.style.display = "none";
});

//ヘッダーのスクロール制御
const header = document.querySelector("header");
let lastScrollY = window.scrollY;

const handleHeaderScroll = () => {
  const scrollY = window.scrollY;
  const isPast50vh = scrollY > window.innerHeight * 0.3;

  // 背景色切り替え（スクロールが少しでも始まったらダーク）
  if (scrollY > 0) {
    header.style.backgroundColor = "rgba(234, 228, 228, 0.8)";
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.backgroundColor = "transparent";
    header.style.boxShadow = "none";
  }

  if (!isPast50vh) {
    header.style.transform = "translateY(0)";
  } else {
    if (scrollY < lastScrollY) {
      header.style.transform = "translateY(0)"; // 上にスクロールしたら出す
    } else if (scrollY > lastScrollY) {
      header.style.transform = "translateY(-100%)"; // 隠す
    }
  }
  lastScrollY = scrollY;
};

handleHeaderScroll();
window.addEventListener("scroll", handleHeaderScroll);
window.addEventListener("resize", handleHeaderScroll);

// responsive menu
const toggleButton = document.querySelector(".toggle_button");
const dropdownMenu = document.querySelector(".dropdown_menu");
const menuIcon = document.querySelector(".menu-icon");
const dropdownLinks = dropdownMenu.querySelectorAll("a");
// icon svg change
const hamburgerSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
  </svg>
`;

const closeSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
    <path d="M249-249l-57-57 231-231-231-231 57-57 231 231 231-231 57 57-231 231 231 231-57 57-231-231-231 231Z"/>
  </svg>
`;

menuIcon.innerHTML = hamburgerSvg; // 初期表示

let isOpen = false;
// リロード時にドロップメニューを初期値【閉じてる状態に】戻す
document.addEventListener("DOMContentLoaded", () => {
  dropdownMenu.classList.remove("open");
  isOpen = false;
  menuIcon.innerHTML = hamburgerSvg;
});

// ハンバーガーメニューボタンでのドロップメニューのトグル
toggleButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("open");
  console.log("Dropdown menu toggled");
  const isOpen = dropdownMenu.classList.contains("open");
  menuIcon.innerHTML = isOpen ? closeSvg : hamburgerSvg;
});

// 画面のサイズがレスポンシブより大きくなったときにドロップダウンメニューを閉じる
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) {
    dropdownMenu.classList.remove("open");
    isOpen = false;
    menuIcon.innerHTML = hamburgerSvg;
  }
});

// 画面全体で使用 ドロップダウンメニューのリンクをクリックしたときにメニューを閉じる
dropdownLinks.forEach((itemLink) => {
  itemLink.addEventListener("click", () => {
    dropdownMenu.classList.remove("open");
    isOpen = false;
    menuIcon.innerHTML = hamburgerSVG;
  });
});

const ball1 = document.getElementById("ball1");
const ball2 = document.getElementById("ball2");
const ball3 = document.getElementById("ball3");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  ball1.animate([{ left: `${x}px`, top: `${y}px` }], {
    duration: 100,
    fill: "forwards",
  });
  ball2.animate([{ left: `${x}px`, top: `${y}px` }], {
    duration: 300,
    fill: "forwards",
  });
  ball3.animate([{ left: `${x}px`, top: `${y}px` }], {
    duration: 600,
    fill: "forwards",
  });
});

// About section part
// スライドする動き
document.addEventListener("DOMContentLoaded", function () {
  new Splide("#feed-slider", {
    type: "loop",
    autoScroll: {
      speed: 1.2, // スクロール速度（数値を大きくすると速くなる）
      pauseOnHover: true, // ★ ホバーで一時停止する
      pauseOnFocus: false, // フォーカスされても止めない
    },
    arrows: false, // 矢印不要なら false
    pagination: false, // ドットナビゲーション不要なら false
    gap: "20px", // スライド間の余白
    perPage: 3, // 一度に表示する枚数
    breakpoints: {
      1024: { perPage: 2 },
      768: { perPage: 1 },
    },
  }).mount(window.splide.Extensions);
});

// マウスで掴む動き
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".splide__list");
  const wrappers = document.querySelectorAll(".feed-box-wrapper");

  let startX = 0;

  slider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    slider.classList.add("is-grabbing");

    wrappers.forEach((wrapper) => {
      wrapper.classList.remove("is-active-left", "is-active-right");
    });

    const handleMouseMove = (e) => {
      const diffX = e.clientX - startX;

      wrappers.forEach((wrapper) => {
        wrapper.classList.remove("is-active-left", "is-active-right");
        if (diffX < -5) {
          wrapper.classList.add("is-active-left"); // 左へドラッグ
        } else if (diffX > 5) {
          wrapper.classList.add("is-active-right"); // 右へドラッグ
        }
      });
    };

    const handleMouseUp = () => {
      slider.classList.remove("is-grabbing");
      wrappers.forEach((wrapper) => {
        wrapper.classList.remove("is-active-left", "is-active-right");
      });

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
});

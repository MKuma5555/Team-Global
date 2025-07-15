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
  vid.currentTime += diff * 0.1; // 動画の再生位置を少しずつ調整
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

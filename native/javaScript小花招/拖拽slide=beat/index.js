const slides = document.querySelector(".slides");
const allSlides = document.querySelectorAll(".slide");
const slideWidth = allSlides[0].offsetWidth;
const slidesLength = allSlides.length;

let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;

let canISlide = true;

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];

const cloneFirstSlide = firstSlide.cloneNode(true);
const cloneLastSlide = lastSlide.cloneNode(true);

slides.appendChild(cloneFirstSlide);
// insertBefore两个参数
// node 必需。需要插入的节点对象
// node 可选。在其之前插入新节点的子节点。如果未规定，则 insertBefore 方法会在结尾插入 newnode。
slides.insertBefore(cloneLastSlide, firstSlide);



prev.addEventListener("click", () => switchSlide("prev"));
next.addEventListener("click", () => switchSlide("next"));

slides.addEventListener("transitionend", checkIndex);

slides.addEventListener("mousedown", dragStart);
slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);

function dragStart(e) {
  e.preventDefault();
  initialPosition = slides.offsetLeft;
  if (e.type == "touchstart") {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;

    document.onmouseup = dragEnd;
    document.onmousemove = dragMove;
  }
}

function dragMove(e) {
  if (e.type == "touchmove") {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }
  slides.style.left = `${slides.offsetLeft - posX2}px`;
}

function dragEnd() {
  finalPosition = slides.offsetLeft;

  // 992 / 2 = 496;
  if (finalPosition - initialPosition < -496) {
    switchSlide("next", "dragging");
  } else if (finalPosition - initialPosition > 496) {
    switchSlide("prev", "dragging");
  } else {
    slides.style.left = `${initialPosition}px`;
  }

  document.onmouseup = null;
  document.onmousemove = null;
}

function switchSlide(argument, argument2) {
  slides.classList.add("transition");

  if (canISlide) {
    // 解决左右点击偏移
    if (!argument2) initialPosition = slides.offsetLeft;

    if (argument == "next") {
      // offsetLeft 指的是dom离左边的偏移值
      slides.style.left = `${initialPosition - slideWidth}px`;
      index++;
    } else {
      slides.style.left = `${initialPosition + slideWidth}px`;
      index--;
    }
  }

  canISlide = false;
}

function checkIndex() {
  slides.classList.remove("transition");
  if (index == -1) {
    slides.style.left = `-${slidesLength * slideWidth}px`;
    index = slidesLength - 1;
  }

  if (index == slidesLength) {
    slides.style.left = `-${1 * slideWidth}px`;
    index = 0;
  }

  canISlide = true;
}

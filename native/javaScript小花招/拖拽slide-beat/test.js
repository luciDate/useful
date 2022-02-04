const slides = document.querySelector(".slides");
const items = document.querySelectorAll(".item");
const dots = document.querySelector(".dots");
const itemWidth = items[0].offsetWidth;
const allDot = [];
// 之后会添加两个 所以item缓存
const itemsLength = items.length;

let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;

let canIslide = true;

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const firstItem = items[0];
const lastItem = items[items.length - 1];

const cloneFirstItem = firstItem.cloneNode(true);
const cloneLastItem = lastItem.cloneNode(true);

slides.appendChild(cloneFirstItem);
slides.insertBefore(cloneLastItem, firstItem);

for (let i = 0; i < itemsLength; i++) {
  const li = document.createElement("li");
  if (i === 0) li.classList.add("active");
  li.classList.add("dot");
  li.setAttribute("data-index", i);
  li.addEventListener("click", changeActive);
  allDot.push(li);
  dots.appendChild(li);
}

prev.addEventListener("click", () => {
  switchSlide("prev");
});
next.addEventListener("click", () => {
  switchSlide("next");
});

// 事件在css完成过渡之后触发
slides.addEventListener("transitionend", checkIndex);

slides.addEventListener("mousedown", dragStart);
// ?
slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);

function dragStart(e) {
  e.preventDefault();
  slides.classList.remove("transition");
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

  if (finalPosition - initialPosition < -200) {
    switchSlide("next", "dragging");
  } else if (finalPosition - initialPosition > 200) {
    switchSlide("prev", "dragging");
  } else {
    slides.classList.add("transition");
    slides.style.left = `${initialPosition}px`;
  }
  
  document.onmouseup = null;
  document.onmousemove = null;
}

function switchSlide(argument, argument2) {
  slides.classList.add("transition");

  if (canIslide) {
    if (!argument2) initialPosition = slides.offsetLeft;

    if (argument == "next") {
      slides.style.left = `${initialPosition - itemWidth}px`;
      index++;
      let tempIndex = index;
      if (tempIndex == 4) tempIndex = 0;
      clearActive();
      allDot[tempIndex].classList.add("active");
    } else {
      slides.style.left = `${initialPosition + itemWidth}px`;
      index--;
      let tempIndexi = index;
      if (tempIndexi == -1) tempIndexi = allDot.length - 1;
      clearActive();
      allDot[tempIndexi].classList.add("active");
    }
  }
  canIslide = false;
}

function checkIndex() {
  slides.classList.remove("transition");
  if (index == -1) {
    // 这里故意确实是我们添加node后最后一个
    slides.style.left = `-${itemsLength * itemWidth}px`;
    index = itemsLength - 1;
  }
  if (index == itemsLength) {
    slides.style.left = `-${1 * itemWidth}px`;
    index = 0;
  }

  canIslide = true;
}

function clearActive() {
  for (let i = 0; i < itemsLength; i++) {
    allDot[i].classList.remove("active");
  }
}

function changeActive(e) {
  clearActive();
  slides.classList.add("transition");
  const tempIndex = +e.target.getAttribute("data-index") + 1;
  allDot[tempIndex - 1].classList.add("active");
  slides.style.left = `-${tempIndex * itemWidth}px`;
  index = tempIndex - 1;
}

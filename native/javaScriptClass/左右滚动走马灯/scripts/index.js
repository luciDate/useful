let slideIndex, slides, dots, captionText;
function initGallery() {
  slideIndex = 0;
  slides = document.querySelectorAll(".image-holder");
  slides[slideIndex].style.opacity = 1;
  captionText = document.querySelector(".caption-holder .caption-text");
  captionText.innerText =
    slides[slideIndex].querySelector(".caption-text").innerText;

  dots = [];
  const dotsContainer = document.querySelector("#dots-container");
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dots");
    dot.setAttribute("onclick", `moveSlide(${i})`);
    dotsContainer.append(dot);
    dots.push(dot);
  }
  dots[slideIndex].classList.add("active");
}

initGallery();

function plusSlides(n) {
  moveSlide(slideIndex + n);
}

function moveSlide(n) {
  let current, next;
  let moveSlideAnimClass = {
    forCurrent: "",
    forNext: "",
  };
  let slideTextAnimClass;
  if (n > slideIndex) {
    if (n >= slides.length) n = 0;
    moveSlideAnimClass.forCurrent = "move-left-current-slide";
    moveSlideAnimClass.forNext = "move-left-next-slide";
    slideTextAnimClass = "slide-text-from-top";
  } else if (n < slideIndex) {
    if (n < 0) n = slides.length - 1;
    moveSlideAnimClass.forCurrent = "move-right-current-slide";
    moveSlideAnimClass.forNext = "move-right-next-slide";
    slideTextAnimClass = "slide-text-from-bottom";
  }
  if (n != slideIndex) {
    next = slides[n];
    current = slides[slideIndex];
    for (let i = 0; i < slides.length; i++) {
      slides[i].className = "image-holder";
      slides[i].style.opacity = 0;
      dots[i].classList.remove("active");
    }
    current.classList.add(moveSlideAnimClass.forCurrent);
    next.classList.add(moveSlideAnimClass.forNext);
    dots[n].classList.add("active");
    slideIndex = n;
    captionText.style.display = "none";
    captionText.className = `caption-text ${slideTextAnimClass}`;
    captionText.innerText = slides[n].querySelector(".caption-text").innerText;
    captionText.style.display = "block";
  }
}

let timer = null;
function setTimer() {
  timer = setInterval(() => {
    plusSlides(1);
  }, 3000);
}
setTimer();

function playPauseSlides() {
  const playPauseBtn = document.querySelector("#play-pause-btn");
  if (timer == null) {
    setTimer();
    playPauseBtn.style.backgroundPositionY = "0px";
  } else {
    clearInterval(timer);
    timer = null;
    playPauseBtn.style.backgroundPositionY = "-33px";
  }
}

const slides = document.querySelectorAll(".item");
const dotsContainer = document.querySelector(".dots-container");
const container = document.querySelector(".carousel");
const preBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".next-btn");

class Gallery {
  constructor(slides, dotsContainer, container, preBtn, nextBtn) {
    this.slideIndex = 0;
    this.slides = slides;
    this.dots = [];
    this.dotsContainer = dotsContainer;
    this.container = container;
    this.preBtn = preBtn;
    this.nextBtn = nextBtn;
  }

  init() {
    this.slides[this.slideIndex].style.opacity = 1;
    this.preBtn.addEventListener("click", () => {
      this.plusSlide(-1);
    });
    this.nextBtn.addEventListener("click", () => {
      this.plusSlide(1);
    });

    for (let i = 0; i < this.slides.length; i++) {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => {
        this.moveSlide(i);
      });
      this.dotsContainer.append(dot);
      this.dots.push(dot);
    }
    this.dots[this.slideIndex].classList.add("active");

    let timer = null;
    timer = setInterval(() => {
      this.plusSlide(1);
    }, 3000);

    this.container.addEventListener("mouseover", () => {
      clearInterval(timer);
    });
    this.container.addEventListener("mouseout", () => {
      timer = setInterval(() => {
        this.plusSlide(1);
      }, 3000);
    });
  }
  plusSlide(n) {
    this.moveSlide(this.slideIndex + n);
  }
  moveSlide(n) {
    let moveSlideAnimClass = {
      forCurrent: "",
      forNext: "",
    };
    if (n > this.slideIndex) {
      if (n >= this.slides.length) n = 0;
      moveSlideAnimClass.forCurrent = "move-left-current-slide";
      moveSlideAnimClass.forNext = "move-left-next-slide";
    } else if (n < this.slideIndex) {
      if (n < 0) n = this.slides.length - 1;

      moveSlideAnimClass.forCurrent = "move-right-current-slide";
      moveSlideAnimClass.forNext = "move-right-next-slide";
    }
    if (n != this.slideIndex) {
      let next = this.slides[n];
      let current = this.slides[this.slideIndex];
      for (let i = 0; i < this.slides.length; i++) {
        // 如果初始类名不同需要自己改动
        //重置类名 去掉动画类名
        this.slides[i].className = "item";
        //重置透明
        this.slides[i].style.opacity = 0;
        this.dots[i].classList.remove("active");
      }
      current.classList.add(moveSlideAnimClass.forCurrent);
      next.classList.add(moveSlideAnimClass.forNext);
      this.dots[n].classList.add("active");
      this.slideIndex = n;
    }
  }
}

const g = new Gallery(slides, dotsContainer, container, preBtn, nextBtn);

g.init();

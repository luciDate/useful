class CarouselMaker {
  constructor(container, pointList, imgList, preBtn, nextBtn) {
    this.container = container;
    this.pointList = pointList;
    this.imgList = imgList;
    this.preBtn = preBtn;
    this.nextBtn = nextBtn;
    this.index = 0;
  }

  clearActive() {
    for (let i = 0; i < this.imgList.length; i++) {
      this.imgList[i].className = "carousel-img-item";
    }
    for (let i = 0; i < this.pointList.children.length; i++) {
      this.pointList.children[i].className = "point";
    }
  }

  goIndex() {
    this.clearActive();
    this.pointList.children[this.index].className = "point active";
    this.imgList[this.index].className = "carousel-img-item active";
  }

  goPre() {
    if (this.index === 0) {
      this.index = this.imgList.length - 1;
    } else {
      this.index--;
    }
    this.goIndex();
  }

  goNext() {
    if (this.index < this.imgList.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }
    this.goIndex();
  }

  init() {
    let frag = document.createDocumentFragment();

    for (let i = 0; i < this.imgList.length; i++) {
      let liDOM = document.createElement("li");
      liDOM.classList.add("point");
      frag.append(liDOM);
    }
    this.pointList.append(frag);
    this.pointList.children[0].classList.add("active");

    this.preBtn.addEventListener("click", () => {
      this.goPre();
    });

    this.nextBtn.addEventListener("click", () => {
      this.goNext();
    });

    for (let i = 0; i < this.pointList.children.length; i++) {
      this.pointList.children[i].setAttribute("data-index", i);
    }

    for (let i = 0; i < this.pointList.children.length; i++) {
      this.pointList.children[i].addEventListener("click", () => {
        let pointIndex = this.pointList.children[i].getAttribute("data-index");
        this.index = pointIndex;
        this.goIndex();
      });
    }

    let interval = setInterval(() => {
      this.goNext();
    }, 12000);

    this.container.addEventListener("mouseover", () => {
      clearInterval(interval);
    });

    this.container.addEventListener("mouseout", () => {
      interval = setInterval(() => {
        this.goNext();
      }, 12000);
    });
  }
}

class ScrollTo {
  constructor(dom) {
    this.dom = dom;
    this.setTop = dom.offsetTop;
  }
  init() {
    this.dom.addEventListener("click", () => {
      let interval = setInterval(() => {
        this.setTop -= 10;
        window.scrollTo(0, this.setTop);
        if (this.setTop <= 0) {
          clearInterval(interval);
          this.setTop = this.dom.offsetTop;
        }
      }, 10);
    });
  }
}

class Countdown {
  constructor(deadLine, hoursDOM, minutesDOM, secondsDOM) {
    this.hoursDOM = hoursDOM;
    this.minutesDOM = minutesDOM;
    this.secondsDOM = secondsDOM;
    // 正则替换解决不同兼容性问题
    this.deadLine = new Date(`${deadLine}`.replace(/-/g, "/")).getTime();
  }
  init() {
    const timer = setInterval(() => {
      let now = new Date().getTime();
      let differ = this.deadLine - now;

      let hours = Math.floor(
        (differ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((differ % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((differ % (1000 * 60)) / 1000);

      this.hoursDOM.innerHTML = hours;
      this.minutesDOM.innerHTML = minutes;
      this.secondsDOM.innerHTML = seconds;

      if (differ < 0) {
        clearInterval(timer);
        this.hoursDOM.innerHTML = "0";
        this.minutesDOM.innerHTML = "0";
        this.secondsDOM.innerHTML = "0";
      }
    }, 1000);
  }
}

class Gallery {
  constructor(slides, dotsContainer, container) {
    this.slideIndex = 0;
    this.slides = slides;
    this.dots = [];
    this.dotsContainer = dotsContainer;
    this.container = container;
  }

  init() {
    this.slides[this.slideIndex].style.opacity = 1;

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
    }, 10000);

    this.container.addEventListener("mouseover", () => {
      clearInterval(timer);
    });
    this.container.addEventListener("mouseout", () => {
      timer = setInterval(() => {
        this.plusSlide(1);
      }, 10000);
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
        this.slides[i].className = "countdown-img-wrapper";
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

class SingleCarusel {
  constructor(imgItems, info) {
    this.imgItems = imgItems;
    this.flag = 0;
    this.info = info;
  }
  itemMove() {
    for (let i = 0; i < this.imgItems.length; i++) {
      this.info[i].classList.remove("active");
      this.imgItems[i].checked = false;
    }
    if (this.flag >= this.imgItems.length) this.flag = 0;
    this.imgItems[this.flag].checked = true;
    this.info[this.flag].classList.add("active");
    this.flag += 1;
  }
  init() {
    for (let i = 0; i < this.imgItems.length; i++) {
      this.imgItems[i].addEventListener("click", () => {
        this.itemMove();
      });
    }
    setInterval(() => {
      this.itemMove();
    }, 6000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector("#carousel-container");
  const carouselPointList = document.querySelector("#carousel-point-list");
  const carouselImgList = document.querySelectorAll(".carousel-img-item");
  const carouselPreBtn = document.querySelector("#carousel-pre-btn");
  const carouselNextBtn = document.querySelector("#carousel-next-btn");
  const fixedTop = document.querySelector(".fixed-top");
  const timerHours = document.querySelector("#timer-hours");
  const timerMinutes = document.querySelector("#timer-minutes");
  const timerSeconds = document.querySelector("#timer-seconds");

  const fixedBar = document.querySelector(".fixed-bar");
  let fixedFlag = false;

  const toTop = document.querySelector("#to-top");

  const dtObj = new Date();
  const nzYear = dtObj.getFullYear();
  const nzMonth = dtObj.getMonth() + 1;
  const nzDay = dtObj.getDate();

  const countDownSlides = document.querySelectorAll(".countdown-img-wrapper");
  const countDownDotsContainer = document.querySelector(".dots");
  const countDownContainer = document.querySelector(".countdown-carousel");

  const singleCaruselItems = document.querySelectorAll(".core-l-img-item");
  const singleCaruselInfos = document.querySelectorAll(".core-radio-info");

  window.addEventListener("scroll", () => {
    // 解决不同浏览器之间距离顶部偏移量的兼容写法
    let nztop =
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.pageYOffset;
    if (nztop >= 500 && fixedFlag === false) {
      fixedBar.classList.add("fixed-active");
      fixedTop.classList.add("active");
      fixedFlag = !fixedFlag;
    } else if (nztop <= 300 && fixedFlag === true) {
      fixedBar.classList.remove("fixed-active");
      fixedTop.classList.remove("active");
      fixedFlag = !fixedFlag;
    }
  });

  const nzCarousel = new CarouselMaker(
    carouselContainer,
    carouselPointList,
    carouselImgList,
    carouselPreBtn,
    carouselNextBtn
  );

  const nzScrollTo = new ScrollTo(toTop);

  const nzCountdown = new Countdown(
    `${nzYear}-${nzMonth}-${nzDay} 23:30:59`,
    timerHours,
    timerMinutes,
    timerSeconds
  );

  const nzGallery = new Gallery(
    countDownSlides,
    countDownDotsContainer,
    countDownContainer
  );

  const nzSingleCarusel = new SingleCarusel(
    singleCaruselItems,
    singleCaruselInfos
  );

  nzCarousel.init();
  nzScrollTo.init();
  nzCountdown.init();
  nzGallery.init();
  nzSingleCarusel.init();
});

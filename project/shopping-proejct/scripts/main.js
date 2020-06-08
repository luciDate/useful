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
    this.deadLine = new Date(`${deadLine}`).getTime();
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
  const nzHours = dtObj.getHours();
  const nzMinutes = dtObj.getMinutes();

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop >= 500 && fixedFlag === false) {
      fixedBar.classList.add("fixed-active");
      fixedTop.classList.add("active");
      fixedFlag = !fixedFlag;
    } else if (
      document.documentElement.scrollTop <= 300 &&
      fixedFlag === true
    ) {
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
    `${nzMonth} ${nzDay},${nzYear} 23:30:59`,
    timerHours,
    timerMinutes,
    timerSeconds
  );

  nzCarousel.init();
  nzScrollTo.init();
  nzCountdown.init();
});
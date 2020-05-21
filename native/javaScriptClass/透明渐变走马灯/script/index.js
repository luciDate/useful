let items = document.querySelectorAll(".item");
let points = document.querySelectorAll(".point");
const goPreBtn = document.querySelector("#goPre");
const goNextBtn = document.querySelector("#goNext");
const container = document.querySelector(".carousel");

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
      this.imgList[i].className = "item";
    }
    for (let i = 0; i < this.pointList.length; i++) {
      this.pointList[i].className = "point";
    }
  }

  goIndex() {
    this.clearActive();
    this.pointList[this.index].className = "point active";
    this.imgList[this.index].className = "item active";
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
    this.preBtn.addEventListener("click", () => {
      this.goPre();
    });

    this.nextBtn.addEventListener("click", () => {
      this.goNext();
    });

    for (let i = 0; i < this.pointList.length; i++) {
      this.pointList[i].setAttribute("data-index", i);
    }

    for (let i = 0; i < this.pointList.length; i++) {
      this.pointList[i].addEventListener("click", () => {
        let pointIndex = this.pointList[i].getAttribute("data-index");
        this.index = pointIndex;
        this.goIndex();
      });
    }

    let interval = setInterval(() => {
      this.goNext();
    }, 3000);

    this.container.addEventListener("mouseover", () => {
      clearInterval(interval);
    });

    this.container.addEventListener("mouseout", () => {
      interval = setInterval(() => {
        this.goNext();
      }, 3000);
    });
  }
}

const c = new CarouselMaker(container, points, items, goPreBtn, goNextBtn);
c.init();

let items = document.querySelectorAll(".carousel-img-item");
let points = document.querySelector(".point-list");
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
      // 如果初始类名不同需要自己改动
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
    }, 8000);

    this.container.addEventListener("mouseover", () => {
      clearInterval(interval);
    });

    this.container.addEventListener("mouseout", () => {
      interval = setInterval(() => {
        this.goNext();
      }, 8000);
    });
  }
}

const c = new CarouselMaker(container, points, items, goPreBtn, goNextBtn);
c.init();

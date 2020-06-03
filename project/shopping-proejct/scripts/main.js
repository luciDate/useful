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
    for (let i = 0; i < this.pointList.children.length; i++) {
      this.pointList.children[i].className = "point";
    }
  }

  goIndex() {
    this.clearActive();
    this.pointList.children[this.index].className = "point active";
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


document.addEventListener("DOMContentLoaded",()=>{
    alert("233")
})

(function () {
  const fixedNavbar = document.querySelector("#fixed");
  //const staticNavbar = document.querySelector("#static");
  const y = fixedNavbar.offsetHeight + 100;

  // let positionY = 0;
  //   let timer = window.setInterval(() => {
  //     positionY += 1;
  //     if (positionY <= staticNavbar.offsetTop) {
  //       // scrollTo 接受 x，y 值
  //       window.scrollTo(0, positionY);
  //     } else {
  //       clearInterval(timer);
  //     }
  //   }, 2);

  function show() {
    fixedNavbar.style.transition = "all 0.3s linear";
    fixedNavbar.classList.add("active");
  }

  function hide() {
    fixedNavbar.style.transition = "none";
    fixedNavbar.classList.remove("active");
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > y) {
      console.log("1");
      show();
    } else {
      console.log("2");
      hide();
    }
  });
});

const fixedNavbar = document.querySelector("#fixed");

class HeaderScroll {
  constructor(dom) {
    this.dom = dom;
    this.scrollHeight = this.dom.offsetHeight + 100;
  }
  show() {
    this.dom.style.transition = "all 0.3s linear";
    this.dom.classList.add("active");
  }
  hide() {
    this.dom.style.transition = "none";
    this.dom.classList.remove("active");
  }
  init() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > this.scrollHeight) {
        this.show();
      } else {
        this.hide();
      }
    });
  }
}

let s = new HeaderScroll(fixedNavbar)
s.init()

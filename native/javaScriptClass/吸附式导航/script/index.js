const fixedNavbar = document.querySelector("#fixed");
const staticNavbar = document.querySelector("#static");
const y = fixedNavbar.offsetHeight + staticNavbar.offsetTop;

class HeaderScroll {
  constructor(dom, domII) {
    this.dom = dom;
    this.domII = domII;
    this.scrollHeight = this.dom.offsetHeight + this.domII.offsetTop;
    this.documentY = 0;
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
    let timer = window.setInterval(() => {
      this.documentY += 1;
      if (this.documentY <= this.domII.offsetTop) {
        // scrollTo 接受 x，y 值
        window.scrollTo(0, this.documentY);
      } else {
        clearInterval(timer);
      }
    }, 2);
  }
}

let s = new HeaderScroll(fixedNavbar, staticNavbar);
s.init();

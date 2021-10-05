window.addEventListener("DOMContentLoaded", () => {
  function azaController() {
    //dom
    const header = document.querySelector(".header");
    const menuBtn = document.querySelector("#menu-btn");
    const menu = document.querySelector("#menu");
    const menuIcon = document.querySelector("#menu-icon");
    const upBtn = document.querySelector(".scroll-up-btn");
    const skills = document.querySelector("#skills-line");
    const css = document.querySelector(".line.css");
    const java = document.querySelector(".line.java");
    const counters = document.querySelectorAll(".skills-counter");

    let menuFlag = false;
    let menuIconFlag = false;
    let boundFlag = false;

    return () => {
      // scroll
      window.addEventListener("scroll", () => {
        // 获取屏幕的可视高度，当dom距离顶部小于等于可视高度时 执行代码
        let bound = skills.getBoundingClientRect();
        let clientHeight = window.innerHeight;

        if (bound.top + 200 <= clientHeight) {
          css.classList.add("active");
          java.classList.add("active");
          if (!boundFlag) {
            boundFlag = !boundFlag;
            for (let index = 0; index < counters.length; index++) {
              const updateCounter = () => {
                let target = +counters[index].getAttribute("data-target");
                let num = +counters[index].innerText;
                if (num < target) {
                  counters[index].innerText = num + 1;
                  setTimeout(updateCounter, 10);
                } else {
                  counters[index].innerText = target;
                }
              };
              updateCounter();
            }
          }
        }

        if (window.scrollY > 20) {
          header.classList.add("active");
          upBtn.classList.add("active");
        } else {
          header.classList.remove("active");
          upBtn.classList.remove("active");
        }
      });
      // menuBtn
      menuBtn.addEventListener("click", () => {
        if (!menuFlag) {
          menu.classList.add("active");
          menuFlag = !menuFlag;
        } else {
          menu.classList.remove("active");
          menuFlag = !menuFlag;
        }
        if (!menuIconFlag) {
          menuIcon.setAttribute("xlink:href", "#icon-cha1");
          menuIconFlag = !menuIconFlag;
        } else {
          menuIcon.setAttribute("xlink:href", "#icon-iconset0195");
          menuIconFlag = !menuIconFlag;
        }
      });
    };
  }

  const a = azaController();
  a();
});

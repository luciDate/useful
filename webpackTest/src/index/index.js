import "./stylesheet/index.css";
import "lodash";
import _ from "lodash";
import commonj from "../../common/common";

document.addEventListener("DOMContentLoaded", () => {
  function azaArea() {
    const featBtn = document.querySelector(".feat-btn");
    const featShow = document.querySelector(".feat-show");
    const servBtn = document.querySelector(".serv-btn");
    const servShow = document.querySelector(".serv-show");
    const delta = document.querySelectorAll(".delta");
    const sidebar = document.querySelector(".sidebar");
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    const sidebarItemsLength = sidebarItems.length;
    const navLeft = document.querySelector(".list-left");
    const overDraw = document.querySelector(".over-draw");
    const closeBtn = document.querySelector(".close-btn");
    const themeCheck = document.querySelector("#theme-check");
    const loadingBox = document.querySelector(".loading-box");
    const itemWrapper = document.querySelector(".square .item-wrapper");
    const mainBox = document.querySelector(".main");
    let flagi = false;
    let loadingCounter = 0;
    let testArr = ["a", "b", "c", "d"];

    return (() => {
      function addItem() {
        let tempD = document.createElement("div");
        tempD.innerHTML = `
        <div class="item">
          <a href="#">
              <div class="title">复用面板</div>
              <ul class="list-icon">
                  <li>2018年08月08日</li>
                  <li><i class="fa fa-thumbs-up fa-fw"></i></li>
                  <li><i class="fa fa-commenting-o fa-fw"></i></li>
              </ul>
          </a>
        </div>
        <div class="item">
          <a href="#">
              <div class="title">复用面板</div>
              <ul class="list-icon">
                  <li>2018年08月08日</li>
                  <li><i class="fa fa-thumbs-up fa-fw"></i></li>
                  <li><i class="fa fa-commenting-o fa-fw"></i></li>
              </ul>
          </a>
        </div>
        <div class="item">
          <a href="#">
              <div class="title">复用面板</div>
              <ul class="list-icon">
                  <li>2018年08月08日</li>
                  <li><i class="fa fa-thumbs-up fa-fw"></i></li>
                  <li><i class="fa fa-commenting-o fa-fw"></i></li>
              </ul>
          </a>
        </div>        
        `;
        loadingBox.classList.remove("active");
        itemWrapper.appendChild(tempD);
        flagi = false;
      }

      window.addEventListener("scroll", () => {
        let { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        if (clientHeight + scrollTop >= scrollHeight - 60 && flagi === false) {
          flagi = true;
          loadingCounter++;
          if (loadingCounter <= 3) {
            loadingBox.classList.add("active");
            setTimeout(addItem, 1000);
          } else {
            flagi = true;
            const loadingEnd = document.createElement("div");
            loadingEnd.classList.add("loading-end");
            itemWrapper.appendChild(loadingEnd);
            mainBox.style.padding = "0 0 0 0";
            loadingEnd.innerHTML = "全部加载完成";
          }
        }
      });

      featBtn.addEventListener("click", () => {
        featShow.classList.toggle("active");
        delta[0].classList.toggle("active");
      });

      servBtn.addEventListener("click", () => {
        servShow.classList.toggle("active1");
        delta[1].classList.toggle("active");
      });

      sidebar.addEventListener("click", (e) => {
        const el = e.target;
        if (el.classList.contains("sidebar-item")) {
          for (let index = 0; index < sidebarItemsLength; index++) {
            sidebarItems[index].classList.remove("active");
          }
          el.classList.add("active");
        }
      });

      navLeft.addEventListener("click", () => {
        overDraw.classList.add("active");
      });

      closeBtn.addEventListener("click", () => {
        overDraw.classList.remove("active");
      });

      themeCheck.addEventListener("change", () => {
        document.body.classList.toggle("dark");
      });

      //用于source-map浏览器调式
      //debugger;

      console.log(_.chunk(testArr, 3));

      console.log(commonj());

      //异步加载文件
      setTimeout(() => {
        import("./dynamic-data.js").then((res) => {
          console.log(res.default.message);
        });
      }, 1500);
      
    })();
  }
  azaArea();
});

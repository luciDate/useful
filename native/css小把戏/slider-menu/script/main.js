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

    return () => {
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
    };
  }

  const a = azaArea();
  a();
});

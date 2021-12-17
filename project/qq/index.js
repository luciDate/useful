document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".banner-wrapper .item");
  const itemsLength = items.length;
  const points = document.querySelectorAll(".points .item");
  const pointsLength = points.length;
  const header = document.querySelector("header");
  let index = 0;

  window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 0);
  });

  function clearActive() {
    for (let i = 0; i < itemsLength; i++) {
      items[i].className = "item";
    }
    for (let j = 0; j < pointsLength; j++) {
      points[j].className = "item";
    }
  }

  function goIndex() {
    clearActive();
    items[index].className = "item active";
    points[index].className = "item active";
  }

  function goNext() {
    if (index < itemsLength - 1) {
      index++;
    } else {
      index = 0;
    }
    goIndex();
  }

  for (let i = 0; i < pointsLength; i++) {
    points[i].addEventListener("click", () => {
      let pointIndex = points[i].getAttribute("data-index");
      index = pointIndex;
      goIndex();
    });
  }

  setInterval(() => {
    goNext();
  }, 10000);
});

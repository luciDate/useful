document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelector(".bannerBox ul");
  const imgsLength = imgs.children.length;
  const dots = document.querySelector(".dots");
  const dotsLength = dots.children.length;
  let index = 0;
  const items = document.querySelector(".list-odds");
  const itemsLength = items.children.length;
  const boxs = document.querySelectorAll(".productInfo");
  const boxsLength = boxs.length;
  let indexi = 0;

  function clearCurrent() {
    for (let i = 0; i < imgsLength; i++) {
      imgs.children[i].className = "img";
    }
    for (let j = 0; j < dotsLength; j++) {
      dots.children[j].className = "item";
    }
  }

  function goIndex() {
    clearCurrent();
    imgs.children[index].className = "img current";
    dots.children[index].className = "item square";
  }

  dots.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
      let dotIndex = e.target.getAttribute("data-index");
      index = dotIndex;
      goIndex();
    }
  });

  function goNext() {
    if (index < imgsLength - 1) {
      index++;
    } else {
      index = 0;
    }
    goIndex();
  }

  setInterval(() => {
    goNext();
  }, 10000);

  function clearCurrentI() {
    for (let i = 0; i < itemsLength; i++) {
      items.children[i].className = "list_nav";
    }
    for (let j = 0; j < boxsLength; j++) {
      boxs[j].className = "productInfo";
    }
  }

  function goIndexI() {
    clearCurrentI();
    items.children[indexi].className = "list_nav current_option";
    boxs[indexi].className = "productInfo current";
  }

  items.addEventListener("click", (e) => {
    if (e.target.classList.contains("list_nav")) {
      let itemIndex = e.target.getAttribute("data-index");
      indexi = itemIndex;
      goIndexI();
    }
  });
});

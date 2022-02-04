document.addEventListener("DOMContentLoaded", () => {
  // 存mescroll的数组对象
  var mescrollArr = [];
  // 当前菜单的下标
  var curNavIndex = 0;
  // 初始化第一个菜单，也就是第一个mescroll
  mescrollArr[curNavIndex] = initMescroll(curNavIndex);
  const bottomArrow = document.querySelector(".bottom-arrow");
  const hiddenNav = document.querySelector(".hidden-nav");
  const returnTop = document.querySelector(".return-top");
  const appPromotion = document.querySelector(".app-promotion");

  document.querySelector("html").style.fontSize = (window.screen.width / 640) * 100 + "px";

  function initMescroll(index) {
    var mescroll = new MeScroll("mescroll" + index, {});
    return mescroll;
  }

  var swiper = new Swiper("#swiper", {
    speed: 200,
    onTransitionEnd: function (swiper) {
      var i = swiper.activeIndex;
      changePage(i);
    },
  });

  var swiperSlides = new Swiper(".swiper-container1", {
    loop: true,
    //autoplay:1500,
    width: window.innerWidth,
    // 如果需要分页器
    pagination: ".swiper-pagination",
  });

  function changePage(i) {
    if (curNavIndex != i) {
      // 改变菜单状态
      var curNavDom;
      $("#nav li").each(function (n, dom) {
        if (dom.getAttribute("i") == i) {
          dom.classList.add("active");
          curNavDom = dom;
        } else {
          dom.classList.remove("active");
        }
      });
      $(".hidden-nav ul li").each(function (n, dom) {
        if (dom.getAttribute("i") == i) {
          dom.classList.add("active");
        } else {
          dom.classList.remove("active");
        }
      });
      // 居中动画效果
      var scrollxContent = document.getElementById("scrollxContent");
      var star = scrollxContent.scrollLeft; //当前位置
      var end = curNavDom.offsetLeft + curNavDom.clientWidth / 2 - document.body.clientWidth / 2; //居中
      mescrollArr[curNavIndex].getStep(star, end, function (step, timer) {
        scrollxContent.scrollLeft = step; //从当前位置逐渐移动到中间位置,默认时长300ms
      });
      //隐藏当前回到顶部按钮
      mescrollArr[curNavIndex].hideTopBtn();

      // 初始化新的mescroll，如果已经初始化过，那就不用初始化了，直接显示
      if (mescrollArr[i] == null) {
        mescrollArr[i] = initMescroll(i);
      } else {
        //检查是否需要显示回到到顶按钮
        var curMescroll = mescrollArr[i];
        var curScrollTop = curMescroll.getScrollTop();
        if (curScrollTop >= curMescroll.optUp.toTop.offset) {
          curMescroll.showTopBtn();
        } else {
          curMescroll.hideTopBtn();
        }
      }
      // 更新当前mescroll的索引
      curNavIndex = i;
    }
  }

  function scrollSmoothTo(position) {
    let scrollTop = document.documentElement.scrollTop;
    let step = function () {
      let distance = position - scrollTop;
      scrollTop = scrollTop + distance / 5;
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, position);
      } else {
        window.scrollTo(0, scrollTop);
        requestAnimationFrame(step);
      }
    };
    step();
  }

  document.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;

    if (scrollTop >= 700) {
      returnTop.classList.add("active");
    } else if (scrollTop < 700) {
      returnTop.classList.remove("active");
    }
  });

  returnTop.addEventListener("click", () => {
    scrollSmoothTo(0);
  });

  appPromotion.addEventListener("click", () => {});

  $("#nav li").on("click", function () {
    var i = Number($(this).attr("i"));
    swiper.slideTo(i);
  });

  bottomArrow.addEventListener("click", () => {
    bottomArrow.classList.toggle("anti");
    hiddenNav.classList.toggle("active");
  });

  $(".hidden-nav ul li").click(function () {
    var i = Number($(this).attr("i"));
    swiper.slideTo(i);
    bottomArrow.classList.toggle("anti");
    hiddenNav.classList.toggle("active");
  });
});

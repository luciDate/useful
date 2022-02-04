<template>
  <div class="ebook">
    <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>

      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar
      ref="menuBar"
      :ifTitleAndMenuShow="ifTitleAndMenuShow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      :navigation="navigation"
      @jumpTo="jumpTo"
    ></menu-bar>
  </div>
</template>

<script>
import Epub from "epubjs";
import TitleBar from "./components/TitleBar.vue";
import MenuBar from "./components/MenuBar.vue";
const DOWNLOAD_URL = "/static/2018_Book_AgileProcessesInSoftwareEngine.epub";
// ePub is not defined
// 依赖中有一个contentsjs引用Epub，我们把这个变量设置为全局变量
global.ePub = Epub;
export default {
  components: { TitleBar, MenuBar },
  data() {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 },
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: { color: "#000", background: "#fff" },
          },
        },
        {
          name: "eye",
          style: {
            body: { color: "#000", background: "#ceeaba" },
          },
        },
        {
          name: "night",
          style: {
            body: { color: "#fff", background: "#000" },
          },
        },
        {
          name: "gold",
          style: {
            body: { color: "#000", background: "rgb(241,236,226)" },
          },
        },
      ],
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {}
    };
  },
  methods: {
    jumpTo(href) {
      this.rendition.display(href);
      this.hiddenTitleAndMenu();
    },
    hiddenTitleAndMenu(){
      this.ifTitleAndMenuShow = false;
      this.$refs.menuBar.hiddenSetting();
      this.$refs.menuBar.hiddenContent();
    },
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    showEpub() {
      this.book = new Epub(DOWNLOAD_URL);
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      this.rendition.display();
      this.themes = this.rendition.themes;
      this.setFontSize(this.defaultFontSize);
      this.registerTheme();
      this.setTheme(this.defaultTheme);
      this.book.ready
        .then(() => {
          this.navigation = this.book.navigation;
          return this.book.locations.generate();
        })
        .then((result) => {
          // 电子书进度条生成之后
          this.locations = this.book.locations;
          this.bookAvailable = true;
        });
    },
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    registerTheme() {
      this.themeList.forEach((theme) => {
        this.themes.register(theme.name, theme.style);
      });
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
      if (!this.ifTitleAndMenuShow) this.$refs.menuBar.hiddenSetting();
    },
    prevPage() {
      if (this.rendition) this.rendition.prev();
    },
    nextPage() {
      if (this.rendition) this.rendition.next();
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) this.themes.fontSize(fontSize + "px");
    },
  },
  mounted() {
    this.showEpub();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
<template>
  <div class="clear-fix over-f">
    <Breadcrumb></Breadcrumb>
    <div class="aza-admin-bar clear-fix over-f">
      <div class="aza-admin-bar-l float-l">
        <div class="aza-admin-avatar"></div>
      </div>
      <div class="aza-admin-bar-m float-l">
        <div class="m-wrapper">
          <h1 style="font-weight:400;font-size:18px">{{ timeFix }}，管理员，{{ welcomeFix }}</h1>
          <div class="aza-admin-status">
            <ul class="clear-fix over-f">
              <li class="float-l">前端工程师</li>
              <li class="float-l">facebook - 某某事业群</li>
              <li class="float-l">Vue 平台</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="aza-admin-bar-r float-r">
        <div class="r-wrapper">
          <ul class="clear-fix over-f">
            <li class="float-l">
              <div class="info-wrapper">
                <p>项目数</p>
                <p>56</p>
              </div>
            </li>
            <li class="float-l">
              <div class="info-wrapper">
                <p>团队排名</p>
                <p>5 / 30</p>
              </div>
            </li>
            <li class="float-l">
              <div class="info-wrapper">
                <p>项目访问</p>
                <p>6,233</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="aza-admin-l-wrapper float-l">
      <div class="project">
        <Title>
          <template v-slot:info>
            <h1 style="width:150px;float:left">进行中的项目</h1>
          </template>
          <template v-slot:infoRemix>
            <span style="font-size:12px;float:right;margin-top:3px;color:#ff0000">全部项目</span>
          </template>
        </Title>
        <ul class="item-wrapper">
          <li class="item">
            <div class="title">
              <svg class="icon" aria-hidden="true" style="font-size:32px;">
                <use xlink:href="#icon-zhifubao"></use>
              </svg>
              <span>Alipay</span>
            </div>
          </li>
          <li class="item">
            <div class="title">
              <svg class="icon" aria-hidden="true" style="font-size:32px;">
                <use xlink:href="#icon-Angular"></use>
              </svg>
              <span>Angular</span>
            </div>
          </li>
          <li class="item">
            <div class="title">
              <svg class="icon" aria-hidden="true" style="font-size:32px;">
                <use xlink:href="#icon-react"></use>
              </svg>
              <span>React</span>
            </div>
          </li>
          <li class="item">
            <div class="title">
              <svg class="icon" aria-hidden="true" style="font-size:32px;">
                <use xlink:href="#icon-Vue"></use>
              </svg>
              <span>Vue</span>
            </div>
          </li>
          <li class="item">
            <div class="title">
              <svg class="icon" aria-hidden="true" style="font-size:32px;">
                <use xlink:href="#icon-bootstrap"></use>
              </svg>
              <span>Bootstrap</span>
            </div>
          </li>
          <li class="item">
            <div class="title">
              <svg class="icon" aria-hidden="true" style="font-size:32px;font-weight:300px">
                <use xlink:href="#icon-xiaochengxu"></use>
              </svg>
              <span>Wechat</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="actions">
        <Title>
          <template v-slot:info>
            <h1 style="width:150px;float:left">动态</h1>
          </template>
        </Title>
        <ul class="actions-wrapper">
          <li class="item">
            <div class="avatar">
              <a-icon type="user" style="font-size:24px"></a-icon>
            </div>
            <div class="info">
              <span>Linus 在 <span style="color:rgb(255, 86, 86)">白鹭工作组</span> 更新了计划</span>
              <span style="color:rgba(0, 0, 0, 0.25);">2020-08-10</span>
            </div>
          </li>
          <li class="item">
            <div class="avatar">
              <a-icon type="user" style="font-size:24px"></a-icon>
            </div>
            <div class="info">
              <span>老王 在 <span style="color:rgb(255, 86, 86)">小程序工作组</span> 更新了计划</span>
              <span style="color:rgba(0, 0, 0, 0.25);">2020-08-10</span>
            </div>
          </li>
          <li class="item">
            <div class="avatar">
              <a-icon type="user" style="font-size:24px"></a-icon>
            </div>
            <div class="info">
              <span>蓝猫 在 <span style="color:rgb(255, 86, 86)">Vue工作组</span> 更新了计划</span>
              <span style="color:rgba(0, 0, 0, 0.25);">2020-08-10</span>
            </div>
          </li>
          <li class="item">
            <div class="avatar">
              <a-icon type="user" style="font-size:24px"></a-icon>
            </div>
            <div class="info">
              <span>淘气 在 <span style="color:rgb(255, 86, 86)">支付宝工作组</span> 更新了计划</span>
              <span style="color:rgba(0, 0, 0, 0.25);">2020-08-10</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="aza-admin-r-wrapper float-r">
      <div class="handle">
        <Title>
          <template v-slot:info>
            <h1 style="width:150px;float:left">快速开始 / 便捷导航</h1>
          </template>
        </Title>
        <ul class="info">
          <li class="item">操作一</li>
          <li class="item">操作二</li>
          <li class="item">操作三</li>
          <li class="item">操作四</li>
          <li class="item">操作五</li>
          <li class="item">操作六</li>
          <li class="item" style="color:rgb(0, 230, 0)">
            <span>操作添加</span>
          </li>
        </ul>
      </div>
      <div class="chart"></div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb/index.vue'
import Title from '../../components/Title/index'

export default {
  components: { Breadcrumb, Title },
  data() {
    return {}
  },
  computed: {
    timeFix() {
      const time = new Date()
      const hour = time.getHours()
      return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
    },
    welcomeFix() {
      const arr = ['数据都准备好了', '文档都整理好了吗', '今天写什么日志呢']
      let index = Math.floor(Math.random() * arr.length)
      return arr[index]
    }
  }
}
</script>

<style>
.aza-admin-bar {
  width: 100%;
  height: 120px;
  background: #fff;
  margin: 10px 0 0 0;
}
.aza-admin-bar > .aza-admin-bar-l {
  width: 100px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.aza-admin-bar > .aza-admin-bar-l > .aza-admin-avatar {
  width: 90px;
  height: 90px;
  border: solid 1px #d9d9d9;
  border-radius: 50%;
  background: url(~@/assets/robot.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.15);
}
.aza-admin-bar > .aza-admin-bar-m {
  width: 400px;
  height: 120px;
  margin-left: 20px;
}
.aza-admin-bar > .aza-admin-bar-m > .m-wrapper {
  margin-top: 25px;
}
.aza-admin-bar > .aza-admin-bar-m > .m-wrapper > .aza-admin-status {
  margin-top: 10px;
}
.aza-admin-bar > .aza-admin-bar-m > .m-wrapper > .aza-admin-status > ul > li {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
}
.aza-admin-bar > .aza-admin-bar-m > .m-wrapper > .aza-admin-status > ul > li:not(:last-child):after {
  content: '';
  display: inline-block;
  width: 1px;
  height: 10px;
  background: #d9d9d9;
  vertical-align: middle;
  margin: -5px 10px 0 10px;
}
.aza-admin-bar > .aza-admin-bar-r {
  width: 350px;
  height: 120px;
}
.aza-admin-bar > .aza-admin-bar-r > .r-wrapper ul > li {
  width: 110px;
  height: 120px;
  text-align: center;
  position: relative;
}
.aza-admin-bar > .aza-admin-bar-r > .r-wrapper ul > li > .info-wrapper {
  margin-top: 30px;
}
.aza-admin-bar > .aza-admin-bar-r > .r-wrapper ul > li > .info-wrapper > p:nth-child(1) {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
}
.aza-admin-bar > .aza-admin-bar-r > .r-wrapper ul > li > .info-wrapper > p:nth-child(2) {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 400px;
}
.aza-admin-bar > .aza-admin-bar-r > .r-wrapper ul > li:not(:last-child):after {
  content: '';
  display: inline-block;
  width: 1px;
  height: 40px;
  background: #d9d9d9;
  position: absolute;
  right: 0;
  top: 34px;
}
.aza-admin-l-wrapper {
  margin: 10px 0 0 0;
  width: 60%;
}
.aza-admin-l-wrapper > .project {
  width: 100%;
  height: 250px;
  background: #fff;
}
.aza-admin-l-wrapper > .project > .item-wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
}
.aza-admin-l-wrapper > .project > .item-wrapper > .item {
  flex: 0 0 33.3333333%;
  padding: 10px 10px 0 10px;
}
.aza-admin-l-wrapper > .project > .item-wrapper > .item > .title {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}
.aza-admin-l-wrapper > .project > .item-wrapper > .item > .title > span {
  margin-left: 13px;
  font-size: 14px;
}
.aza-admin-l-wrapper > .project > .item-wrapper > .item:nth-child(1),
.aza-admin-l-wrapper > .project > .item-wrapper > .item:nth-child(2),
.aza-admin-l-wrapper > .project > .item-wrapper > .item:nth-child(3) {
  border-bottom: solid 1px #d9d9d9;
}
.aza-admin-l-wrapper > .project > .item-wrapper > .item:nth-child(1),
.aza-admin-l-wrapper > .project > .item-wrapper > .item:nth-child(2),
.aza-admin-l-wrapper > .project > .item-wrapper > .item:nth-child(4),
.aza-admin-l-wrapper > .project > .item-wrapper > .item:nth-child(5) {
  border-right: solid 1px #d9d9d9;
}
.aza-admin-l-wrapper > .actions {
  width: 100%;
  height: 300px;
  margin: 10px 0 0 0;
  background: #fff;
}
.aza-admin-l-wrapper > .actions > .actions-wrapper {
  width: 100%;
  height: 250px;
}
.aza-admin-l-wrapper > .actions > .actions-wrapper > .item {
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  padding: 0 15px 0 15px;
  position: relative;
}
.aza-admin-l-wrapper > .actions > .actions-wrapper > .item:not(:last-child)::after {
  content: '';
  width: 95%;
  height: 1px;
  position: absolute;
  background: #d9d9d9;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}
.aza-admin-l-wrapper > .actions > .actions-wrapper > .item > .avatar {
  width: 30px;
  height: 30px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.15);
}
.aza-admin-l-wrapper > .actions > .actions-wrapper > .item > .info {
  width: 100%;
  height: 20px;
  margin: 0 0 0 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.aza-admin-r-wrapper {
  width: 39%;
  margin: 10px 0 0 0;
}
.aza-admin-r-wrapper > .handle {
  width: 100%;
  height: 150px;
  background: #fff;
}
.aza-admin-r-wrapper > .handle .info {
  display: flex;
  flex-flow: row wrap;
  padding: 10px 10px;
  width: 100%;
  height: 100px;
  position: relative;
}
.aza-admin-r-wrapper > .handle .info > .item {
  flex: 0 0 25%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.aza-admin-r-wrapper > .handle .info > .item > span {
  width: 70px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(0, 230, 0);
}
.aza-admin-r-wrapper > .chart {
  width: 100%;
  height: 400px;
  background: #fff;
  margin: 10px 0 0 0;
}
</style>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo">
        <img :src="Logo" alt="" />
        <div class="logo-info">Aza Design</div>
      </div>
      <div class="form-bar-top">
        <div :class="['item', { active: currentTab === 'Normal' }]" @click="currentTab = 'Normal'">账号密码登录</div>
        <div :class="['item', { active: currentTab === 'Phone' }]" @click="currentTab = 'Phone'">手机登录</div>
      </div>
      <component :is="fixedInput"></component>
      <div class="form-bar-bottom">
        <div class="item">
          其他登录方式：
          <svg
            class="icon"
            aria-hidden="true"
            style="color:rgba(0, 0, 0, 0.25);font-size:22px;margin:0 7px 0 0;cursor:pointer"
          >
            <use xlink:href="#icon-zhifubao1"></use>
            <title>支付宝</title>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            style="color:rgba(0, 0, 0, 0.25);font-size:22px;margin:0 7px 0 0;cursor:pointer"
          >
            <use xlink:href="#icon-taobao1"></use>
            <title>淘宝</title>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            style="color:rgba(0, 0, 0, 0.25);font-size:22px;margin:0 7px 0 0;cursor:pointer"
          >
            <use xlink:href="#icon-weibo2"></use>
            <title>微博</title>
          </svg>
        </div>
        <div class="item" style="color: #1890ff;">注册账户</div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../../assets/logo.png'
import tabNormal from './normal'
import tabPhone from './phone'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    tabNormal,
    // eslint-disable-next-line vue/no-unused-components
    tabPhone
  },
  data() {
    return {
      Logo,
      currentTab: 'Normal'
    }
  },
  computed: {
    fixedInput() {
      return 'tab' + this.currentTab
    }
  }
}
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100%;
}
.login-container > .login-box {
  width: 500px;
  height: 450px;
  border-color: rgba(223, 225, 229, 0);
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -225px 0 0 -250px;
}
.login-container > .login-box > .login-logo {
  margin: 30px 0 0 0;
  display: flex;
  justify-content: center;
}
.login-container > .login-box > .login-logo img {
  width: 56px;
  height: 56px;
}
.login-container > .login-box > .login-logo > .logo-info {
  width: 120px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin: 0 0 0 5px;
  font-weight: 800;
}
.login-container > .login-box > .form-bar-top {
  height: 55px;
  margin: 15px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container > .login-box > .form-bar-top > .item {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}
.login-container > .login-box > .form-bar-top > .item:nth-child(1) {
  margin-right: 50px;
}
.login-container > .login-box > .form-bar-top > .item.active {
  color: #1890ff;
  border-bottom: 1px solid #1890ff;
}
.login-container > .login-box > .form-bar-bottom {
  display: flex;
  margin: 10px 0 0 0;
  font-size: 14px;
  justify-content: space-between;
  padding: 0 26px 0 26px;
}
.login-container > .login-box > .form-bar-bottom > .item > .icon:hover {
  color: #1890ff !important;
}
</style>

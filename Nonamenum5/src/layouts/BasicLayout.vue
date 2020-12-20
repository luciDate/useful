<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]" style="clear: both">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        v-model="collapsed"
        :trigger="null"
        collapsible
        width="260"
        collapsedWidth="100"
        :style="{ height: '100vh', position: 'fixed', left: 0 }"
      >
        <div :class="collapsed ? 'logo' : 'logo active'">
          <img class="aza-menu-logo" :src="Logo" alt="" />
          <span class="aza-menu-logo-info" v-if="collapsed === false">Gore 管理系统</span>
        </div>
        <SiderMenu :theme="navTheme" :collapsed="collapsed"></SiderMenu>
      </a-layout-sider>
      <a-layout
        :style="{ overflowY: 'hidden', padding: '0 0 20px 0', transition: 'margin 0.3s' }"
        :class="collapsed ? 'margin-o' : 'margin-x'"
      >
        <a-layout-header style="background: #fff; padding: 0; clear: both; min-width: 1050px">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Header></Header>
        </a-layout-header>
        <a-layout-content
          :style="{
            padding: '20px 30px 20px 30px',
            background: '#f0f2f5',
            minWidth: '1050px',
            overflow: 'initial'
          }"
        >
          <router-view></router-view>
        </a-layout-content>
        <Footer></Footer>
      </a-layout>
    </a-layout>
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script>
import Header from './Header'
import SiderMenu from './SiderMenu'
import Footer from './Footer'
import SettingDrawer from '../components/SettingDrawer/index.vue'
import Logo from '../assets/logo.png'

export default {
  components: {
    Header,
    SiderMenu,
    Footer,
    SettingDrawer
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    }
  },
  data() {
    return {
      collapsed: false,
      Logo
    }
  }
}
</script>

<style>
.aza-menu-logo {
  width: 32px;
  height: 32px;
  transform: translateY(8px);
}
.aza-menu-logo-info {
  margin-left: 8px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
#components-layout-demo-custom-trigger .logo {
  width: 56px;
  height: 48px;
  line-height: 48px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center;
  overflow: hidden;
  border-radius: 3px;
}
#components-layout-demo-custom-trigger .logo.active {
  width: 200px;
  height: 48px;
  line-height: 48px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px auto;
  text-align: center;
  overflow: hidden;
  border-radius: 3px;
}
.nav-theme-dark #components-layout-demo-custom-trigger .logo.active {
  color: #fff;
}
.nav-theme-light #components-layout-demo-custom-trigger .logo.active {
  background: #032e58;
  color: #fff;
}
.margin-x {
  margin: 0 0 0 260px;
}
.margin-o {
  margin: 0 0 0 100px;
}
</style>

<template>
  <div>
    <div class="normal-container">
      <a-input placeholder="账号" class="item" v-model="name" />
      <a-input-password placeholder="密码" class="item" v-model="password" />
      <a-checkbox class="sign" @change="onChange">
        记录登录信息
      </a-checkbox>
      <a-button type="primary" style="width:450px;margin:20px 0 0 0">提交</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      checked: false
    }
  },
  methods: {
    onChange(e) {
      if (e.target.checked) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  }
}
</script>

<style>
.normal-container {
  display: flex;
  height: 165px;
  flex-direction: column;
  margin: 20px 0 20px 0;
  align-items: center;
  position: relative;
}
.normal-container > .item {
  width: 450px;
  height: 35px;
  margin: 0 0 20px 0;
}
.normal-container > .sign {
  position: absolute;
  left: 28px;
  bottom: 46px;
}
</style>

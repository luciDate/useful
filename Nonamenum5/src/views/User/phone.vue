<template>
  <div>
    <div class="phone-container">
      <a-input placeholder="手机号" class="item" />
      <a-input placeholder="验证码" class="item" />
      <a-button type="primary" style="width:450px;margin:0px 0 0 0">提交</a-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.phone-container {
  display: flex;
  height: 165px;
  flex-direction: column;
  margin: 20px 0 10px 0;
  align-items: center;
  position: relative;
}
.phone-container > .item {
  width: 450px;
  height: 35px;
  margin: 0 0 20px 0;
}
</style>

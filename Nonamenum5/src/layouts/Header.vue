<template>
  <div class="header clear-fix over-f">
    <ul>
      <li class="float-l aza-header-item"><a-icon type="question-circle" class="aza-header-icon-item" /></li>
      <li class="float-l aza-header-item"><a-icon type="global" class="aza-header-icon-item" /></li>
      <li class="float-l aza-header-item"><a-icon type="fullscreen" class="aza-header-icon-item" /></li>
      <li class="float-l aza-header-item"><a-icon type="bell" class="aza-header-icon-item" /></li>
      <li class="float-l aza-header-item"><span class="aza-header-avatar"></span></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style>
.header {
  float: right;
  margin-right: 20px;
}
.aza-header-item {
  margin-left: 18px;
}
.aza-header-icon-item {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}
.aza-header-icon-item:hover {
  color: #1890ff;
}
.aza-header-avatar {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: solid 1px #dddddd;
  border-radius: 50%;
  transform: translateY(10px);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}
</style>

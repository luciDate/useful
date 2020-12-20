<template>
  <div class="title clear-fix over-f">
    <slot name="info" class="test"></slot>
    <slot name="infoRemix"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.title {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
  padding: 0px 10px 10px 10px;
  line-height: 50px;
  font-weight: 400;
}
</style>

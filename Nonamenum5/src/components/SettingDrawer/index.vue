<template>
  <div>
    <a-drawer placement="right" :closable="false" :visible="visible" @close="onClose" width="270px">
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <Radios></Radios>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import Radios from './radios'
export default {
  components: {
    Radios
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onClose() {
      this.visible = false
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } })
    }
  }
}
</script>
<style scoped>
.handle {
  position: absolute;
  top: 300px;
  right: 270px;
  width: 42px;
  height: 42px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 42px;
  border-radius: 5px;
}
</style>

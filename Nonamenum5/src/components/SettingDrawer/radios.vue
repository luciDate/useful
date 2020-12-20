<template>
  <div class="fixed">
    <label for="black" id="lab" title="黑色">
      <div class="block"></div>
      <input type="radio" name="color" ref="dark" id="black" value="dark" @change="e => handleRadio('navTheme', e)" />
    </label>
    <label for="white" id="lab" title="白色">
      <input type="radio" ref="light" name="color" id="white" value="light" @change="e => handleRadio('navTheme', e)" />
    </label>
  </div>
</template>

<script>
export default {
  methods: {
    handleRadio(type, e) {
      this.$router.push({ query: { ...this.$route.query, [type]: e.target.value } })
    }
  },
  mounted() {
    if (!this.$route.query.navTheme || this.$route.query.navTheme === 'dark') {
      console.log('233')
      this.$refs.dark.checked = true
    } else if (this.$route.query.navTheme === 'light') {
      this.$refs.light.checked = true
    }
  }
}
</script>

<style scoped>
.fixed {
  display: flex;
}
#black,
#white {
  cursor: pointer;
  position: relative;
  width: 18px;
  height: 18px;
  font-size: 14px;
  top: 20px;
  left: 20px;
}
#black::after,
#white::after {
  position: absolute;
  top: 0;
  background-color: rgb(236, 236, 236, 0.9);
  color: #1890ff;
  width: 20px;
  height: 20px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: ' ';
  line-height: 20px;
}

#black:checked::after,
#white:checked::after {
  content: '✓';
  font-size: 12px;
  font-weight: bold;
}
#lab {
  margin: 10px 10px 10px 0;
  display: block;
  width: 42px;
  height: 42px;
  position: relative;
  box-shadow: 0 1px 3px 0px rgba(32, 33, 36, 0.28);
  border-color: rgba(223, 225, 229, 0);
}
.block {
  width: 15px;
  height: 42px;
  background: #555555;
  position: absolute;
}
</style>

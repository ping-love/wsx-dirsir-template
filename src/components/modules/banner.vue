<!--
   banner组件
-->
<template>
  <div class="bannerWrap">
    <img :src="imgUrl" alt="" />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    bannerImgurl() {
      return ''
    }
  },
  created() {},
  mounted() {},
  methods: {},
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.bannerWrap {
  width: 100%;
  display: flex;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

<!--
   返回顶部
-->
<template>
  <div class="backTop" ref="backTopRef" @click="toBackTop">
    <span class="iconfont icon-fanhuidingbu"></span>
    <p>顶部</p>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  computed: {},
  created() {
    console.log('返回顶部组件')
  },
  mounted() {
    window.addEventListener('scroll', this.handleSrcroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleSrcroll)
  },
  methods: {
    handleSrcroll(e) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      // console.log(document.documentElement.scrollTop, document.body.scrollTop, window.pageYOffset)
      // console.log('-scrollTop-', scrollTop)
      this.$refs.backTopRef.style.opacity = scrollTop > 900 ? 1 : 0
    },
    toBackTop() {
      this.$refs.backTopRef.style.opacity = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.pageYOffset = 0
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.backTop {
  position: fixed;
  bottom: 36px;
  right: 30px;
  z-index: 9999;
  width: 42px;
  height: 42px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 0.6s ease;
  // transition: bottom 0.6s ease, opacity 0.6s ease;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  opacity: 0;
  .icon-fanhuidingbu {
    font-size: 18px;
    // padding-top: 1px;
  }
  p {
    font-size: 12px;
    color: #333;
  }
  &.setBorderAll:after {
    border-color: rgb(139, 136, 136);
    border-radius: 50%;
  }
}
</style>

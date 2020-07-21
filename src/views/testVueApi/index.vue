<!--
   测试vue api
-->
<template>
  <div class="">
    <headerBar></headerBar>
    <div class="">{{ $log(info) }}</div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
export default {
  name: '',
  data() {
    return {
      info: {
        name: '23423',
        age: 12
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

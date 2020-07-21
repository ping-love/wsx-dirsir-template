<!--
   模块配置组件
-->
<template>
  <div class="moduleItem">
    <search :moduleData="moduleData" v-if="isSearch"></search>
    <commodityFloor :moduleData="moduleData" v-if="isFloor"></commodityFloor>
    <publicList :moduleData="moduleData" :sign="sign" v-if="isList"></publicList>
  </div>
</template>

<script>
import search from './search'
import commodityFloor from './commodityFloor'
import publicList from './publicList'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    sign: {
      type: String | Number,
      required: true
    },
    moduleInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isSearch() {
      return this.moduleInfo.moduleType === 'el-search'
    },
    isFloor() {
      return this.moduleInfo.moduleType === 'el-floor'
    },
    isList() {
      return this.moduleInfo.moduleType === 'el-list'
    },
    moduleData() {
      return this.moduleInfo.moduleData
    }
  },
  created() {},
  mounted() {
    // console.log('模块配置组件', this.moduleInfo)
  },
  methods: {},
  components: { search, commodityFloor, publicList }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

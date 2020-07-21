<!--
   商品楼层
-->
<template>
  <div class="commodityFloor">
    <oneFloor :infoData="itemInfo.moduleData" v-if="isOneFloor"></oneFloor>
    <twoFloor :infoData="itemInfo.moduleData" v-if="isTwoFloor"></twoFloor>
    <threeFloor :infoData="itemInfo.moduleData" v-if="isThreeFloor"></threeFloor>
    <fourFloor :infoData="itemInfo.moduleData" v-if="isFourFloor"></fourFloor>
  </div>
</template>

<script>
import oneFloor from './tianmao/typeOneFloor'
import twoFloor from './tianmao/typeTwoFloor'
import threeFloor from './tianmao/typThreeFloor'
import fourFloor from './tianmao/typeFourFloor'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isSearch() {
      return this.itemInfo.moduleType === 'el-search'
    },
    isSwiper() {
      return this.itemInfo.moduleType === 'el-swiper'
    },
    isOneFloor() {
      return this.itemInfo.moduleType === 'el-oneFloor'
    },
    isTwoFloor() {
      return this.itemInfo.moduleType === 'el-twoFloor'
    },
    isThreeFloor() {
      return this.itemInfo.moduleType === 'el-threeFloor'
    },
    isFourFloor() {
      return this.itemInfo.moduleType === 'el-fourFloor'
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
</style>

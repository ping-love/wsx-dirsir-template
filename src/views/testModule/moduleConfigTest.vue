<!--
   组件测试
-->
<template>
  <div class="mall-home" :style="{ background: bgColor }">
    <div v-for="(item, index) in moduleOptions" :key="index">
      <moduleItem :moduleInfo="item" :sign="index"></moduleItem>
    </div>
  </div>
</template>

<script>
import moduleItem from '@/components/modules/moduleItem'
import Data from '@/data/home'
export default {
  name: 'MallHome',
  data() {
    return {
      bgColor: '#f4f4f4',
      moduleOptions: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      let { setFloorOneData, setFloorTwoData, setFloorThreeData, setFloorFourData, setListOneData } = Data
      setTimeout(() => {
        this.moduleOptions = [
          setFloorOneData('1', 1),
          setFloorTwoData('2', 2),
          setFloorThreeData('3', 3),
          setFloorFourData('4', 4),
          setListOneData('5', 6, false)
        ]
        console.log('-moduleOptions-', this.moduleOptions)
      }, 1000)
    }
  },
  components: { moduleItem }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.mall-home {
  overflow-y: auto;
}
</style>

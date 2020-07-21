<!--
   商城首页
-->
<template>
  <div class="mall-home">
    <!-- <div class="moduleItem" v-for="(item, index) in moduleOptions" :key="index">
      <moduleItem :moduleInfo="item" :sign="index"></moduleItem>
    </div> -->
    <div class="moduleWrap" :style="{ background: bgColor }">
      <div class="moduleItem" v-for="(item, index) in moduleOptions" :key="index">
        <moduleItem :moduleInfo="item" :sign="index"></moduleItem>
      </div>
    </div>
    <backTop></backTop>
  </div>
</template>

<script>
import Data from '@/data/home'
import Bus from '@/utils/bus'
import moduleItem from '@/components/modules/moduleItem'
import backTop from '@/components/backTop'
export default {
  name: 'MallHome',
  data() {
    return {
      bgColor: '#f4f4f4',
      moduleOptions: [],
      count: 0 // 记录请求失败次数
    }
  },
  computed: {},
  created() {
    this.getData()
    Bus.$on('loading', data => {
      console.log('触发了事件总线loading', data)
      this.getMoreData(data[1])
    })
  },
  mounted() {},
  methods: {
    // 加载更多
    getMoreData(index) {
      console.log('-index-', index)
      this.count++
      setTimeout(() => {
        console.log('-moduleOptions-', this.moduleOptions)
        let { moduleData } = this.moduleOptions[index]
        // console.log(moduleData)
        if (this.count > 1) {
          moduleData.list = [...moduleData.list, ...this.setData(moduleData.pageSize)]
          // console.log('-list-', moduleData.list)
        } else {
          try {
            let errLoading = new Error()
            errLoading()
          } catch (err) {
            console.log('-ERR-', err)
            moduleData.isMoreError = true
            // moduleData = Object.assign({}, moduleData, { isMoreError: true })
            // console.log(moduleData)
          }
        }
      }, 1000)
    },
    getData() {
      let { setFloorOneData, setFloorTwoData, setFloorThreeData, setFloorFourData, setListOneData } = Data
      setTimeout(() => {
        this.moduleOptions = [
          setFloorTwoData('1', 4),
          setListOneData('2', 7, false),
          setFloorThreeData('3', 3),
          setListOneData('4', 6, false),
          setFloorFourData('5', 3),
          setListOneData('6', 6, false),

          setFloorThreeData('7', 3),
          setListOneData('8', 6, false),
          setFloorFourData('9', 3),
          setListOneData('10', 6, false),

          setFloorOneData('11', 3),
          setListOneData('10', 6)
        ]
        console.log('-moduleOptions-', this.moduleOptions)
      }, 1000)
    },
    setData(pageSize) {
      let data = {
        goodsId: '79798',
        ranking: '1',
        imgUrl:
          'https://t00img.yangkeduo.com/goods/images/2020-04-13/ad8b7352-aa56-4bfc-914f-120a179ab1ea.jpg?imageMogr2/sharpen/50%7CimageView2/2/w/312/q/80/format/webp',
        tags: ['标签一', '标签二'],
        currentPrice: '136.00',
        originalPrice: '230.00',
        desc: '说明描述。。。',
        title: '商品标题商品标题商品标题商品标题'
      }
      let midArr = []
      for (let i = 0; i < pageSize; i++) {
        let mid = { ...data }
        // console.log(mid)
        // mid.ranking = i + 1
        midArr.push(mid)
      }
      return midArr
    }
  },
  components: { moduleItem, backTop }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.mall-home {
  .moduleWrap {
    height: auto;
    // overflow: auto;
  }
}
</style>

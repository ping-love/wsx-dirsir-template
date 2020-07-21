<!--
   瀑布流list
-->
<template>
  <div class="page">
    <headerBar></headerBar>
    <div class="main">
      <waterFall :list="imgList" :waterfallCol="2" @loadMore="handleLoadMore" :total="total"></waterFall>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import waterFall from '@/components/waterFall'
export default {
  name: '',
  data() {
    return {
      pageNo: 0,
      pageSize: 10,
      total: 0,
      imgList: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {
    // 1、计算item宽度，初始化各列高度数组
    // 2、图片预加载，获取图片的宽高
    // 3、计算图片的偏移量
  },
  methods: {
    handleLoadMore() {
      this.getMoreData()
    },
    getMoreData() {
      setTimeout(() => {
        console.log(111)
        let imgArr = [
          'https://iph.href.lu/100x70',
          'https://iph.href.lu/100x80',
          'https://iph.href.lu/100x90',
          'https://iph.href.lu/100x100',
          'https://iph.href.lu/100x120',
          'https://iph.href.lu/100x150',
          'https://iph.href.lu/100x210',
          'https://iph.href.lu/100x230',
          'https://iph.href.lu/100x250'
        ]
        let result = []
        for (let i = 0; i < 10; i++) {
          result.push(imgArr[Math.round(Math.random() * 8)])
        }
        this.imgList = [...this.imgList, ...result]
      }, 1000)
    },
    getData() {
      setTimeout(() => {
        let imgArr = [
          'https://iph.href.lu/100x70',
          'https://iph.href.lu/100x80',
          'https://iph.href.lu/100x90',
          'https://iph.href.lu/100x100',
          'https://iph.href.lu/100x120',
          'https://iph.href.lu/100x150',
          'https://iph.href.lu/100x210',
          'https://iph.href.lu/100x230',
          'https://iph.href.lu/100x250'
        ]
        let result = []
        for (let i = 0; i < 10; i++) {
          result.push(imgArr[Math.round(Math.random() * 8)])
        }
        this.imgList = [...result]
        this.total = 31
      }, 1000)
    }
  },
  components: { headerBar, waterFall }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

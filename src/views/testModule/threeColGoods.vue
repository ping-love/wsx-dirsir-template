<!--
   三列商品
-->
<template>
  <div class="singleGoods">
    <headerBar></headerBar>
    <threeColGoodsComp
      :titleImg="titleImgUrl"
      :isInfiniteLoading="isInfiniteLoading"
      :totalCount="totalCount"
      :list="goodsList"
      offset="30"
      :isMoreError.sync="isMoreError"
      @loading="handleLoading"
    ></threeColGoodsComp>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import threeColGoodsComp from '@/components/modules/threeColGoodsComp'
export default {
  name: '',
  data() {
    return {
      titleImgUrl: 'https://iph.href.lu/375x80',

      isInfiniteLoading: true,
      pageNo: 0,
      pageSize: 10,
      totalCount: 0,
      goodsList: [],
      isMoreError: false,
      count: 0
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    handleLoading(data) {
      console.log('-loading-', data)
      this.getMoreData()
    },
    // 获取更多
    getMoreData() {
      this.count++
      console.log(this.count)
      setTimeout(() => {
        if (this.count > 1) {
          this.goodsList = [...this.goodsList, ...this.setData()]
          console.log(this.goodsList)
        } else {
          try {
            let errLoading = new Error()
            errLoading()
          } catch (err) {
            console.log('-ERR-', err)
            this.isMoreError = true
          }
        }
        // this.goodsList = [...this.goodsList, ...this.setData()]
        // console.log(this.goodsList)
      }, 1000)
    },
    // 获取初始数据
    getData() {
      let recommendList = [
        {
          goodsId: '79798',
          ranking: '',
          isRecommend: true,
          imgUrl: 'https://iph.href.lu/170x170',
          tags: ['标签一', '标签二'],
          currentPrice: '136.00',
          originalPrice: '230.00',
          desc: '说明描述。。。',
          title: '商品标题商品标题商品标题商品标题商品标题商品标题'
        }
      ]
      let totalCount = 20
      this.totalCount = totalCount
      this.goodsList = [...recommendList, ...this.setData()]
      // console.log(this.goodsList)
    },
    setData() {
      let data = [
        {
          goodsId: '79798',
          ranking: '1',
          imgUrl: 'https://iph.href.lu/170x170',
          // tags: ['标签一', '标签二'],
          currentPrice: '136.00',
          originalPrice: '230.00',
          desc: '说明描述。。。',
          title: '商品标题商品标题商品标题商品标题商品标题商品标题'
        }
      ]
      let midArr = []
      for (let i = 0; i < this.pageSize; i++) {
        let mid = { ...data[0] }
        // console.log(mid)
        mid.ranking = i + 1
        midArr.push(mid)
      }
      return midArr
    }
  },
  components: { headerBar, threeColGoodsComp }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

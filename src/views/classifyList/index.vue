<!--

-->
<template>
  <div class="classifyList">
    <div class="main">
      <van-list
        class="itemContent"
        v-model="isMoreLoading"
        :finished="isMoreFinished"
        :error.sync="isMoreError"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        :offset="offset"
        :immediate-check="false"
        @load="handleLoad"
      >
        <div class="item" v-for="(item, index) in currentList" :key="index">
          <img :src="item" alt="" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      offset: 30,
      currentList: [] // 当前页list
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    handleLoad() {
      let placeholderEl = document.querySelector('.van-list__placeholder').getBoundingClientRect()
      console.log(111, placeholderEl)
      this.getMoreData()
    },
    getMoreData() {
      setTimeout(() => {
        this.isMoreLoading = false
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
        this.currentList = [...this.currentList, ...result]
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
        this.currentList = [...result]
        this.total = 31
      }, 1000)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.classifyList {
  .main {
    .itemContent {
      display: flex;
      flex-wrap: wrap;
      // overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .item {
        width: 50%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

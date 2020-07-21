<!--
   分类组件
-->
<template>
  <div class="classifyModule">
    <headerBar background="#ffd347"></headerBar>
    <div class="main">
      <navClassify
        componentName="homeItemList"
        :offset="300"
        :isSlide="true"
        :tabsArray="tabList"
        :list="currentList"
        :total="total"
        :isError.sync="isError"
        @tabChange="handleTabChange"
        @loadMore="handleLoadMore"
      ></navClassify>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import navClassify from '@/components/navClassify'
import api from '@/api'
import Data from '@/data/classify'
export default {
  name: '',
  data() {
    return {
      activeIdx: 0,
      pageNo: 0, // 页码
      pageSize: 10, // 每页条数
      tabList: [],
      currentList: [],
      totalData: [],
      count: 0,
      isError: false,
      total: 0
    }
  },
  computed: {},
  created() {
    this.$loading.show()
    this.getTabsData()
  },
  mounted() {
    // setTimeout(() => {
    //   this.setTabsConHeight()
    // }, 500)
  },
  methods: {
    handleTabChange(data) {
      console.log(data)
      this.getData(data[0])
    },
    handleLoadMore(data) {
      console.log('加载下一页', data)
      this.getMoreData(data)
    },
    getTabsData() {
      setTimeout(() => {
        this.$loading.hide()

        this.tabList = Data.getClassifyTitles()
        console.log('-tab-list-', this.tabList)
        this.getData()
      }, 1000)
    },
    getData(type = 0) {
      this.pageNo = 0
      this.isError = false
      let currentObj = this.totalData[type]
      console.log(currentObj)
      if (currentObj) {
        this.currentList = currentObj.list
        this.total = currentObj.totalCount
        console.log(
          '已经浏览过的分类，第一页数据不再重新请求',
          '-total-',
          this.total,
          '-current-list-',
          this.currentList,
          '-total-data-',
          this.totalData
        )
        return
      }
      this.currentList = []
      this.initListData(this.tabList[type].type)
    },
    initListData(type) {
      console.log('第一次查看当前类别', '-type-', type)
      let list = Data.getMoreData(this.pageSize, type)
      this.currentList = type % 2 === 1 ? list : []
      // this.currentList = list
      this.totalData[type] = {
        totalCount: 30,
        isNextPage: true,
        isMoreError: false,
        list
      }
      this.pageNo++
      // this.totalData[type].totalCount = type % 2 === 1 ? 30 : 20
      this.totalData[type].list = type % 2 === 1 ? this.totalData[type].list : []

      this.total = this.totalData[type].totalCount
      console.log('-total-', this.total, '-current-list-', this.currentList, '-total-data-', this.totalData)
    },
    getMoreData(type) {
      this.count++
      setTimeout(() => {
        if (this.count === 1) {
          try {
            let err = new Error()
            err()
          } catch (err) {
            console.log(err, this.totalData[type])
            this.isError = true
          }
        } else {
          const params = {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
          console.log('-pageNo-', this.pageNo, '-pageSize-', this.pageSize)
          this.currentList = [...this.currentList, ...Data.getMoreData(this.pageSize, type)]
          this.pageNo++
        }
      }, 1000)
    },

    // 设置tab商品列表最低高度
    setTabsConHeight() {
      this.$nextTick(() => {
        const contentEle = document.querySelector('.mainWrap')
        // const contentEle = document.querySelector('.van-pull-refresh')
        const tabsContentEle = document.querySelector('.van-tabs__content')
        const tabsHeight = (window.innerWidth / 375) * 40
        tabsContentEle.style.minHeight = contentEle.offsetHeight - tabsHeight + 'px'
      })
    }
  },
  components: { headerBar, navClassify }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.classifyModule {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main {
    flex: 1;
    background: #f5f5f5;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

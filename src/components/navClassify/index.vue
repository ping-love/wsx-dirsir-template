<!--
   导航分类
-->
<template>
  <div class="xx-nav-classify">
    <div class="classifyWrap">
      <van-tabs
        v-model="activeIdx"
        :swipe-threshold="4"
        :swipeable="isSlide"
        background="#fff"
        title-active-color="rgba(0,0,0,1)"
        title-inactive-color="rgba(0,0,0,0.6)"
        :line-width="30 / remBase + 'rem'"
        :line-height="3 / remBase + 'rem'"
        @change="onTabsChange"
      >
        <van-tab v-for="(tabItem, index) in tabsArray" :key="index" :title="tabItem.titleName" :name="index">
          <van-list
            class="goodsList"
            v-model="isMoreLoading"
            :finished="isMoreFinished"
            :error.sync="isMoreError"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            :offset="offset"
            :immediate-check="false"
            @load="handleLoad"
            v-show="!isNotData"
          >
            <!-- <homeItemList :list="list"></homeItemList> -->
            <component :is="componentName" :list="list"></component>
          </van-list>

          <noData v-show="isNotData"></noData>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import homeItemList from './demoItemList'
import noData from '@/components/viewComp/noData'
export default {
  name: '',
  data() {
    return {
      remBase: '37.5',
      activeIdx: 0, // 激活的当前tabIdx
      lastActiveIdx: null,
      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      isNotData: false
    }
  },
  props: {
    // 是否滑动切换，默认为true
    isSlide: {
      type: Boolean,
      default: true
    },
    // 滚动条距离底部距离小于offset时，触发load事件
    offset: {
      type: Number,
      default: 30
    },
    // itemList组件名
    componentName: {
      type: String,
      required: true
    },
    // 导航
    tabsArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 必填需要搭配.sync使用
    isError: {
      type: Boolean,
      required: true
    },
    // 当前分类数据总长度
    total: {
      type: Number,
      required: true
    }
  },
  watch: {
    isMoreError(newVal, oldVal) {
      console.log(newVal, oldVal)
      if (newVal) {
        this.isMoreLoading = false
      }
    },
    list(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.isMoreLoading = false
      if (newVal.length === 0) {
        this.isNotData = true
      } else {
        this.isNotData = false
      }
      if (newVal.length >= this.total) {
        console.log('list全部加载完成!')
        this.isMoreFinished = true
      }
    }
  },
  computed: {
    // 请求失败为true，默认为false
    isMoreError: {
      get() {
        return this.isError
      },
      set(val) {
        this.$emit('update:isError', val)
      }
    }
  },
  created() {
    console.log('-导航分类组件-')
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.list)
    })
  },
  methods: {
    // 设置scrollTop,切换导航重置scrollTop为零，即初始化滚动条位置
    setScrollTop() {
      // console.log('-scrollTop-', document.querySelector('.xx-nav-classify').scrollTop)
      document.querySelector('.xx-nav-classify').scrollTop = 0
    },
    onTabsChange(name, title) {
      console.log(name, title)
      this.lastActiveIdx = this.activeIdx
      this.setScrollTop()
      this.isMoreFinished = false
      let params = [name, title]
      this.$emit('tabChange', params)
    },
    handleLoad() {
      if (this.isMoreError) {
        this.isError = false
      }
      this.$emit('loadMore', this.activeIdx)
    }
  },
  components: { homeItemList, noData }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.xx-nav-classify {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/deep/ .van-tabs {
  .van-tabs__nav {
    // position: relative;
    // z-index: 999;
    // background: pink;
  }
  .van-tabs__wrap {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .van-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 49px;
    color: #000;
  }
  .van-tabs__line {
    background: #ffd12f;
    bottom: 14px;
  }
}
</style>

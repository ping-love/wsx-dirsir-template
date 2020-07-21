<!--
   list公共组件，只提供除item以外的所有list结构体，
   isHaveNextPage ==> 是否有下一页
-->
<template>
  <div class="listWrap">
    <template v-if="isHaveNextPage">
      <van-list
        class="goodsList"
        v-model="isLoading"
        :finished="isFinished"
        :error.sync="isError"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        :offset="offset"
        :immediate-check="false"
        @load="initLoading"
      >
        <item :list="list"></item>
      </van-list>
    </template>
    <template v-else>
      <div class="goodsList">
        <item :list="list"></item>
      </div>
    </template>
  </div>
</template>

<script>
import Bus from '@/utils/bus'
import item from './item'
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      isFinished: false,
      isError: false
    }
  },
  props: {
    moduleData: {
      type: Object,
      default() {
        return {}
      }
    },
    offset: {
      type: Number | String,
      default: 300
    }
  },
  watch: {
    // moduleData: {
    //   handle(newVal, oldVal) {
    //     console.log('-new-error-', newVal, '-old-error-', oldVal)
    //   },
    //   deep: true
    // },
    // 该属性必须存在，否则不能监听
    isMoreError(newVal, oldVal) {
      console.log('-new-error-', newVal, '-old-error-', oldVal)
      if (newVal) {
        this.isError = true
        this.isLoading = false
      }
    },
    list: {
      handler(newVal, oldVal) {
        console.log('-new-', newVal, 'old', oldVal)
        console.log('单次请求数据加载完成')
        this.isLoading = false
        if (newVal.length >= this.moduleData.totalCount) {
          this.isFinished = true
          console.log('数据全部加载完成')
        }
      }
    }
  },
  computed: {
    // 是否有下一页
    isHaveNextPage() {
      return this.moduleData.isNextPage
    },
    // 请求失败为true, 默认为false
    isMoreError() {
      let isMe = this.moduleData.isMoreError || false
      // console.log(isMe)
      return isMe
    },
    list() {
      console.log(this.moduleData.list)
      return this.moduleData.list
    }
  },
  created() {
    // console.log('这是孙组件')
  },
  mounted() {
    this.$nextTick(() => {
      console.log('-public-list-data-', this.moduleData, this.moduleData.list)
    })
  },
  methods: {
    initLoading() {
      // console.log('-child-isError-', this.isError, '-parent-isMoreError-', this.isMoreError)
      // if (this.moduleData.isMoreError) {
      //   this.$emit('update:isMoreError', false)
      // }
      let path = this.$route.path.slice(1)
      let params = `${path}页面触发了loading加载更多事件`
      this.$emit('loading', params)
    }
  },
  components: { item }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.listWrap {
  margin-bottom: 6px;
}
</style>

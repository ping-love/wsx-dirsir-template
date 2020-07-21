<!--
   搜索框
-->
<template>
  <div class="searchBar">
    <template v-if="isDisabled">
      <div class="searchBox">
        <slot name="left"></slot>
        <van-field class="searchInput" placeholder="请输入搜索名" @click="toSearchPage"></van-field>
        <slot name="right"></slot>
      </div>
    </template>
    <template v-else>
      <div class="searchBox">
        <span class="leftIcon" @click="goBack"></span>
        <div class="centerInput">
          <span class="searchIcon"></span>
          <van-field class="searchInput" v-model="searchVal" placeholder="请输入搜索名" clearable></van-field>
        </div>
        <span class="right" @click="onSearch">搜索</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      searchVal: ''
    }
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    onBack: {
      type: Function
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toSearchPage() {
      this.$router.push({
        path: '/search',
        query: {
          defaultText: '默认的搜索信息'
        }
      })
    },
    goBack() {
      if (this.onBack) {
        this.onBack()
        return
      }
      console.log(this.$route.path)
      if (this.$route.path === '/index') {
        console.log('返回客户端')
        return
      }
      this.$router.go(-1)
    },
    onSearch() {
      this.$emit('search', this.searchVal)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgurl: '~@/assets/images/common/';

@height: 41px;
@bgColor: rgb(219, 216, 216);

.searchBar {
  .searchBox {
    display: flex;
    align-items: center;
    height: @height;
    background: @bgColor;
    .leftIcon {
      // position: absolute;
      // left: 12px;
      // top: 10.5px;
      width: 12px;
      height: 20px;
      background: url('@{imgurl}blackLeftArrow.png') no-repeat center / cover;
      margin: 0 10px;
    }
    .centerInput {
      flex: 1;
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: @height / 2;
      padding-left: 10px;
      .searchIcon {
        width: 20px;
        height: 20px;
        background: url('@{imgurl}searchIcon.png') no-repeat center / cover;
      }
      .searchInput {
      }
    }
    .right {
      line-height: @height;
      padding: 0 10px;
    }
  }
}

/deep/ .van-cell {
  background: #fff;
  border-radius: @height / 2;
  padding: 0 0;
  .van-field__body {
    line-height: 30px;
    padding: 0 6px;
    font-size: 12px;
  }
}
</style>

<!--
   搜索页
-->
<template>
  <div class="search">
    <searchBar @search="handleSearch"></searchBar>
    <div class="main">
      <div class="content lately">
        <div class="top latelyTop">
          <p class="title">最近搜索</p>
          <span class="cartIcon iconfont icon-icon_huabanfuben"></span>
          <!-- <span class="cancelIcon"></span> -->
        </div>
        <ul class="itemBox latelyContent">
          <li class="item" v-for="(item, index) in latelySearchList" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="content find">
        <div class="top findTop">
          <p class="title">搜索发现</p>
          <div class="findTopRight">
            <p>换一换</p>
            <span
              class="changeIcon iconfont icon-huanyihuan1"
              :class="{ iconTransfromClass: isClickChange }"
              @click="onChangeClick"
            ></span>
          </div>
        </div>
        <ul class="itemBox findContent">
          <li class="item" v-for="(item, index) in searchFindList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '@/components/searchBar'
export default {
  name: '',
  data() {
    return {
      // 是否点击换一换
      isClickChange: false,
      latelySearchList: ['近来记录一', '近来记录二', '近来记录三'],
      searchFindList: ['发现记录一', '发现记录二', '发现记录三']
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    handleSearch(data) {
      console.log('-search-data-', data)
    },
    onChangeClick() {
      console.log('换一换', this.isClickChange)
      this.isClickChange = true
      setTimeout(() => {
        this.isClickChange = false
      }, 500)
    },
    getData() {
      this.latelySearchList = [...this.latelySearchList, ...this.latelySearchList]
    }
  },
  components: { searchBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
.search {
  .main {
    padding: 0 10px;
    .content {
      font-size: 12px;
      color: #000;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding: 0 10px;
        .title {
          line-height: 36px;
          font-size: 16px;
          font-weight: 600;
        }
        .cancelIcon {
          width: 28px;
          height: 28px;
          background: url('@{imgUrl}cancelIcon.png') no-repeat center / cover;
        }
        .cartIcon {
          font-size: 20px;
        }
        .findTopRight {
          display: flex;
          align-items: center;
          .icon-huanyihuan1 {
            font-size: 12px;
            padding: 0 6px;
          }
          .iconTransfromClass {
            transition: all 0.5s ease-in-out;
            transform: rotate(360deg);
          }
        }
      }
      .itemBox {
        display: flex;
        flex-wrap: wrap;
        padding-top: 6px;
        &.latelyContent {
          // margin-bottom: 10px;
        }
        .item {
          background: #ccc;
          padding: 6px 8px;
          margin: 0 4px 6px 0;
          border-radius: 12px;
        }
      }
    }
  }
}
</style>

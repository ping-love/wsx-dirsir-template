<!--
   购物车
-->
<template>
  <div class="car">
    <headerBar background="red" titleColor="#fff" arrowsType="white"></headerBar>
    <div class="main">
      <van-list
        v-model="isMoreLoading"
        :finished="isMoreFinished"
        finished-text="没有更多了"
        :error.sync="isMoreError"
        error-text="加载失败，点击重新加载"
        @load="getMoreData"
        :immediate-check="false"
      >
        <van-cell class="itemBox" :border="false" v-for="(item, index) in list" :key="index">
          <van-card
            tag="第一名"
            :num="item.num"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
            :thumb="item.pic"
            currency="$"
            @click="toGoodsDetails(item.goodsId)"
          >
            <template #tags>
              <van-tag type="danger" v-for="(tag, idx) in item.tags" :key="idx">{{ tag }}</van-tag>
            </template>

            <template #num>
              <van-icon name="cart-circle-o" color="red" size="24" badge="9" @click.stop="onAddCart(item)"></van-icon>
            </template>

            <template #footer>
              <!-- <van-button type="primary" size="mini" @click.stop="onBtnClick">按钮</van-button> -->
              <!-- <van-field v-model="item.num" type="number" label="数量"></van-field> -->
              <!-- <van-icon name="cart-circle-o" color="red" size="24" badge="9"></van-icon> -->
            </template>
          </van-card>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
export default {
  name: 'GoodsList',
  data() {
    return {
      pageNo: 0,
      pageSize: 10,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      list: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    toGoodsDetails(goodsId) {
      const routerParams = {
        path: '/details',
        query: {
          goodsId
        }
      }
      console.log('-router-params-', routerParams)
      this.$router.push(routerParams)
    },
    onAddCart(data) {
      console.log('-data-', data)
      this.$toast('添加购物车成功！')
    },
    onBtnClick() {
      console.log('按钮事件')
      this.$toast('目前还不知道该按钮的作用！')
    },
    //
    getData() {
      let data = [
        {
          goodsId: 10088,
          num: 2,
          desc: '商品一',
          title: '商品标题',
          price: '10.99',
          pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          tags: ['标签一', '标签二']
        }
      ]
      console.log('开始请求数据')
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
        this.isMoreLoading = false
        for (let i = 0; i < 10; i++) {
          this.list.push(...data)
        }
        console.log('-list-', this.list)
        if (this.list.length >= 30) {
          this.isMoreFinished = true
        }
      }, 1000)
    },
    // 更多
    getMoreData() {
      console.log('加载更多')
      let res = {
        code: 200,
        msg: '',
        data: [
          {
            goodsId: 10099,
            num: 2,
            desc: '商品一',
            title: '商品标题',
            price: '10.99',
            pic: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            tags: ['标签一', '标签二']
          }
        ]
      }
      let midArr = []
      for (let i = 0; i < 10; i++) {
        midArr.push(...res.data)
      }
      console.log('-mid-', midArr)
      res.data = midArr
      setTimeout(() => {
        console.log('-res-', res)
        if (res.code == 200) {
          this.isMoreLoading = false
          const data = res.data
          this.list = [...this.list, ...data]
          console.log('-more-list-', this.list)
          if (this.list.length > 30) {
            this.isMoreFinished = true
          }
        } else {
          //
          console.log(res.msg)
          this.$toast(res.msg)
        }
      }, 1000)
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

@mainBg: #f5f5f5;
.main {
  padding-top: 4px;
  background: @mainBg;
}

/deep/ .van-cell {
  background: @mainBg;
  padding: 4px 12px;
  .van-cell__value {
    border-radius: 6px;
  }
}

/deep/ .van-card {
  background: #fff;
  box-shadow: rgb(236, 224, 224) 0px 3px 10px;
  .van-card__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .van-card__content {
    .van-tag {
      margin-right: 6px;
      border-radius: 4px;
    }
  }
  .van-card__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-card__num {
      display: flex;
      align-items: center;
    }
  }
}
</style>

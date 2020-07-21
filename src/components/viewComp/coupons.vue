<!--
   优惠卷
-->
<template>
  <div class="couponsWrap">
    <van-coupon-cell :coupons="couponsList" :chosen-coupon="chosenCouponIdx" @click="isShowList = true" />
    <!-- 优惠卷列表 -->
    <van-popup
      v-model="isShowList"
      :round="isPopupRound == true"
      position="bottom"
      style="height: 80%; padding-top: 10px"
    >
      <van-coupon-list
        enabled-title="可使用优惠卷"
        disabled-title="不可使用优惠卷"
        :coupons="couponsList"
        :disabled-coupons="disCouponsList"
        :chosen-coupon="chosenCouponIdx"
        @change="onChange"
        @exchange="onExchange"
      >
      </van-coupon-list>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isShowList: false,
      chosenCouponIdx: -1
    }
  },
  props: {
    // popup是否为圆角，默认为圆角
    isPopupRound: {
      type: Boolean,
      default: true
    },
    // 可用优惠卷列表
    couponsList: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 不可用优惠卷列表
    disCouponsList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onChange(index) {
      console.log(index, this.couponsList[index])
      const data = this.couponsList[index]
      this.isShowList = false
      this.chosenCouponIdx = index
      this.$emit('select', data)
    },
    onExchange(code) {
      console.log(code)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

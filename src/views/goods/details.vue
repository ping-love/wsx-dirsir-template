<!--
   商品详情
-->
<template>
  <div class="goods-details">
    <headerBar></headerBar>
    <coupons
      :couponsList="couponsList"
      :disCouponsList="disCouponsList"
      @select="onSelect"
      :isPopupRound="false"
    ></coupons>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import coupons from '@/components/viewComp/coupons'
export default {
  name: '',
  data() {
    return {
      couponsList: [
        {
          id: '60069',
          available: 1,
          condition: '无使用门槛\n最多优惠12元',
          reason: '',
          value: 150,
          name: '优惠券1',
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: '1.5',
          unitDesc: '元'
        },
        {
          id: '70069',
          available: 1,
          condition: '无使用门槛\n最多优惠12元',
          reason: '',
          value: 150,
          name: '优惠券2',
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: '10.5',
          unitDesc: '元'
        }
      ],
      disCouponsList: [
        {
          id: '80069',
          available: 1,
          condition: '无使用门槛\n最多优惠12元',
          reason: '',
          value: 150,
          name: '不可用优惠券1',
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: '8.5',
          unitDesc: '元'
        }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onSelect(data) {
      console.log('-data-', !data)
      if (!data) {
        this.$toast('你还没有选择优惠卷呢！')
      }
    }
  },
  components: { headerBar, coupons }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

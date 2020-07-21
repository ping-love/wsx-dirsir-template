<!--
   商品楼层 - 四列商品
-->
<template>
  <div class="fourFloor">
    <div class="titleBox">
      <p class="title">{{ infoData.title }}</p>
      <p class="desc">{{ infoData.desc }}</p>
    </div>
    <div class="listBox">
      <div class="item" v-for="item in infoData.list" :key="item.itemId">
        <div class="imgWrap">
          <img v-lazy="item.pic" alt="" />
        </div>
        <div class="otherWrap">
          <p class="itemTitle">{{ item.titleName }}</p>
          <p class="tagName">{{ item.tagName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    infoData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

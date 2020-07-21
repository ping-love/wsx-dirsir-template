// 分类列表模拟数据
let img1 =
  'https://t00img.yangkeduo.com/goods/images/2020-04-13/ad8b7352-aa56-4bfc-914f-120a179ab1ea.jpg?imageMogr2/sharpen/50%7CimageView2/2/w/312/q/80/format/webp'
let img2 =
  'https://t00img.yangkeduo.com/goods/images/2020-05-21/0ba7ebeee3c033d00f3357bf9cbadf64.jpeg?imageMogr2/sharpen/50%7CimageView2/2/w/400/q/80/format/webp'
let img3 =
  'https://t00img.yangkeduo.com/goods/images/2020-02-29/70f0a3d8e0619f6815c097a938e7d299.jpeg?imageMogr2/sharpen/50%7CimageView2/2/w/400/q/80/format/webp'
let img4 =
  'https://t00img.yangkeduo.com/goods/images/2020-05-09/b78ac7983470e70779cd7a197ecdf6d2.jpeg?imageMogr2/sharpen/50%7CimageView2/2/w/400/q/80/format/webp'

let classifyTestData = {
  goodsId: '79798',
  ranking: '1',
  imgUrl: '',
  tags: ['标签一', '标签二'],
  currentPrice: '136.00',
  originalPrice: '230.00',
  desc: '说明描述。。。',
  title: '商品标题商品标题商品标题商品标题'
}
let otherData = {
  // listBg: '#fff',
  // itemBg: '#fff',
  totalCount: '20'
}

/**
 * 获取分类导航标题
 */
function getClassifyTitles() {
  let title1 = ['推荐', '男装', '鞋包', '手机', '女装', '食品', '内衣', '百货']
  let title2 = ['水果', '医药', '运动', '家装', '母婴', '家纺', '美妆', '电脑', '家具', '海淘', '其它']
  let titles = [...title1, ...title2]
  let midArr = []
  titles.map((val, index) => {
    let mid = {}
    mid = { type: index, titleName: val }
    midArr.push(mid)
  })
  return midArr
}

function getClassifyImgUrl(type) {
  let imgUrl = ''
  switch (type) {
    case 0:
      imgUrl = img1
      break
    case 1:
      imgUrl = img2
      break
    case 2:
      imgUrl = img3
      break
    case 3:
      imgUrl = img4
      break
    default:
      imgUrl =
        'https://t00img.yangkeduo.com/goods/images/2020-02-19/d2887a77d2293028db6e2b5e69a40210.jpeg?imageMogr2/sharpen/50%7CimageView2/2/w/400/q/80/format/webp'
      break
  }
  return imgUrl
}

/**
 * 获取list数据
 * @param {number} totalCount 总的数据长度
 * @param {number} pageSize 每页的条数, 默认为10
 * @param {boolean} isNextPage 是否有下一页，只在初始化时生效，默认为true
 */
function getListData(totalCount, pageSize = 10, isNextPage = true) {
  // console.log('-isNextPage-', isNextPage)
  otherData.totalCount = totalCount
  otherData.pageSize = pageSize
  otherData.isNextPage = isNextPage
  if (isNextPage) {
    otherData.isMoreError = false
  }
  let result = {
    ...otherData
  }
  let midArr = []
  for (let i = 0; i < pageSize; i++) {
    let mid = { ...classifyTestData }
    mid.itemId = i + 1
    midArr.push(mid)
  }
  result['list'] = midArr
  return result
}

/**
 * 获取加载更多数据
 */
function getMoreData(pageSize, type) {
  type = type || 0
  let midArr = []
  for (let i = 0; i < pageSize; i++) {
    let mid = { ...classifyTestData }
    mid.itemId = i + 1
    mid.imgUrl = getClassifyImgUrl(type)
    midArr.push(mid)
  }
  return midArr
}
export default {
  getClassifyTitles,
  getListData,
  getMoreData
}

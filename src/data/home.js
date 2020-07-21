import { setResultData } from './index'

// 搜索栏
function setSearchData(moduleId) {
  let data = {
    leftIconBox: {
      link1: '',
      link2: ''
    },
    rightIconBox: {
      link3: '',
      link4: ''
    }
  }
  let otherData = {}
  return setResultData('1', moduleId, data, otherData, false)
}
// 轮播
function setSwiperData(moduleId, len) {
  let data = {
    bannerId: '79798',
    imgUrl: 'https://iph.href.lu/375x160',
    title: '轮播图一',
    routerName: 'ActivityListPage'
  }
  let otherData = {}
  return setResultData('2', moduleId, data, otherData, true, len)
}

let floorOneData = {
  isShop: true,
  shopInfo: {
    icon: 'https://iph.href.lu/60x60',
    name: '店铺名',
    desc: '正品大牌,品质保证'
  }
}

let floorTwoData = {
  isShop: false,
  otherInfo: {
    icon: 'https://iph.href.lu/20x20',
    titles: ['百亿补贴', '大牌正品，官方补贴']
  }
}

let floorThreeData = {
  isShop: false,
  otherInfo: {
    titles: ['百亿补贴', '大牌正品，官方补贴']
  }
}

let floorFourData = {
  isShop: false,
  otherInfo: {
    titles: ['本周男POLO衫好评榜']
  }
}
let floorGoodsImg =
  'https://t00img.yangkeduo.com/goods/images/2020-07-01/80f8e6eb81d3034d9cedf98d0530b6c4.jpeg?imageMogr2/sharpen/50%7CimageView2/2/w/1300/q/80/format/webp'

function setFloorOneData(moduleId, len) {
  let data = {
    imgUrl: 'https://iph.href.lu/60x60',
    tagName: 'other',
    routerName: 'ActivityOne'
  }
  let otherData = {
    titleInfo: {
      left: floorOneData,
      right: {
        btnTxt: '查看更多 >',
        linkType: '店铺'
      }
    },
    mainBg: '#fff',
    titleColor: '#000',
    otherColor: '#999'
  }
  return setResultData('3', moduleId, data, otherData, true, len)
}
function setFloorTwoData(moduleId, len) {
  let data = {
    imgUrl: 'https://iph.href.lu/60x60',
    tagName: 'other',
    routerName: 'ActivityOne'
  }
  let otherData = {
    titleInfo: {
      left: floorTwoData,
      right: {
        btnTxt: '查看更多 >',
        linkType: '活动一'
      }
    },
    mainBg: '#fff',
    titleColor: '#000',
    otherColor: '#999'
  }
  return setResultData('3', moduleId, data, otherData, true, len)
}
function setFloorThreeData(moduleId, len) {
  let data = {
    imgUrl: 'https://iph.href.lu/60x60',
    tagName: 'other',
    routerName: 'ActivityOne'
  }
  let otherData = {
    titleInfo: {
      left: floorThreeData,
      right: {
        btnTxt: '查看更多 >',
        linkType: '活动二'
      }
    },
    mainBg: '#fff',
    titleColor: '#000',
    otherColor: '#999'
  }
  return setResultData('3', moduleId, data, otherData, true, len)
}
function setFloorFourData(moduleId, len) {
  let data = {
    imgUrl: 'https://iph.href.lu/60x60',
    tagName: 'other',
    routerName: 'ActivityOne'
  }
  let otherData = {
    titleInfo: {
      left: floorFourData,
      right: {
        btnTxt: '查看更多 >',
        linkType: '活动三'
      }
    },
    mainBg: '#fff',
    titleColor: '#000',
    otherColor: '#999'
  }
  return setResultData('3', moduleId, data, otherData, true, len)
}

// list
function setListOneData(moduleId, len, isNextPage = true) {
  // console.log('-isNextPage-', isNextPage)
  let data = {
    goodsId: '79798',
    ranking: '1',
    imgUrl:
      'https://t00img.yangkeduo.com/goods/images/2020-04-13/ad8b7352-aa56-4bfc-914f-120a179ab1ea.jpg?imageMogr2/sharpen/50%7CimageView2/2/w/312/q/80/format/webp',
    tags: ['标签一', '标签二'],
    currentPrice: '136.00',
    originalPrice: '230.00',
    desc: '说明描述。。。',
    title: '商品标题商品标题商品标题商品标题'
  }
  let otherData = {
    listBg: '#fff',
    itemBg: '#fff',
    totalCount: 20,
    pageSize: 6,
    isNextPage
  }
  if (isNextPage) {
    otherData.isMoreError = false
  }
  return setResultData('4', moduleId, data, otherData, true, len)
}

export default {
  setSearchData,
  setSwiperData,
  setFloorOneData,
  setFloorTwoData,
  setFloorThreeData,
  setFloorFourData,
  setListOneData
}

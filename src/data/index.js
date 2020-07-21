/**
 * 模拟数据
 */
// 获取模块type
function getModuleType(type) {
  let result = ''
  switch (type) {
    case '1':
      result = 'el-search'
      break
    case '2':
      result = 'el-swiper'
      break
    case '3':
      result = 'el-floor'
      break
    case '4':
      result = 'el-list'
      break
    default:
      console.log('其它')
      break
  }
  return result
}

// 商城首页
/**
 * 模拟后台返回的数据
 * @param {string} moduleType 模块标识
 * @param {string} moduleId 模块id,唯一性
 * @param {object} data 单个item的数据
 * @param {object} otherData 其它数据，例如list背景色、item背景色、是否有下一页等等
 * @param {boolean} isList 是否为list， 默认为 true
 * @param {number} count list数据条数,默认为 7
 * @return {object}
 */
export function setResultData(moduleType, moduleId, data, otherData, isList, count) {
  isList = isList || true
  otherData = otherData || {}
  count = count || 8
  moduleType = getModuleType(moduleType)

  let result = {}
  result = {
    moduleType,
    moduleId,
    moduleData: {
      ...otherData
    }
  }
  if (isList) {
    let midArr = []
    for (let i = 0; i < count; i++) {
      let mid = { ...data }
      mid.itemId = i + 1
      midArr.push(mid)
    }
    result['moduleData']['list'] = midArr
  }
  return result
}

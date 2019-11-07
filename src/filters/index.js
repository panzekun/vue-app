/*
 * @Description: 全局过滤器
 * @Author: pzk
 * @Date: 2019-5-17 10:08:41
 * @LastEditors: 
 */

/**
 *@param {String}
 * **字符串yyyymmdd转日期格式yyyy - mm - dd（20180210要变成2018 - 02 - 10）** <br/>
 * @returns {date}
*/
exports.ToyyyyMMdd = (setDate) => {
  let newDate = setDate.substr(0, 10)
  if (setDate.length === 8) {
    let newDate = setDate.substring(0, 4) + '-' + setDate.substring(4, 6) + '-' + setDate.substring(6, 8)
    return newDate
  } else if (setDate.length === 6) {
    newDate = setDate.substring(0, 4) + '-' + setDate.substring(4, 6)
    return newDate
  }
  return newDate
}
/**
 *@param {String}
 * **将格式化数字三位加一逗号带两位小数** <br/>
 * @returns {Number}
*/
exports.FormatMoney = (s) => {
  if (!s) {
    return "0.00"
  }
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(2) + ''
  var l = s.split('.')[0].split('').reverse(), r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}
/**
 *@param {String}
 * **根据时间返回早上，中午，下午，晚上** <br/>
 * @returns {Number}
*/
exports.FormatMorning = (h) => {
  if (5 < h && h < 12) {
    return "早上好！"
  } else if (11 < h && h < 15) {
    return "中午好！"
  } else if (14 < h && h < 19) {
    return "下午好！"
  } else if (18 < h && h < 24) {
    return "晚上好"
  } else {
    return "您好！"
  }
}
/**
 *@param {String}
 * **根据时间返回早上，中午，下午，晚上** <br/>
 * @returns {Number}
*/
exports.FormatOrderState = (s) => {
  switch (s) {
    case 'SHALL_PAID_DEPOSIT':
      return '待付押金'
      break;
    case 'SHALL_DELIVERED':
      return '待发货'
      break;
    case 'SHALL_RECEIPT':
      return '待收货'
      break;
    case 'SHALL_PAID_RENT':
      return '已收货'
      break;
    case 'COMPLETED':
      return '已完成'
      break;
    case 'CANCELLED':
      return '已取消'
      break;
    case 'INVALID':
      return '已取消'
      break;

    default: ''
    return '无'
      break;
  }
}

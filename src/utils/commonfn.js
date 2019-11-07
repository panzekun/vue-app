import { provinceList, cityList, areaList } from '@/data/area'




/**
 * 获取流水号 <br/>
 * @param 无
 * @returns {String}
 */
export function initiationID() { // 获取流水号
  var date = new Date();
  var pwd = ''
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var ss = date.getMilliseconds();
  var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var idvalue = '';
  let n = 9//这个值可以改变的，对应的生成多少个字母，根据自己需求所改
  for (var i = 0; i < n; i++) {
    idvalue += arr[Math.floor(Math.random() * 26)];
  }
  pwd = 'H5refe' + Y + M + D + h + m + s + ss + idvalue;
  return pwd
}

/**
 * 获取当前时间 2019-10-12 10:06:10 <br/>
 * @param 无
 * @returns {String}
 */
export function getDate() {
  let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
  return date
}
/**
 * 日期比较 <br/>
 * @param 日期
 * @returns {Boolen}
 */
export function compareDate(date1, date2) { // 日期比较
  var oDate1 = new Date(date1)
  var oDate2 = new Date(date2)
  if (oDate1.getTime() >= oDate2.getTime()) { // 转换成毫秒进行比较
    return false
  } else {
    return true
  }
}
/**
 * 身份证验证 <br/>
 * @param 身份证
 * @returns {Boolen}
 */
export function isIdCardNo(num) {
  var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1)
  var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2")
  var varArray = new Array()
  var intValue
  var lngProduct = 0
  var intCheckDigit
  var intStrLen = num.length
  var idNumber = num
  function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
      return false
    }
    var year, month, day
    year = sDate.substring(0, 4)
    month = sDate.substring(4, 6)
    if (year < 1700 || year > 2500) return false
    if (month < 1 || month > 12) return false
    return true
  }
  function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
      return false
    }
    var year, month, day
    year = sDate.substring(0, 4)
    month = sDate.substring(4, 6)
    day = sDate.substring(6, 8)
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500) return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29
    if (month < 1 || month > 12) return false
    if (day < 1 || day > iaMonthDays[month - 1]) return false
    return true
  }
  // initialize
  if ((intStrLen != 15) && (intStrLen != 18)) {
    return false
  }
  // check and set value
  for (let i = 0; i < intStrLen; i++) {
    varArray[i] = idNumber.charAt(i)
    if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
      return false
    } else if (i < 17) {
      varArray[i] = varArray[i] * factorArr[i]
    }
  }

  if (intStrLen == 18) {
    //check date
    var date8 = idNumber.substring(6, 14)
    if (isDate8(date8) == false) {
      return false
    }
    // calculate the sum of the products
    for (let i = 0; i < 17; i++) {
      lngProduct = lngProduct + varArray[i]
    }
    // calculate the check digit
    intCheckDigit = parityBit[lngProduct % 11]
    // check last digit
    if (varArray[17] != intCheckDigit) {
      return false
    }
  }
  else {        //length is 15
    //check date
    var date6 = idNumber.substring(6, 12)
    if (isDate6(date6) == false) {
      return false
    }
  }
  return true
}

/**
 * **营业执照两年** <br/>
 * @returns {boolean}
 */
export function lisenceLimit(comDate) {
  let comDateNo = comDate.split('-').join('')
  let pattern = /(\d{4})(\d{2})(\d{2})/
  let formatDate = new Date(comDateNo.replace(pattern, '$1/$2/$3'))
  let Year = formatDate.getFullYear() + 2
  let addDate_str = Year + comDateNo.substr(comDateNo.length - 4)
  let addDate_date = new Date(addDate_str.replace(pattern, '$1/$2/$3'))
  return new Date().getTime() < addDate_date.getTime() ? false : true
}
/**
 * **年龄限制** <br/>
 * @returns {boolean}
 */
export function ageLimit(idNumber) {
  let len = idNumber.length
  let nowDate = new Date()
  let hisBir, age
  if (len === 18) {
    hisBir = new Date(idNumber.substr(6, 4) + '/'
      + idNumber.substr(10, 2) + '/'
      + idNumber.substr(12, 2))
  } else {
    hisBir = '19' + identityCard.substr(6, 2)
      + '/' + identityCard.substr(8, 2)
      + '/' + identityCard.substr(10, 2)
  }
  age = nowDate.getFullYear() - hisBir.getFullYear()
  if (age === 22 || age === 55) {
    let A1 = nowDate.getMonth() < hisBir.getMonth()
    let A2 = nowDate.getMonth() === hisBir.getMonth() && nowDate.getDate() < hisBir.getDate()
    if (A1 || A2) {
      age--
    }
  }
  console.log(age, '年龄')
  return age >= 22 && age <= 55 ? true : false
}
/**
 * **验证手机号** <br/>
 * @returns {string}
*/
export function phoneX(e, pph) {
  let phone = pph === 0 ? e.target.value : pph
  var phoneReg = /^1[345678]\d{9}$/
  if (phone.length === 0) {
    return { status: '0' }
  } else if (!phoneReg.test(phone)) {
    return { status: '1' } // 格式错误
  } else {
    return { status: '2' } // 正确
  }
}
/**
 * **判断系统** <br/>
 * @returns {Boolen}
*/
export function wSystemtype() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return 'ios'
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return 'Android'
  } else {
    return 'windows'
  }
}



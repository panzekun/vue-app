import axios from 'axios'
import router from '@/router'

// 全局设置头部信息
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// // 请求超时
// axios.defaults.timeout = 5000
// // 这个是接口地址, 打包所有的都是自动配置的
// axios.baseURL = process.env.VUE_APP_FLAG
// process.env.SERVER_VARIETY  //环境名称
// 一些请求的基本配置 
const service = axios.create({
  baseURL: process.env.VUE_APP_FLAG,// 接口的域名地址
  timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // // 可以在这里拼接
    // config.url = '/api' + config.url
    // sessionStorage.setItem('myRequestId', config.headers.requestId)
    // if (mytoken) {
    //   // 让每个请求携带token-- ['token']为自定义key
    // config.headers.Authorization = mytoken
    // config.headers.Token = mytoken
    // }
    console.dir(config);
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// http response 拦截响应
axios.interceptors.response.use(
  response => {
    const { data, status } = response
    if (status == 200) {
      if (data.code == 401) {
        // token 过期啊
        // 重新登录
      } else {
        return Promise.resolve(data) // 统一处理,只返回 后台数据data 对象
      }
    } else {
      return data
    }
  },
  error => {
    console.log(error.response) // for debug
    //  对请求失败的HTTP状态码做处理

    return Promise.reject(error)
  }
)


// 输出方法
export default function request(url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method,
      data
    }
    service(options)
      .then(res => {
        console.log('返回数据', res)
        resolve(res.data)
      })
      .catch(error => {
        reject()
        console.error(error)
      })
  })
}
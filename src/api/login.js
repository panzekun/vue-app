import request from '@/utils/request'

const api = {
  // 获取首页录播图
  getSwierList(data) {
    return request('/getSwierList', data)
  },
}

export default api
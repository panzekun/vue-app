import request from '@/utils/request'

const api = {
  // 接口1
  login(data) {
    return request('user/login', data)
  },
}

export default api
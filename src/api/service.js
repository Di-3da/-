import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/service',
        method: 'get'
    })
}

export function add(service) {
    return request({
        url: '/service',
        method: 'post',
        data: service
    })
}

export function update(service) {
    return request({
        url: '/service',
        method: 'put',
        data: service
    })
}

export function deleteById(id) {
    return request({
      url: '/service/' + id,
      method: 'delete'
    })
  }
  
  export function selectById(id) {
    return request({
      url: '/service/' + id,
      method: 'get'
    })
  }
  
  export function page(name,page,pageSize) {
    return request({
      url: '/service/page?name='+name+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }
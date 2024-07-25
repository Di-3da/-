import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/treat',
        method: 'get'
    })
}

export function add(treat) {
    return request({
        url: '/treat',
        method: 'post',
        data: treat
    })
}

export function update(treat) {
    return request({
        url: '/treat',
        method: 'put',
        data: treat
    })
}

export function deleteById(id) {
    return request({
      url: '/treat/' + id,
      method: 'delete'
    })
  }
  
  export function selectById(id) {
    return request({
      url: '/treat/' + id,
      method: 'get'
    })
  }
  
  export function page(name,page,pageSize) {
    return request({
      url: '/treat/page?name='+name+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }
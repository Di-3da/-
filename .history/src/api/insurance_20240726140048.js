import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/institution',
        method: 'get'
    })
}

export function add(institution) {
    return request({
        url: '/institution',
        method: 'post',
        data: institution
    })
}

export function update(institution) {
    return request({
        url: '/institution',
        method: 'put',
        data: institution
    })
}

export function deleteById(id) {
    return request({
      url: '/institution/' + id,
      method: 'delete'
    })
  }
  
  export function selectById(id) {
    return request({
      url: '/institution/' + id,
      method: 'get'
    })
  }
  
  export function page(name,page,pageSize) {
    return request({
      url: '/institution/page?name='+name+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }
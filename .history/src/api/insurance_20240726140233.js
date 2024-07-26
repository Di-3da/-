import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/insurance',
        method: 'get'
    })
}

export function add(insurance) {
    return request({
        url: '/insurance',
        method: 'post',
        data: insurance
    })
}

export function update(insurance) {
    return request({
        url: '/insurance',
        method: 'put',
        data: insurance
    })
}

export function deleteById(id) {
    return request({
      url: '/insurance/' + id,
      method: 'delete'
    })
  }
  
  export function selectById(id) {
    return request({
      url: '/insurance/' + id,
      method: 'get'
    })
  }
  
  export function page(name,page,pageSize) {
    return request({
      url: '/insurance/page?name='+name+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }

  export function query(peopleId, peopleName) {
    return request({
      url: '/insurance/page?name='+name+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }
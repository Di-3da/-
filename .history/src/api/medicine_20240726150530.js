import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/medicine',
        method: 'get'
    })
}

export function add(medicine) {
    return request({
        url: '/medicine',
        method: 'post',
        data: medicine
    })
}

export function update(medicine) {
    return request({
        url: '/medicine',
        method: 'put',
        data: medicine
    })
}

export function deleteById(id) {
    return request({
      url: '/medicine/' + id,
      method: 'delete'
    })
  }
  
  export function selectById(id) {
    return request({
      url: '/medicine/' + id,
      method: 'get'
    })
  }
  
  export function page(name,page,pageSize) {
    return request({
      url: '/medicine/page?name='+name+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }

  export function queryMedicine(name, medicId) {
    return request({
      url: '/medicine/page?name='+name+'&medicId='+medicId,
      method: 'get'
    })
  }

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
  
  export function page(name,begin,end,page,pageSize) {
    return request({
      url: '/treat?name='+name+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }
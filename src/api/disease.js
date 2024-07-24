import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/disease',
        method: 'get'
    })
}

export function add(disease) {
    return request({
        url: '/disease',
        method: 'post',
        data: disease
    })
}

export function update(disease) {
    return request({
        url: '/disease',
        method: 'put',
        data: disease
    })
}

export function deleteById(id) {
    return request({
      url: '/disease/' + id,
      method: 'delete'
    })
  }
  
  export function selectById(id) {
    return request({
      url: '/disease/' + id,
      method: 'get'
    })
  }
  
  export function page(name,begin,end,page,pageSize) {
    return request({
      url: '/disease?name='+name+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }
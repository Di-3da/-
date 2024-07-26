import request from '@/utils/request'

export function findAll() {
    return request({
        url: '/people',
        method: 'get'
    })
}

export function add(people) {
    return request({
        url: '/people',
        method: 'post',
        data: people
    })
}

export function update(people) {
    return request({
        url: '/people',
        method: 'put',
        data: people
    })
}

export function deleteById(id) {
    return request({
      url: '/people/' + id,
      method: 'delete'
    })
  }
  
  export function selectById(id) {
    return request({
      url: '/people/' + id,
      method: 'get'
    })
  }
  
  export function page(name,page,pageSize) {
    return request({
      url: '/people/page?name='+name+'&page='+page+'&pageSize='+pageSize,
      method: 'get'
    })
  }

  export function query(peopleId, peopleName) {
    return request({
      url: '/people/query?peopleId='+peopleId+'&peopleName='+peopleName,
      method: 'get'
    })
  }

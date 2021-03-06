import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/users',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/users/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/users',
    method: 'put',
    data
  })
}

export function send(id) {
  return request({
    url: 'api/updatepwd?userid=' + id,
    method: 'get'
  })
}

export function updatePass(oldPassword, newPassword) {
  return request({
    url: 'api/updatepwd' + '?oldpass=' + oldPassword + '&pass=' + newPassword,
    method: 'get'
  })
}

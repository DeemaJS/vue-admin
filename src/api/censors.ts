import request from '@/utils/request'

export const getCensors = (params: any) =>
  request({
    url: '/censors',
    method: 'get',
    params
  })

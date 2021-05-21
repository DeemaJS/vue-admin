import request from '@/utils/request'

export const getDevices = (params: any) =>
  request({
    url: '/devices',
    method: 'get',
    params
  })

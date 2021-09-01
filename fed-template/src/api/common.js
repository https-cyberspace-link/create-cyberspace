import { get } from '@/utils/request'

// example
export const getOrgs = function (params = {}) {
  return get('/api/example', params)
}

import { ApiHandler as makeReq } from './ApiHandler'
const BASE_URL = 'service'
export default {
  getAllServices: () => {
    return makeReq({
      url: `${BASE_URL}/getAllServices`,
      method: 'GET',
    })
  },
  getServiceById: (id) => {
    return makeReq({
      url: `${BASE_URL}/${id}`,
      method: 'GET',
    })
  },
  createService: (service) => {
    return makeReq({
      url: `${BASE_URL}`,
      method: 'POST',
      data: service,
    })
  },
  editService: (service) => {
    return makeReq({
      url: `${BASE_URL}/${service.id}`,
      method: 'PUT',
      data: service,
    })
  },
  deleteService: (serviceID) => {
    return makeReq({
      url: `${BASE_URL}/${serviceID}`,
      method: 'DELETE',
    })
  },
}

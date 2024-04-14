import { ApiHandler as makeReq } from './ApiHandler'
const BASE_URL = 'packer'

export default {
  getAllPackers: () => {
    return makeReq({
      url: `${BASE_URL}/getAllPackers`,
      method: 'GET',
    })
  },
  getPackerById: (id) => {
    return makeReq({
      url: `${BASE_URL}/${id}`,
      method: 'GET',
    })
  },
  getPackerByUserId: (id) => {
    return makeReq({
      url: `${BASE_URL}/getByUserId/${id}`,
      method: 'GET',
    })
  },
  createPacker: (packer) => {
    return makeReq({
      url: `${BASE_URL}`,
      method: 'POST',
      data: packer,
    })
  },
  editPacker: (packer) => {
    return makeReq({
      url: `${BASE_URL}/${packer.id}`,
      method: 'PUT',
      data: packer,
    })
  },
  deletePacker: (packerID) => {
    return makeReq({
      url: `${BASE_URL}/${packerID}`,
      method: 'DELETE',
    })
  },
}

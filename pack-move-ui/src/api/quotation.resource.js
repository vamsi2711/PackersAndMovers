import { ADMIN, AGENT, USER } from '../common/constants'
import { ApiHandler as makeReq } from './ApiHandler'
const BASE_URL = 'quotation'
export default {
  getAllQuotations: () => {
    return makeReq({
      url: `${BASE_URL}/getAllQuotations`,
      method: 'GET',
    })
  },
  getQuotationById: (id) => {
    return makeReq({
      url: `${BASE_URL}/${id}`,
      method: 'GET',
    })
  },
  getQuotationsByRole: (user) => {
    return makeReq({
      url:
      user.role === ADMIN
      ? `${BASE_URL}/getAllQuotations`
      : `${BASE_URL}/${
          user.role === USER ? `getByUserId/${user.id}` : `getByPackerId/${user.id}`
        }`,
      method: 'GET',
    })
  },
  createQuotation: (quotation) => {
    return makeReq({
      url: `${BASE_URL}`,
      method: 'POST',
      data: quotation,
    })
  },
  editQuotation: (quotation) => {
    return makeReq({
      url: `${BASE_URL}/${quotation.id}`,
      method: 'PUT',
      data: quotation,
    })
  },
  deleteQuotation: (quotationID) => {
    return makeReq({
      url: `${BASE_URL}/${quotationID}`,
      method: 'DELETE',
    })
  },
}

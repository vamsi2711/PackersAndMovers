import { ADMIN, AGENT, USER } from '../common/constants'
import { ApiHandler as makeReq } from './ApiHandler'
const BASE_URL = 'order'
export default {
  getAllOrders: () => {
    return makeReq({
      url: `${BASE_URL}/getAllOrders`,
      method: 'GET',
    })
  },
  getOrdersByRole: (user) => {
    return makeReq({
      url:
        user.role === ADMIN
          ? `${BASE_URL}/getAllOrders`
          : `${BASE_URL}/${
              user.role === USER ? `getByUserId/${user.id}` : `getByPackerId/${user.id}`
            }`,
      method: 'GET',
    })
  },
  getOrderById: (id) => {
    return makeReq({
      url: `${BASE_URL}/${id}`,
      method: 'GET',
    })
  },
  createOrder: (order) => {
    return makeReq({
      url: `${BASE_URL}`,
      method: 'POST',
      data: order,
    })
  },
  editOrder: (order) => {
    return makeReq({
      url: `${BASE_URL}/${order.id}`,
      method: 'PUT',
      data: order,
    })
  },
  deleteOrder: (orderID) => {
    return makeReq({
      url: `${BASE_URL}/${orderID}`,
      method: 'DELETE',
    })
  },
}

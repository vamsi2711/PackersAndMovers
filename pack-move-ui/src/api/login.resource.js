import { ApiHandler as makeReq } from './ApiHandler'
const BASE_URL = 'user'
export default {
  login: (credentials) => {
    return makeReq({
      url: 'login',
      method: 'POST',
      data: credentials,
    })
  },
  registerUser: (user) => {
    return makeReq({
      url: `${BASE_URL}`,
      method: 'POST',
      data: user,
    })
  },
  editUser: (user) => {
    return makeReq({
      url: `${BASE_URL}/${user.id}`,
      method: 'PUT',
      data: user,
    })
  },
  getUserById: (userId) => {
    return makeReq({
      url: `${BASE_URL}/${userId}`,
      method: 'GET',
    })
  },
  registerAgent: (userDetails) => {
    return makeReq({
      url: 'agent-register',
      method: 'POST',
      data: userDetails,
    })
  },
  getAllUsers: () => {
    return makeReq({
      url: `${BASE_URL}/getAllUsers`,
      method: 'GET',
    })
  },
  deleteUser: (userID) => {
    return makeReq({
      url: `${BASE_URL}/${userID}`,
      method: 'DELETE',
    })
  },
}

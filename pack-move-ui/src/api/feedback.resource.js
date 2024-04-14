import { ADMIN, AGENT, USER } from '../common/constants'
import { ApiHandler as makeReq } from './ApiHandler'
const BASE_URL = 'feedback'
export default {
  getAllFeedbacks: () => {
    return makeReq({
      url: `${BASE_URL}/getAllFeedbacks`,
      method: 'GET',
    })
  },
  getFeedbacksByRole: (user) => {
    return makeReq({
      url:
        user.role === ADMIN
          ? `${BASE_URL}/getAllFeedbacks`
          : `${BASE_URL}/${
              user.role === USER ? `getByUserId/${user.id}` : `getByPackerId/${user.id}`
            }`,
      method: 'GET',
    })
  },
  getFeedbackById: (id) => {
    return makeReq({
      url: `${BASE_URL}/${id}`,
      method: 'GET',
    })
  },
  createFeedback: (feedback) => {
    return makeReq({
      url: `${BASE_URL}`,
      method: 'POST',
      data: feedback,
    })
  },
  editFeedback: (feedback) => {
    return makeReq({
      url: `${BASE_URL}/${feedback.id}`,
      method: 'PUT',
      data: feedback,
    })
  },
  deleteFeedback: (feedbackID) => {
    return makeReq({
      url: `${BASE_URL}/${feedbackID}`,
      method: 'DELETE',
    })
  },
}

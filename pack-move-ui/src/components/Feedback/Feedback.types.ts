import { type Packer } from '../Packers/Packers.types'
import { type User } from '../Registration/Registration.types'

export interface IFeedback {
  id?: string
  user?: User
  packer?: Packer
  date: string
  description: string
  rating: string
}

// export interface CreateServiceProps {
  // isModalOpen: boolean
  // service?: Quotation
  // onFinish: (p: Quotation) => void
  // onFinishFailed: (e: any) => void
  // handleCancel: () => void
// }

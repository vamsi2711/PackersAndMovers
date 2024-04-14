import { type Packer } from '../Packers/Packers.types'
import { type Quotation } from '../Quotations/Quotations.types'
import { type User } from '../Registration/Registration.types'
export type Status = 'Processing' | 'Completed' | 'Initiated' | 'Canceled'
export interface IOrder {
  id?: string
  orderedBy?: User
  packer?: Packer
  quotation?: Quotation
  date: string
  status: Status
  paymentStatus: 'Pending' | 'Done'
}

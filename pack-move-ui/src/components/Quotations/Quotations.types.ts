import { type Packer } from '../Packers/Packers.types'
import { type User } from '../Registration/Registration.types'
import { type ServiceType } from '../Services/Service.types'
import { type Dayjs } from 'dayjs'

export interface Quotation {
  id?: string
  quotedBy: User
  packer: Packer
  serviceType: ServiceType
  date: string | Dayjs
  description: string
  amount: string
  status?: string
  comments?: string
  serviceId?: string
}

export interface CreateServiceProps {
  isModalOpen: boolean
  service?: Quotation
  onFinish: (p: Quotation) => void
  onFinishFailed: (e: any) => void
  handleCancel: () => void
}

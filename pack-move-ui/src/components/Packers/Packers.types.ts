import { type User } from '../Registration/Registration.types'

export interface PackerDetails {
  name: string
  email: string
  phoneNo: number
  description: string
  city: string
  state: string
}
export interface Service {
  id: string
  serviceType?: string
}
export interface Packer extends PackerDetails {
  id: string
  services?: Service[]
  user?: User
}

export interface CreateParkerProps {
  isModalOpen: boolean
  packer?: Packer
  onFinish: (p: Packer) => void
  onFinishFailed: (e: any) => void
  handleCancel: () => void
}

export interface ViewParkerProps {
  packer: Packer
}

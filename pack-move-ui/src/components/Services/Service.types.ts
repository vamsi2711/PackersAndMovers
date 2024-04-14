export interface ServiceType {
    id?: string
    serviceType: string
    active: boolean
    key?: number
  }
  
  export interface CreateServiceProps {
    isModalOpen: boolean
    service?: ServiceType
    onFinish: (p: ServiceType) => void
    onFinishFailed: (e: any) => void
    handleCancel: () => void
  }
  
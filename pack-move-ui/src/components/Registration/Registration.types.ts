import { type Dispatch, type SetStateAction } from 'react'
import { type Roles } from '../../common.types'

export interface LoginProps {
  setUser?: Dispatch<SetStateAction<LoginResponse | null>>
  userDetails?: LoginResponse | null
}
export interface LoginDetails {
  username: string
  password: string
}
export interface LoginResponse {
  username: string | null
  id: string | null
  role: Roles
}

export interface DataNodeType {
  value: string
  label: string
  children?: DataNodeType[]
}
export interface User {
  newPassword?: string
  name: string
  email: string
  phoneNo: number
  role: Roles
  password: string
  id?: string
}

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
  email?: string
  name: string | null
  id: string | null
  role: Roles
}

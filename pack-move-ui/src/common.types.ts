import { type LoginResponse } from './components/Login/Login.types'

export interface AppProps {
  userDetails?: LoginResponse | null
}

export type Roles = 'Admin' | 'Agent' | 'User'

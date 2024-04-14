import { type MenuProps } from 'antd'

export type MenuItem = Required<MenuProps>['items'][number]
export interface SelectInfo {
  key: string
  keyPath: string[]
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  selectedKeys: string[]
}

import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  ToolOutlined,
  LogoutOutlined,
  UserOutlined,
  AuditOutlined,
  ShoppingOutlined,
  NotificationOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { type AppProps } from './common.types'
import { type LoginResponse } from './components/Login/Login.types'
import { type MenuItem, type SelectInfo } from './App.types'
import { AGENT } from './common/constants'

export const App: React.FC<AppProps> = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<LoginResponse | null>(null)

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    }
  }

  const onSelected = (e: SelectInfo): void => {
    console.log('key :>> ', e)
    const key = e.key
    window.sessionStorage.setItem('key', key)
    if (key === 'logout') {
      window.sessionStorage.removeItem('user')
      window.sessionStorage.removeItem('packer')
      navigate('/login')
    } else if (key === 'services' && user?.role === AGENT) {
      navigate('/agent-dashboard')
    } else navigate(`/${key}`)
  }

  const getMenuItems = (): MenuItem[] => {
    const initialItems = [
      getItem('Quotations', 'quotations', <AuditOutlined />),
      getItem('Orders', 'orders', <ShoppingOutlined />),
      getItem('Feedbacks', 'feedbacks', <NotificationOutlined />),
      getItem('Account', 'account', <SettingOutlined />),
      getItem('Logout', 'logout', <LogoutOutlined />),
    ]
    switch (user?.role) {
      case 'Admin':
        return [
          getItem('Agents', 'packers', <AppstoreOutlined />),
          getItem('Services', 'services', <ToolOutlined />),
          getItem('Users', 'users', <UserOutlined />),
          ...initialItems,
        ]
      case 'Agent':
        return [getItem('Services', 'services', <ToolOutlined />), ...initialItems]
      case 'User':
        return [getItem('Agents', 'packers', <AppstoreOutlined />), ...initialItems]
    }
    return initialItems
  }

  const handleStorageChange = (event: StorageEvent): void => {
    console.log('listener :>> ', event)
    // Check if the storage event was triggered by sessionStorage and the 'user' key
    if (event.storageArea === sessionStorage && event.key === 'user') {
      // Parse the new user object and set it as the current user state
      const newUser = JSON.parse(event.newValue!) as LoginResponse
      setUser(newUser)
    }
  }

  useEffect(() => {
    // Try to retrieve the user object from sessionStorage
    const storedUser = sessionStorage.getItem('user')
    console.log('useEffect :>> ', storedUser)
    // If it exists, parse and set it as the current user state
    if (storedUser != null) {
      setUser(JSON.parse(storedUser))
    }

    // Listen to changes in sessionStorage
    window.addEventListener('storage', handleStorageChange)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const { Header, Content, Sider } = Layout
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <h3 className='text-white mt-3'>PACK & MOVE</h3>
      </Header>
      <Layout className='site-layout'>
        {user != null && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => {
              setCollapsed(value)
            }}
          >
            {!collapsed && <h4 className='text-white p-2 border-top'>Hello, {user.name}</h4>}
            <Menu
              theme='dark'
              defaultSelectedKeys={[
                window.sessionStorage.getItem('key') ?? window.location.pathname.replace('/', ''),
              ]}
              mode='inline'
              items={getMenuItems()}
              onSelect={onSelected}
              // selectedKeys={[window.location.pathname.replace('/', '')]}
            />
          </Sider>
        )}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

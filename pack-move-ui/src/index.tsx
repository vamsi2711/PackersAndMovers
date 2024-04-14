import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { Packers, ViewPacker } from './components/Packers'
import { Login } from './components/Login'
import { Registration, AgentRegistration } from './components/Registration'
import { Services } from './components/Services'
import { Feedback, CreateFeedback } from './components/Feedback'
import { Order } from './components/Order'
import { Users } from './components/Users'
import { Quotations, CreateQuotation } from './components/Quotations'
import { Dashboard } from './components/Admin'
import { Dashboard as AgentDashboard } from './components/Agent'
import { Dashboard as UserDashboard, Account as UserAccount } from './components/User'
import { ErrorPage } from './common/ErrorPage'
import { getAllPackers } from './common/util'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { type LoginResponse } from './components/Login/Login.types'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// const [user, setUser] = useState<LoginResponse | null>(null)
// let user: LoginResponse | null = null
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: 'packers',
        element: <Packers />,
        loader: getAllPackers,
      },
      {
        path: 'view-packer/:id',
        element: <ViewPacker />,
      },
      {
        path: 'user-dashboard',
        element: <UserDashboard />,
      },
      {
        path: 'account',
        element: <UserAccount />,
      },
      {
        path: 'agent-dashboard',
        element: <AgentDashboard />,
      },
      {
        path: 'admin-dashboard',
        element: <Dashboard />,
      },
      {
        path: 'user-register',
        element: <Registration />,
      },
      {
        path: 'agent-register',
        element: <AgentRegistration />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'quotations',
        element: <Quotations />,
      },
      {
        path: 'create-quotation',
        element: <CreateQuotation />,
      },
      {
        path: 'feedbacks',
        element: <Feedback />,
      },
      {
        path: 'create-feedback',
        element: <CreateFeedback />,
      },
      {
        path: 'orders',
        element: <Order />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

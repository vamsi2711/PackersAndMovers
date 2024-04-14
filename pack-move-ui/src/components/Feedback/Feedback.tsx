import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Tooltip, Rate, message, Popconfirm, Space } from 'antd'

import {
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'

import type { ColumnsType } from 'antd/es/table'
import { CreateFeedback } from './CreateFeedback'
import api from '../../api/feedback.resource'
import { type IFeedback } from './Feedback.types'
import { type LoginResponse } from '../Login/Login.types'
import { ADMIN, AGENT, USER } from '../../common/constants'
import { type User } from '../Registration/Registration.types'
import { type Packer } from '../Packers/Packers.types'

export const Feedback: React.FC = () => {
  const [data, setData] = useState<IFeedback[]>([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  }
  const user: LoginResponse | null =
    window.sessionStorage.getItem('user') != null
      ? JSON.parse(window.sessionStorage.getItem('user') ?? '')
      : null
  const packer: Packer | null =
    window.sessionStorage.getItem('packer') != null
      ? JSON.parse(window.sessionStorage.getItem('packer') ?? '')
      : null

  useEffect(() => {
    setLoading(true)

    api
      .getFeedbacksByRole(packer ?? user)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch(() => {
        // setData(tData)
        setLoading(false)
      })
  }, [])

  const handleDelete = (id: string | undefined): void => {
    api
      .deleteFeedback(id)
      .then((res) => {
        setData(data.filter((r) => r.id !== id))
        void messageApi.open({
          type: 'success',
          content: 'Service deleted successfully..! ',
        })
      })
      .catch((res) => {
        void messageApi.open({
          type: 'success',
          content: 'Service deleted successfully..! ',
        })
      })
    setData(data.filter((f) => f.id !== id))
  }

  const columns: ColumnsType<IFeedback> = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      render: (_, row, sno) => sno + 1,
      width: '10%',
    },
    ...(user?.role !== USER
      ? [
          {
            title: 'User Name',
            dataIndex: 'user',
            render: (user: User) => user.name,
          },
        ]
      : []),
    ...(user?.role !== AGENT
      ? [
          {
            title: 'Packer Name',
            dataIndex: 'packer',
            render: (packer: Packer) => packer.name,
          },
        ]
      : []),

    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement='topLeft' title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      render: (rating) => (
        <Rate
          disabled
          allowHalf
          defaultValue={+rating}
          // character={({ index }: { index: number }) => customIcons[index + 1]}
        />
      ),
    },
    // ...(user?.role !== AGENT
    //   ? [
    {
      title: 'Action',
      key: 'action',
      render: (_, quotationDetails) => (
        <Space size={'large'}>
        
          <Popconfirm
            placement='rightBottom'
            title={'Are you sure to delete this Service?'}
            onConfirm={() => {
              handleDelete(quotationDetails.id)
            }}
            okText='Delete'
            cancelText='No'
            key={'delete'}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
      // ]:[]
    },
  ]

  

  return (
    <>
      {contextHolder}
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

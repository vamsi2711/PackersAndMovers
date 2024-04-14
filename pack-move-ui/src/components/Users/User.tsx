import React, { useState, useEffect } from 'react'
import { Table, message, Popconfirm, Space, Tag } from 'antd'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import type { ColumnsType } from 'antd/es/table'
import api from '../../api/login.resource'
import { type Status } from './User.types'
import { type User } from '../Registration/Registration.types'
import { type Roles } from '../../common.types'

export const Users: React.FC = () => {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<User | null>(null)
  const [status, setStatus] = useState<Status>('Initiated')
  const [paymentStatus, setPaymentStatus] = useState<'Pending' | 'Done'>('Pending')

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setLoading(true)

    api
      .getAllUsers()
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
      .deleteUser(id)
      .then((res) => {
        setData(data.filter((r) => r.id !== id))
        void messageApi.open({
          type: 'success',
          content: 'uUer deleted successfully..! ',
        })
      })
      .catch((res) => {
        void messageApi.open({
          type: 'success',
          content: 'User deleted successfully..! ',
        })
      })
    setData(data.filter((f) => f.id !== id))
  }

  const columns: ColumnsType<User> = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      render: (_, row, sno) => sno + 1,
      width: '10%',
    },

    {
      title: 'User Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: 'E Mail',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: 'Phone No',
      dataIndex: 'phoneNo',
    },
    {
      title: 'Type',
      dataIndex: 'role',
      filters: [
        { text: 'Agent', value: 'Agent' },
        { text: 'User', value: 'User' },
      ],
      onFilter: (value: string | number | boolean, record) => record.role === value,

      render: (role: Roles) => <Tag color={role === 'User' ? 'blue' : 'lime'}> {role}</Tag>,
    },

    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, userDetails) => (
    //     <Space size={'large'}>
    //       <Popconfirm
    //         placement='rightBottom'
    //         title={'Are you sure to delete this User?'}
    //         onConfirm={() => {
    //           handleDelete(userDetails.id)
    //         }}
    //         okText='Delete'
    //         cancelText='No'
    //         key={'delete'}
    //       >
    //         <DeleteOutlined />
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ]
  return (
    <>
      {/* <Modal
        title={'Updating Status'}
        open={!(order == null)}
        onOk={handleOk}
        okText='Update Status'
        onCancel={handleCancel}
        destroyOnClose
      >
        <Space>
          Status :
          <Radio.Group
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
            }}
          >
            {Object.keys(statusColors).map((r) => (
              <Radio.Button key={r} value={r}>
                {r}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Space>
        <br />
        <br />
        <Space>
          Payment Status :
          <Radio.Group
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value)
            }}
          >
            <Radio.Button value='Pending'>Pending</Radio.Button>
            <Radio.Button value='Done'>Done</Radio.Button>
          </Radio.Group>
        </Space>
      </Modal> */}
      {contextHolder}
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, message, Popconfirm, Space, Tag, Modal, Radio, Popover } from 'antd'
import { DeleteOutlined, CommentOutlined, EditOutlined, DollarTwoTone } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { Payment } from './Payment'
import api from '../../api/order.resource'
import { type Status, type IOrder } from './Order.types'
import { type LoginResponse } from '../Login/Login.types'
import { AGENT, USER } from '../../common/constants'
import { type User } from '../Registration/Registration.types'
import { type Packer } from '../Packers/Packers.types'

export const Order: React.FC = () => {
  const [data, setData] = useState<IOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<IOrder | null>(null)
  const [status, setStatus] = useState<Status>('Initiated')
  const [paymentStatus, setPaymentStatus] = useState<'Pending' | 'Done'>('Pending')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()

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
      .getOrdersByRole(packer ?? user)
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
      .deleteOrder(id)
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

  const statusColors = {
    Initiated: 'warning',
    Processing: 'processing',
    Completed: 'success',
    Canceled: 'error',
  }

  const columns: ColumnsType<IOrder> = [
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
            dataIndex: 'orderedBy',
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
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Initiated', value: 'Initiated' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Completed', value: 'Completed' },
        { text: 'Canceled', value: 'Canceled' },
      ],
      onFilter: (value: string | number | boolean, record) => record.status === value,

      render: (status: Status) => <Tag color={statusColors[status]}> {status}</Tag>,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      filters: [
        { value: 'Pending', text: 'Pending' },
        { value: 'Done', text: 'Done' },
      ],
      onFilter: (value: string | number | boolean, record) => record.paymentStatus === value,

      render: (status) => <Tag color={status === 'Done' ? 'green' : 'default'}>{status}</Tag>,
    },
    // ...(user?.role !== AGENT
    //   ? [
    {
      title: 'Action',
      key: 'action',
      render: (_, orderDetails) => (
        <Space size={'large'}>
          {user?.role === AGENT ? (
            <EditOutlined
              onClick={() => {
                setOrder(orderDetails)
                setStatus(orderDetails.status)
                setPaymentStatus(orderDetails.paymentStatus)
              }}
            />
          ) : (
            <>
              {orderDetails?.paymentStatus !== 'Done' && (
                <Popover title='Make Payment'>
                  <DollarTwoTone
                    onClick={() => {
                      setIsModalOpen(true)
                      setOrder(orderDetails)
                    }}
                  />
                </Popover>
              )}

              <NavLink to='/create-feedback' state={{ orderDetails }}>
                <CommentOutlined />
              </NavLink>
              <Popconfirm
                placement='rightBottom'
                title={'Are you sure to delete this Order?'}
                onConfirm={() => {
                  handleDelete(orderDetails.id)
                }}
                okText='Delete'
                cancelText='No'
                key={'delete'}
              >
                <DeleteOutlined />
              </Popconfirm>
            </>
          )}
        </Space>
      ),
      // ]:[]
    },
  ]
  const handleCancel = (): void => {
    setOrder(null)
    setIsModalOpen(false)
  }

  let odr: IOrder
  const handleOk = (isPayment: boolean): void => {
    const updatedOrders: IOrder[] = data.map((p) => {
      if (p.id === order?.id) {
        odr = isPayment
          ? { ...p, status: 'Processing', paymentStatus: 'Done' }
          : { ...p, status, paymentStatus }
        return odr
      }
      return { ...p }
    })
    void api
      .editOrder(odr)
      .then((res) => {
        void messageApi.open({
          type: 'success',
          content: 'Order updated successfully..! ',
        })
        setData(updatedOrders)
      })
      .catch((res) => {
        void messageApi.open({
          type: 'error',
          content: 'something went wrong please try again...! ',
        })
      })
    setIsModalOpen(false)
    setOrder(null)
  }
  return (
    <>
      <Modal
        title={'Updating Status'}
        open={!(order == null)}
        onOk={() => {
          handleOk(false)
        }}
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
      </Modal>
      <Payment
        onFinish={handleOk}
        // onFinishFailed={onFinishFailed}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        order={order!}
      />
      {contextHolder}

      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Tooltip, message, Popconfirm, Space, Tag, Popover, Modal, Input } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CommentOutlined,
} from '@ant-design/icons'

import type { ColumnsType } from 'antd/es/table'
import api from '../../api/quotation.resource'
import orderApi from '../../api/order.resource'
import type { Quotation } from './Quotations.types'
import { type LoginResponse } from '../Login/Login.types'
import { AGENT, USER } from '../../common/constants'
import { type Packer } from '../Packers/Packers.types'
import { type User } from '../Registration/Registration.types'
import { type ServiceType } from '../Services/Service.types'

export const Quotations: React.FC = () => {
  const [data, setData] = useState<Quotation[]>([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [addComment, setAddComment] = useState<Quotation | null>(null)
  const [comments, setComments] = useState<string | undefined>('')
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
      .getQuotationsByRole(packer ?? user)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch(() => {
        // setData(tData)
        setLoading(false)
      })
  }, [])

  const handleDelete = (id: string | undefined, mute: boolean): void => {
    api
      .deleteQuotation(id)
      .then((res) => {
        setData(data.filter((r) => r.id !== id))
        if (!mute) {
          void messageApi.open({
            type: 'success',
            content: 'Service deleted successfully..! ',
          })
        }
      })
      .catch((res) => {
        setData(data.filter((r) => r.id !== id))
        if (!mute) {
          void messageApi.open({
            type: 'success',
            content: 'Service deleted successfully..! ',
          })
        }
      })
  }

  const handleAccept = (quotation: Quotation): void => {
    orderApi
      .createOrder({
        orderedBy: quotation.quotedBy,
        packer: quotation.packer,
        quotation,
        date: new Date().toISOString().split('T')[0],
        status: 'Initiated',
        paymentStatus: 'Pending',
      })
      .then((res) => {
        let qu
        const updatedQuotations = data.map((p) => {
          if (p.id === quotation?.id) {
            qu = { ...p, status: 'Approved' }
            return qu
          }
          return { ...p }
        })
        void api
          .editQuotation(qu)
          .then((res) => {
            // void messageApi.open({
            //   type: 'success',
            //   content: 'Added comment successfully..! ',
            // })
            setData(updatedQuotations)
          })
          .catch((res) => {
            void messageApi.open({
              type: 'error',
              content: 'something went wrong please try again...! ',
            })
          })
        void messageApi.open({
          type: 'success',
          content: 'Created order successfully..! ',
        })
      })
      .catch((res) => {
        void messageApi.open({
          type: 'success',
          content: 'Order Failed, Please try again later..! ',
        })
      })
  }

  const columns: ColumnsType<Quotation> = [
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
            title: 'Quoted By',
            dataIndex: 'quotedBy',
            render: (user: User) => user?.name,
            // sorter: (a: any, b: any) => a.name.length - b.name.length,
          },
        ]
      : []),
    ...(user?.role !== AGENT
      ? [
          {
            title: 'Packer',
            dataIndex: 'packer',
            render: (packer: Packer) => packer?.name,
            // sorter: (a: any, b: any) => a.name.length - b.name.length,
          },
        ]
      : []),
    {
      title: 'Service',
      dataIndex: 'serviceType',
      render: (service: ServiceType) => service?.serviceType,
      // sorter: (a: any, b: any) => a.serviceType.length - b.serviceType.length,
    },

    {
      title: 'Date',
      dataIndex: 'date',
      // sorter: (a, b) => a.date.length - b.date.length,
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
      title: 'Quotation',
      dataIndex: 'amount',
      render: (amt) => <>$ {amt}</>,
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <Tag color={status === 'Approved' ? 'green' : 'blue'}>{status}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, quotationDetails) => (
        <Space size={'large'}>
          {user?.role === USER && (
            <>
              <NavLink to='/create-quotation' state={{ quotationDetails }}>
                <EditOutlined />
              </NavLink>
              <Popconfirm
                placement='rightBottom'
                title={'Are you sure to delete this Quotation?'}
                onConfirm={() => {
                  handleDelete(quotationDetails.id, false)
                }}
                okText='Delete'
                cancelText='No'
                key={'delete'}
              >
                <DeleteOutlined />
              </Popconfirm>
            </>
          )}
          {user?.role === AGENT && (
            <>
              <Popover title='Add Comments'>
                <CommentOutlined
                  disabled={quotationDetails.status === 'Approved'}
                  onClick={() => {
                    setAddComment(quotationDetails)
                    setComments(quotationDetails?.comments)
                  }}
                />
              </Popover>
              <Popconfirm
                placement='rightBottom'
                title={'Are you sure to convert this to Order?'}
                onConfirm={() => {
                  handleAccept(quotationDetails)
                }}
                okText='Place Order'
                cancelText='No'
                key={'delete'}
                disabled={quotationDetails.status === 'Approved'}
              >
                <CheckCircleOutlined />
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ]

  // const tData: Quotation[] = [
  //   {
  //     quotedBy: 'Srikanth',
  //     packerId: 'Anytown Packers',
  //     serviceId: 'House Shifting',
  //     date: '2023-03-05',
  //     description: `Our team is dedicated to ensuring the safe and timely transport of our clients
  //           belongings, no matter the distance.`,
  //     comments: 'comments',
  //   },
  //   {
  //     quotedBy: 'Srikanth',
  //     packerId: 'Anytown Packers',
  //     serviceId: 'House Shifting',
  //     date: '2023-03-05',
  //     description: `Our team is dedicated to ensuring the safe and timely transport of our clients
  //           belongings, no matter the distance.`,
  //     comments: 'comments',
  //   },
  //   {
  //     quotedBy: 'Srikanth',
  //     packerId: 'Anytown Packers',
  //     serviceId: 'House Shifting',
  //     date: '2023-03-05',
  //     description: `Our team is dedicated to ensuring the safe and timely transport of our clients
  //           belongings, no matter the distance.`,
  //     comments: 'comments',
  //   },
  //   {
  //     quotedBy: 'Srikanth',
  //     packerId: 'Anytown Packers',
  //     serviceId: 'House Shifting',
  //     date: '2023-03-05',
  //     description: `Our team is dedicated to ensuring the safe and timely transport of our clients
  //           belongings, no matter the distance.`,
  //     comments: 'comments',
  //   },
  //   {
  //     quotedBy: 'Srikanth',
  //     packerId: 'Anytown Packers',
  //     serviceId: 'House Shifting',
  //     date: '2023-03-05',
  //     description: `Our team is dedicated to ensuring the safe and timely transport of our clients
  //           belongings, no matter the distance.`,
  //     comments: 'comments',
  //   },
  //   {
  //     quotedBy: 'Srikanth',
  //     packerId: 'Anytown Packers',
  //     serviceId: 'House Shifting',
  //     date: '2023-03-05',
  //     description: `Our team is dedicated to ensuring the safe and timely transport of our clients
  //           belongings, no matter the distance.`,
  //     comments: 'comments',
  //   },
  // ]
  const handleCancel = (): void => {
    setAddComment(null)
  }
  const handleOk = (): void => {
    let qu
    const updatedQuotations = data.map((p) => {
      if (p.id === addComment?.id) {
        qu = { ...p, comments }
        return { ...p, comments }
      }
      return { ...p }
    })
    void api
      .editQuotation(qu)
      .then((res) => {
        void messageApi.open({
          type: 'success',
          content: 'Added comment successfully..! ',
        })
        setData(updatedQuotations)
      })
      .catch((res) => {
        void messageApi.open({
          type: 'error',
          content: 'something went wrong please try again...! ',
        })
      })
    setAddComment(null)
  }
  return (
    <>
      <Modal
        title={'Adding comments'}
        open={!(addComment == null)}
        onOk={handleOk}
        okText='Add Comment'
        onCancel={handleCancel}
        destroyOnClose
      >
        <Input
          title='Comments'
          value={comments}
          onChange={(e) => {
            setComments(e.target.value)
          }}
        />
      </Modal>
      {contextHolder}
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

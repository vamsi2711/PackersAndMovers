import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, message, Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import api from '../../api/service.resource'
import type { ServiceType } from './Service.types'
import { CreateService } from './CreateService'
export const Services: React.FC = () => {
  const [data, setData] = useState<ServiceType[]>([])
  const [loading, setLoading] = useState(false)
  const [serviceDetails, setServiceTypeDetails] = useState<ServiceType>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setLoading(true)
    api
      .getAllServices()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch(() => {
        setData(tData)
        setLoading(false)
      })
  }, [])

  const showModal = (service: ServiceType | undefined): void => {
    setIsModalOpen(true)
    setServiceTypeDetails(service)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const handleDelete = (id: string | undefined): void => {
    api
      .deleteService(id)
      .then((res) => {
        setData(data.filter((r) => r.id !== id))
        void messageApi.open({
          type: 'success',
          content: 'Service deleted successfully..! ',
        })
      })
      .catch((res) => {
        void messageApi.open({
          type: 'error',
          content: 'Error while deleting Service..!',
        })
      })
  }
  const onFinish = (service: ServiceType): void => {
    if (serviceDetails?.id != null) {
      api
        .editService({ ...service, id: serviceDetails.id })
        .then((res) => {
          const updatedService = data.map((p) => {
            if (p.id === service.id) {
              return { ...service }
            }
            return { ...p }
          })
          setData(updatedService)
          void messageApi.open({
            type: 'success',
            content: 'Service Edited successfully..! ',
          })
        })
        .catch((res) => {
          void messageApi.open({
            type: 'error',
            content: 'Error while editing Service..!',
          })
        })
    } else {
      api
        .createService(service)
        .then((res) => {
          console.log('created :>> ', res)
          setData([...data, { ...res }])
        })
        .catch((res) => {
          console.log('create failed :>> ', res)
        })
    }
    setIsModalOpen(false)
  }
  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }
  const columns: ColumnsType<ServiceType> = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      render: (_, row, sno) => sno + 1,
      width: '10%',
    },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
      sorter: (a, b) => a.serviceType.length - b.serviceType.length,
    },

    {
      title: 'Status',
      dataIndex: 'active',
      filters: [
        { text: 'Active', value: true },
        { text: 'In Active', value: false },
      ],
      onFilter: (value: string | number | boolean, record) => record.active === value,
      render: (_, { active }) => (
        // eslint-disable-next-line no-extra-boolean-cast
        <Tag color={!!active ? 'green' : 'red'}>{!!active ? 'Active' : 'In Active'}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, service) => (
        <Space size={'large'}>
          <EditOutlined
            onClick={() => {
              showModal(service)
            }}
          />
          <Popconfirm
            placement='rightBottom'
            title={'Are you sure to delete this Service?'}
            // description={'description'}
            onConfirm={() => {
              handleDelete(service.id)
            }}
            okText='Delete'
            cancelText='No'
            key={'delete'}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const tData: ServiceType[] = [
    {
      serviceType: 'Car Shifting',
      active: true,
    },
    {
      serviceType: 'House Shifting',
      active: true,
    },
    {
      serviceType: 'Office Shifting',
      active: true,
    },
    {
      serviceType: 'John Brown',
      active: false,
    },
    {
      serviceType: 'John Brown',
      active: true,
    },
  ]

  return (
    <>
      <div className='d-flex justify-content-end align-items-center mt-2'>
        {contextHolder}
        <Button
          type='primary'
          className=' m-3'
          onClick={() => {
            showModal(undefined)
          }}
        >
          Create Service
        </Button>
      </div>
      <CreateService
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        service={serviceDetails}
      />
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

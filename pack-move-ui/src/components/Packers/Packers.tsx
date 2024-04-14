import React, { useState } from 'react'
import { Card, Row, Col, Button, Popconfirm, Typography, Image, Input } from 'antd'
import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { useLoaderData, NavLink } from 'react-router-dom'
import api from '../../api/packers.resource'
import { CreatePacker } from './CreatePacker'
import { type Packer } from './Packers.types'
import { type LoginResponse } from '../Login/Login.types'
import { ADMIN } from '../../common/constants'

export const Packers: React.FC = () => {
  const packersData: unknown = useLoaderData()
  let packers = packersData as Packer[]
  const [packerDetails, setPackerDetails] = useState<Packer>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filteredPackers, setFilteredPackers] = useState<Packer[]>(packers)
  const [user, setUser] = useState<LoginResponse | null>(
    window.sessionStorage.getItem('user') != null
      ? JSON.parse(window.sessionStorage.getItem('user') ?? '')
      : null,
  )
  const onFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value
    setFilteredPackers(
      packers.filter(
        (packer) =>
          packer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          packer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          packer.services?.filter((ser) =>
            ser?.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()),
          ).length,
        // packer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // packer.phoneNo === +searchTerm,
      ),
    )
  }

  const showModal = (packer: Packer | undefined): void => {
    setIsModalOpen(true)
    setPackerDetails(packer)
  }
  const confirm = (packerID: string): void => {
    // message.info('Clicked on Yes.');
    api
      .deletePacker(packerID)
      .then((res) => {
        console.log('deleted :>> ', res)
        setFilteredPackers(packers.filter((p) => p.id !== packerID))
        packers = filteredPackers
      })
      .catch((res) => {
        console.log('deleted  :>> ', res)
        setFilteredPackers(packers.filter((p) => p.id !== packerID))
        packers = filteredPackers
      })
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }
  const onFinish = (packer: Packer): void => {
    if (packerDetails?.id != null) {
      api
        .editPacker({ ...packer, id: packerDetails.id })
        .then((res) => {
          console.log('updated :>> ', res)
          const updatedPackers = packers.map((p) => {
            if (p.id === packerDetails.id) {
              return { ...packer }
            }
            return { ...p }
          })
          setFilteredPackers([...updatedPackers])
          packers = filteredPackers
        })
        .catch((res) => {
          console.log('update failed :>> ', res)
        })
    } else {
      api
        .createPacker(packer)
        .then((res) => {
          console.log('created :>> ', res)
          setFilteredPackers([...packers, { ...res }])
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
  console.log('packers :>> ', packers)
  return (
    <>
      <div className='d-flex justify-content-end align-items-center mt-2'>
        {/* {user?.role === ADMIN && (
          <Button
            type='primary'
            // className='w-25 m-3'
            onClick={() => {
              showModal(undefined)
            }}
          >
            Create Packer
          </Button>
        )} */}
        Search : 
        <Input
        
          placeholder='Filter agent by Name or Services or Place'
          allowClear
          className='mx-3'
          style={{ width: '15rem' }}
          size='large'
          onChange={onFilter}
        />
      </div>
      <CreatePacker
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        packer={packerDetails}
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='m-2' align='middle'>
        {filteredPackers.map((packer: Packer, i) => (
          <Col key={packer.id} className='gutter-row py-3' span={5}>
            <Card
              // title={packer.name}
              // style={{ width: 200 }}
              size='small'
              bordered={false}
              cover={
                <Image
                  alt='example'
                  src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                  preview={false}
                  // height={150}
                  // width={250}
                  // src={`https://source.unsplash.com/random/200×200?sig=${i}`}
                />
              }
              actions={[
                ...(user?.role === ADMIN
                  ? [
                      <Popconfirm
                        placement='rightBottom'
                        title={'Are you sure to delete this Packer?'}
                        description={'description'}
                        onConfirm={() => {
                          confirm(packer.id)
                        }}
                        okText='Delete'
                        cancelText='No'
                        key={'delete'}
                      >
                        <DeleteOutlined />
                      </Popconfirm>,
                      <EditOutlined
                        key='edit'
                        onClick={() => {
                          showModal(packer)
                        }}
                      />,
                    ]
                  : []),
                <NavLink to={`/view-packer/${packer.id}`} state={{ packer }} key='ellipsis'>
                  <EllipsisOutlined />
                </NavLink>,
              ]}
            >
              <Card.Meta
                title={packer.name}
                description={
                  <div>
                    <div className='d-flex justify-content-between'>
                      {/* <Typography.Text>Ph No : {packer.phoneNo}</Typography.Text> */}
                      <Typography.Text strong>Services</Typography.Text>
                      <Typography.Text>{packer.city}</Typography.Text>
                    </div>
                    {packer.services?.map((ser) => (
                      <div key={ser.id}>
                        <Typography.Text>{ser.serviceType}</Typography.Text>
                        <br />
                      </div>
                    ))}
                    {/* <Typography.Text>G Mail : {packer.email}</Typography.Text> */}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

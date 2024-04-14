import React, { useEffect, useState } from 'react'
import { Button, Transfer, Typography, message } from 'antd'
import type { TransferDirection } from 'antd/es/transfer'
import api from '../../api/packers.resource'
import serviceApi from '../../api/service.resource'
import { type LoginResponse } from '../Login/Login.types'
import { type RecordType } from './Dashboard.types'
import { type ServiceType } from '../Services/Service.types'
import { type Service, type Packer } from '../Packers/Packers.types'
export const Dashboard: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [serviceTypes, setServiceTypes] = useState([])
  const [services, setServices] = useState([])
  const [packer, setPacker] = useState<Packer | null>(null)

  const user: LoginResponse | null =
    window.sessionStorage.getItem('user') != null
      ? JSON.parse(window.sessionStorage.getItem('user') ?? '')
      : null
  useEffect(() => {
    api
      .getPackerByUserId(user?.id)
      .then((res) => {
        setPacker(res)
        window.sessionStorage.setItem('packer', JSON.stringify(res))
      })
      .catch((res) => {
        console.log('res :>> ', res)
      })
    serviceApi
      .getAllServices()
      .then((res) => {
        setServices(res)
        setServiceTypes(
          res.map((s: ServiceType) => {
            return {
              key: s.id,
              title: s.serviceType,
            }
          }),
        )
      })
      .catch(() => {
        // setServices(options)
      })
  }, [])

  useEffect(() => {
    if (packer != null) {
      setTargetKeys(packer?.services?.map((item: Service) => item.id))
    }
    console.log('useEffect :>> ')
  }, [packer])

  const [targetKeys, setTargetKeys] = useState<string[] | undefined>()
  console.log('ser :>> ', serviceTypes)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[],
  ): void => {
    console.log('targetKeys:', nextTargetKeys)
    console.log('direction:', direction)
    console.log('moveKeys:', moveKeys)
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]): void => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys)
    console.log('targetSelectedKeys:', targetSelectedKeys)
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const handleUpdate = (): void => {
    console.log('services :>> ', services)
    api
      .editPacker({
        ...packer,
        services: [...services.filter((r: Service) => targetKeys?.includes(r.id))],
      })
      .then((res) => {
        console.log('res :>> ', res)
        void messageApi.open({
          type: 'success',
          content: ' Updated successfully..! ',
        })
      })
      .catch((res) => {
        void messageApi.open({
          type: 'error',
          content: 'Error while updating ..!',
        })
      })
  }

  // const onScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
  //   console.log('direction:', direction)
  //   console.log('target:', e.target)
  // }
  return (
    <div className='m-3'  style={{ width: 'fit-content' }}>
      {contextHolder}
      <div
        className='d-flex  justify-content-between align-items-center mb-3'
       
      >
        <Typography.Text>Available Service Types</Typography.Text>
        <Typography.Text>Assigned Service Types</Typography.Text>
      </div>
      <Transfer
        className='ml-3'
        dataSource={serviceTypes}
        // titles={['Available Service Types', 'Selected Service Types']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        // onScroll={onScroll}
        render={(item: RecordType) => item.title}
        oneWay
      />
      <Button
        style={{
          marginTop: '5%',
          marginLeft: '34%',
        }}
        onClick={handleUpdate}
      >
        Update Services
      </Button>
    </div>
  )
}

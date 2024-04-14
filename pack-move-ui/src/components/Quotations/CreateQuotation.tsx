/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input, InputNumber, Space, Select, message, DatePicker } from 'antd'
import { type Quotation } from './Quotations.types'
import api from '../../api/quotation.resource'
import { type Service } from '../Packers/Packers.types'
import { type ServiceType } from '../Services/Service.types'
import { type LoginResponse } from '../Login/Login.types'
import { DATE_FORMAT } from '../../common/constants'
import dayjs, { Dayjs } from 'dayjs'

export const CreateQuotation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const {
    state: { packer, quotationDetails },
  } = location
  const quotedBy: LoginResponse | null =
    window.sessionStorage.getItem('user') != null
      ? JSON.parse(window.sessionStorage.getItem('user') ?? '')
      : null
  const initialValues = {
    packerId: quotationDetails ? quotationDetails.packer?.name : packer?.name,
    date: quotationDetails?.date,
    ...quotationDetails,
  }
  console.log('qu :>> ', quotationDetails)
  console.log('packer :>> ', packer)
  const onFinish = (quotation: Quotation): void => {
    // const date = quotation.date.format('YYYY-MM-DD')
    console.log('quotation :>> ', quotation)
    if (quotationDetails?.id != null) {
      api
        .editQuotation({
          ...quotationDetails,
          description: quotation.description,
          comments: quotation.comments,
          amount: quotation.amount,
          date:
            typeof quotation.date === 'string'
              ? quotation.date.split('T')[0]
              : quotation.date.format('YYYY-MM-DD'),
          status: 'Pending',
        })
        .then((res) => {
          void messageApi.open({
            type: 'success',
            content: 'Quotation updated successfully..! ',
          })
          form.resetFields()
          navigate('/quotations')
        })
        .catch((res) => {
          void messageApi.open({
            type: 'error',
            content: 'Error while updating Quotation..!',
          })
        })
    } else {
      api
        .createQuotation({
          ...quotation,
          date:
            typeof quotation.date === 'string'
              ? quotation.date.split('T')[0]
              : quotation.date.format('YYYY-MM-DD'),
          quotedBy,
          packer,
          serviceType: packer.services?.find((ser: ServiceType) => ser.id === quotation.serviceId),
          status: 'Pending',
        })
        .then((res) => {
          void messageApi.open({
            type: 'success',
            content: 'Quotation created successfully..! ',
          })
          form.resetFields()
          navigate('/quotations')
        })
        .catch((res) => {
          void messageApi.open({
            type: 'error',
            content: 'Error while creating Quotation..!',
          })
        })
    }
  }
  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }
  return (
    <>
      {contextHolder}
      <h4 className='m-3'>Request a Quotation</h4>
      <Form
        name='create-service'
        className='m-3'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        preserve={false}
      >
        <Form.Item label='Packer' name='packerId'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='Service Type' name='serviceId'>
          <Select
            {...(quotationDetails
              ? { disabled: true, defaultValue: quotationDetails.serviceType?.serviceType }
              : {})}
          >
            {packer?.services.map((service: Service) => (
              <Select.Option key={service.id}>{service.serviceType}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label='Date'
          valuePropName='date'
          name='date'
          rules={[{ type: 'object' as const, required: true, message: 'Please select date!' }]}
        >
          <DatePicker
            format={DATE_FORMAT}
            // eslint-disable-next-line no-extra-boolean-cast
            {...(Boolean(quotationDetails)
              ? [{ defaultValue: dayjs(quotationDetails?.date, DATE_FORMAT) }]
              : [])}
          />
        </Form.Item>
        <Form.Item label='Quotation Amount' name='amount'>
          <InputNumber addonAfter='$' min={0} step={10} />
        </Form.Item>

        <Space wrap className='d-flex justify-content-center'>
          <Button
            className='mr-3'
            onClick={() => {
              navigate('/packers')
            }}
          >
            Back to Packers
          </Button>
          <Button type='primary' htmlType='submit'>
            Request
          </Button>
        </Space>
      </Form>
    </>
  )
}

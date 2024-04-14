import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input, DatePicker, Space, Select, message } from 'antd'
import dayjs from 'dayjs'
import { type IOrder } from './User.types'
import api from '../../api/quotation.resource'
import { DATE_FORMAT } from '../../common/constants'
import { type Service } from '../Packers/Packers.types'

export const CreateOrder: React.FC = () =>
  // onFinish,
  // onFinishFailed,
  // isModalOpen,
  // handleCancel,
  // service,
  {
    const navigate = useNavigate()
    const location = useLocation()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const {
      state: { packer, quotationDetails },
    } = location
    const initialValues = {
      packerId: packer?.name,
      date: dayjs(quotationDetails?.date, DATE_FORMAT),
      ...quotationDetails,
      // serviceId: 'demo',
      // description: 'description',
      // comments: 'comments',
    }
    console.log('qu :>> ', quotationDetails)
    // const title = service != null ? 'Edit' : 'Create'
    const onFinish = (quotation: IOrder): void => {
      // const date = quotation.date.format('YYYY-MM-DD')
      if (quotationDetails?.id != null) {
        api
          .editQuotation({ ...quotation, id: quotationDetails.id })
          .then((res) => {
            void messageApi.open({
              type: 'success',
              content: 'Quotation updated successfully..! ',
            })
            form.resetFields()
          })
          .catch((res) => {
            void messageApi.open({
              type: 'error',
              content: 'Error while updating Quotation..!',
            })
          })
      } else {
        api
          .createQuotation(quotation)
          .then((res) => {
            void messageApi.open({
              type: 'success',
              content: 'Quotation created successfully..! ',
            })
            form.resetFields()
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
            <Select>
              <Select.Option value='demo'>Demo</Select.Option>
              {packer?.services.map((service: Service) => (
                <Select.Option key={service.id}>{service.serviceType}</Select.Option>
              ))}
            </Select>
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
          <Form.Item label='Description' name='description'>
            <Input />
          </Form.Item>
          <Form.Item label='Comments' name='comments'>
            <Input />
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

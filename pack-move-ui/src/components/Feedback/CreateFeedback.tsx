import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input, DatePicker, Space, Rate, message } from 'antd'
import { type IFeedback } from './Feedback.types'
import api from '../../api/feedback.resource'
import { DATE_FORMAT } from '../../common/constants'

export const CreateFeedback: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const {
    state: { orderDetails },
  } = location
  const initialValues = {
    packerId: orderDetails?.packer?.name,
  }
  console.log('orderDetails :>> ', orderDetails)
  const onFinish = (feedback: IFeedback): void => {
    // if (orderDetails?.id != null) {
    //   api
    //     .editFeedback({ ...feedback, id: orderDetails.id })
    //     .then((res) => {
    //       void messageApi.open({
    //         type: 'success',
    //         content: 'Quotation updated successfully..! ',
    //       })
    //       form.resetFields()
    //     })
    //     .catch((res) => {
    //       void messageApi.open({
    //         type: 'error',
    //         content: 'Error while updating Quotation..!',
    //       })
    //     })
    // } else {
    const feedbackDetails = {
      ...feedback,
      user: orderDetails?.orderedBy,
      packer: orderDetails?.packer,
      date: new Date().toISOString().split('T')[0],
    }
    api
      .createFeedback(feedbackDetails)
      .then((res) => {
        form.resetFields()
        void messageApi.open({
          type: 'success',
          content: 'Quotation created successfully..! ',
        })
        navigate('/feedbacks')
      })
      .catch((res) => {
        void messageApi.open({
          type: 'error',
          content: 'Error while creating Quotation..!',
        })
      })
    // }
  }
  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }
  return (
    <>
      {contextHolder}
      <h4 className='m-3'>Providing a Feedback for {orderDetails?.packer?.name}</h4>
      <Form
        name='create-feedback'
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
        <Form.Item label='Rating' name='rating'>
          <Rate allowHalf />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Space wrap className='d-flex justify-content-center'>
          <Button
            className='mr-3'
            onClick={() => {
              navigate('/orders')
            }}
          >
            Back to Orders
          </Button>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Space>
      </Form>
    </>
  )
}

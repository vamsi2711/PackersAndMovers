import React from 'react'
import { Button, Form, Input, Modal, Space, DatePicker } from 'antd'
import { type PaymentProps } from './Order.types'

export const Payment: React.FC<PaymentProps> = ({
  onFinish,
  // onFinishFailed,
  isModalOpen,
  handleCancel,
  order,
}) => {
  return (
    <Modal
      title={`Making Payment for ${order?.packer != null ? order.packer.name : ''}`}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        name='make-payment'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ amount: order?.quotation?.amount }}
        onFinish={() => {
          onFinish(true)
        }}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
        preserve={false}
      >
        <Form.Item
          label='Amount'
          name='amount'
          // rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label='Card No'
          name='cardNo'
          rules={[
            {
              required: true,
              message: 'Please enter your Card Number!',
            },
            {
              pattern:
                // /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
                /^[0-9]{14,16}$/,
              message: 'Please enter valid Card Number!',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Month'
          name='phoneNo'
          rules={[{ required: true, message: 'Please enter your Month and Year!' }]}
        >
          <DatePicker picker='month' format={'MM/YY'} bordered={false} />
        </Form.Item>

        {/* <Form.Item
          label='Year'
          name='city'
          rules={[{ required: true, message: 'Please enter your Year!' }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label='Name'
          name='state'
          rules={[{ required: true, message: 'Please enter your Name!' }]}
        >
          <Input />
        </Form.Item>

        <Space wrap className='d-flex justify-content-end'>
          <Button onClick={handleCancel} className='mr-3'>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit'>
            Pay
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

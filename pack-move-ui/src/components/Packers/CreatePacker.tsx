import React from 'react'
import { Button, Form, Input, Modal, Space } from 'antd'
import { type CreateParkerProps } from './Packers.types'

export const CreatePacker: React.FC<CreateParkerProps> = ({
  onFinish,
  onFinishFailed,
  isModalOpen,
  handleCancel,
  packer,
}) => {
  const title = packer != null ? 'Edit' : 'Create'
  return (
    <Modal
      title={`${title} Packer`}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        name='create-packer'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={packer}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        preserve={false}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Phone No'
          name='phoneNo'
          rules={[{ required: true, message: 'Please enter your phone no!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='City'
          name='city'
          rules={[{ required: true, message: 'Please enter your city!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='State'
          name='state'
          rules={[{ required: true, message: 'Please enter your state!' }]}
        >
          <Input />
        </Form.Item>

        <Space wrap className='d-flex justify-content-end'>
          <Button onClick={handleCancel} className='mr-3'>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit'>
            {title}
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

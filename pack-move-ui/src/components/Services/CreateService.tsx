import React from 'react'
import { Button, Form, Input, Modal, Space, Switch } from 'antd'
import { type CreateServiceProps } from './Service.types'

export const CreateService: React.FC<CreateServiceProps> = ({
  onFinish,
  onFinishFailed,
  isModalOpen,
  handleCancel,
  service,
}) => {
  const title = service != null ? 'Edit' : 'Create'
  return (
    <Modal
      title={`${title} Service`}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        name='create-service'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={service ?? { active: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        preserve={false}
      >
        <Form.Item
          label='Service Type'
          name='serviceType'
          rules={[{ required: true, message: 'Please enter Service Type!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='active' valuePropName='active'>
          <Switch />
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

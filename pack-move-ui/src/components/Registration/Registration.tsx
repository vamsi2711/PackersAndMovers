/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { type LoginProps } from './Registration.types'
import api from '../../api/login.resource'
import { passwordRegex } from '../../common/constants'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export const Registration: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = (userDetails: any) => {
    console.log('Received values of form: ', userDetails)

    api
      .registerUser({ ...userDetails, role: 'User' })
      .then((res) => {
        void messageApi.open({
          type: 'success',
          content: 'User registered successfully..! ',
        })
        form.resetFields()
      })
      .catch((res) => {
        void messageApi.open({
          type: 'error',
          content: 'Error while registering user..!',
        })
      })
    // navigate('/login')
  }
  return (
    <div className='mt-3'>
      {contextHolder}
      <h3 className='my-3 text-center'>User Registration</h3>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{}}
        style={{ maxWidth: 600 }}
        className='m-auto'
        scrollToFirstError
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter your Name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The enter is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please enter your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
            {
              pattern: passwordRegex,
              message:
                'Password must be combination of Alphabets, number with special characters!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  await Promise.resolve()
                  return
                }
                return await Promise.reject(
                  new Error('Confirm password is not matching with above password!'),
                )
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='phoneNo'
          label='Phone Number'
          rules={[{ required: true, message: 'Please enter your phone number!' }]}
        >
          <Input
            addonBefore={
              <Form.Item name='prefix' noStyle>
                +1
              </Form.Item>
            }
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
          <Button
            type='link'
            className='ml-3'
            onClick={() => {
              navigate('/login')
            }}
          >
            Back to Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

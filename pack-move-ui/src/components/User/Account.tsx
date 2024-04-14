/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import api from '../../api/login.resource'
import { type User, type LoginResponse } from '../Registration/Registration.types'
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

export const Account: React.FC = () => {
  const [form] = Form.useForm()
  const oldPassword = Form.useWatch('oldPassword', form)
  const [password, setPassword] = useState('')
  const [userDetails, setUserDetails] = useState<User>()
  const user: LoginResponse | null =
    window.sessionStorage.getItem('user') != null
      ? JSON.parse(window.sessionStorage.getItem('user') ?? '')
      : null

  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    return () => {
      api
        .getUserById(user?.id)
        .then((res) => {
          console.log('res :>> ', res)
          setUserDetails({ ...res })
          setPassword(res.password)
        })
        .catch((res) => {
          console.log('res :>> ', res)
        })
    }
  }, [])

  const onFinish = (userDetails: User): void => {
    console.log('Received values of form: ', userDetails)

    api
      .editUser({
        ...userDetails,
        id: user?.id,
        password: userDetails.newPassword ?? password,
      })
      .then((res) => {
        void messageApi.open({
          type: 'success',
          content: 'User Updated successfully..! ',
        })
        // form.resetFields()
        setUserDetails({
          ...userDetails,
          password: userDetails.newPassword ?? password,
        })
      })
      .catch((res) => {
        void messageApi.open({
          type: 'error',
          content: 'Error while updating user..!',
        })
      })
    // navigate('/login')
  }
  return (
    <div className='mt-3'>
      {contextHolder}
      <h3 className='my-3 text-center'>Update Account Details</h3>
      {userDetails ? (
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          initialValues={userDetails}
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

          <Form.Item name='email' label='E-mail'>
            <Input disabled />
          </Form.Item>

          <Form.Item
            name='oldPassword'
            label='Old Password'
            rules={[
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  console.log('value :>> ', value, password)
                  if (!value || password === value) {
                    await Promise.resolve()
                    return
                  }
                  return await Promise.reject(new Error('Old Password is incorrect!'))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='newPassword'
            label='New password'
            dependencies={['oldPassword']}
            rules={[
              {
                pattern: passwordRegex,
                message:
                  'Password must be combination of Alphabets, number with special characters!',
              },
              {
                required: !!oldPassword,
                message: 'Please enter your new password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='confirm'
            label='Confirm New Password'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: !!oldPassword,
                message: 'Please enter your confirm new password!',
              },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  if (!value || getFieldValue('newPassword') === value) {
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
              Update
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Spin size='large' className='d-flex align-items-center justify-content-center' />
      )}
    </div>
  )
}

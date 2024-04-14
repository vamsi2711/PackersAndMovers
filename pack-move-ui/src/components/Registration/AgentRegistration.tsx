/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Upload, message, type SelectProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import api from '../../api/login.resource'
import serviceApi from '../../api/service.resource'
import { type User } from './Registration.types'
import { type Packer } from '../Packers/Packers.types'
import { type ServiceType } from '../Services/Service.types'
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

export const AgentRegistration: React.FC = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [cities, setCities] = useState<Array<{ label: string; value: string }>>([])
  const [services, setServices] = useState([])
  const [serviceTypes, setServiceTypes] = useState([])
  useEffect(() => {
    serviceApi
      .getAllServices()
      .then((res) => {
        setServiceTypes(
          res.map((s: ServiceType) => {
            return {
              label: s.serviceType,
              value: s.serviceType,
            }
          }),
        )
        setServices(res)
      })
      .catch(() => {
        // setServices(options)
      })
    void fetch(
      'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
    )
      .then(async (response) => await response.json())
      .then((data) => {
        setCities(
          data.map((city: any) => {
            return {
              label: city.city,
              value: city.city,
            }
          }),
        )
      })
  }, [])

  const navigate = useNavigate()

  //   window.sessionStorage.removeItem('user')
  const options: SelectProps['options'] = []

  for (let i = 10; i < 36; i++) {
    options.push({
      label: 'Service ' + i.toString(36),
      value: 'service ' + i.toString(36),
    })
  }
  const onFinish = (userDetails: any) => {
    console.log('Received values of form: ', userDetails)
    const user: User = {
      name: userDetails.name,
      email: userDetails.email,
      phoneNo: userDetails.phone,
      role: 'Agent',
      password: userDetails.password,
    }

    const packer: Packer = {
      id: '',
      name: userDetails.packerName,
      email: userDetails.email,
      phoneNo: userDetails.phone,
      description: userDetails.description,
      city: userDetails.city,
      state: userDetails.state,
      user,
      services: services.filter((s: ServiceType) =>
        userDetails.serviceTypes.includes(s.serviceType),
      ),
    }
    api
      .registerUser({ ...user })
      .then((res) => {
        api
          .registerAgent({ user, packer: { ...packer, user: { ...user, id: res.id } } })
          .then((res) => {
            console.log('res :>> ', res)
            void messageApi.open({
              type: 'success',
              content: 'Agent registered successfully..! ',
            })
            form.resetFields()
          })
          .catch((res) => {
            void messageApi.open({
              type: 'success',
              content: 'Agent registered successfully..! ',
            })
            form.resetFields()
          })
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
      <h3 className='my-3 text-center'>Agent Registration</h3>
      <Form
        {...formItemLayout}
        className='m-auto'
        form={form}
        name='register'
        onFinish={onFinish}
        // initialValues={}
        style={{ maxWidth: 600 }}
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
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              pattern: passwordRegex,
              message: 'Password must be combination of Alphabets, number with special characters!',
            },
            {
              required: true,
              message: 'Please enter your password!',
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
          />
        </Form.Item>
        <Form.Item
          name='packerName'
          label='Packer Name'
          rules={[{ required: true, message: 'Please enter packer name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Services'
          name='serviceTypes'
          rules={[{ type: 'array', required: true, message: 'Please enter your services!' }]}
        >
          <Select
            mode='multiple'
            allowClear
            placeholder='Please select services you will provide'
            options={serviceTypes}
          />
        </Form.Item>
        <Form.Item
          name='city'
          label='City'
          rules={[{ required: true, message: 'Please select your city!' }]}
        >
          <Select
            showSearch
            // placeholder='Select a City'
            optionFilterProp='children'
            // //style={{ width: '100%' }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={cities}
          />
        </Form.Item>
        <Form.Item
          name='state'
          label='State'
          rules={[{ required: true, message: 'Please enter your State!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input description' }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
        <Form.Item label='Upload' valuePropName='fileList'>
          <Upload action='/upload.do' listType='picture-card'>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: async (_, value) => {
                value
                  ? await Promise.resolve()
                  : await Promise.reject(new Error('Should accept agreement'))
              },
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href=''>agreement</a>
          </Checkbox>
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

import React from 'react'
import { Descriptions, Image, Tag } from 'antd'
import { useLocation, NavLink } from 'react-router-dom'
import { type Packer } from './Packers.types'

export const ViewPacker: React.FC = () => {
  const { Item } = Descriptions
  const location = useLocation()
  const packer: Packer = location.state?.packer
  return (
    <>
      <NavLink to={'/packers'} title='go back' className='d-flex align-items-center'>
        <p className='pl-2'> Back to Packers</p>
      </NavLink>
      <div className='d-flex pl-3'>
        <Descriptions
          title={packer.name + ' Details'}
          bordered
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          className='w-75'
        >
          <Item label='Description'>
            Our team is dedicated to ensuring the safe and timely transport of our clients
            belongings, no matter the distance. We use only the best packing materials and equipment
            to ensure that every item is protected during transit. Our goal is to provide a
            stress-free moving experience for our clients, whether they are moving locally or
            internationally. We are committed to transparency and excellent communication with our
            clients, and we strive to exceed their expectations with every move. <br />
          </Item>
          <Item label='Services'>
            {packer.services?.map((ser) => (
              <Tag key={ser.id}>{ser.serviceType}</Tag>
            ))}
          </Item>
          <Item label='Phone No'>
            {packer.phoneNo} <br />
          </Item>
          <Item label='G Mail'>
            {packer.email} <br />
          </Item>
          <Item label='City'>
            {packer.city} <br />
          </Item>
          <Item label='State'>
            {packer.state} <br />
          </Item>
        </Descriptions>
        <Image
          className='mt-5 p-3'
          preview={false}
          src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
        />
      </div>
      <NavLink
        to='/create-quotation'
        state={{ packer }}
        className='d-flex justify-content-center mt-5'
      >
        Request a Quotation!
      </NavLink>
    </>
  )
}

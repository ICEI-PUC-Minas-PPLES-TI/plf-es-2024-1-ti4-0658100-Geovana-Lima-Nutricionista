import React from 'react'
import {Avatar, Flex, Typography } from 'antd'
import Search from 'antd/es/transfer/search'
import {MessageOutlined, NotificationOutlined, UserOutlined, SearchOutlined} from '@ant-design/icons';
import '../index.css';

export const CustomHeader = () => {
  return (
   <Flex align='center' justify='space-between'>
        <Typography.Title level={3} type="secondary">
            Bem vinda de volta, Geovana!
        </Typography.Title>

   <Flex align='center' gap="3rem">
      {/* <Search  placeholder='Procurar' /> */}
      <SearchOutlined className='header-icon'/>

    <Flex align='center' gap='10px'>
        <MessageOutlined className='header-icon'/>
        <NotificationOutlined className='header-icon'/>
        <Avatar icon = {<UserOutlined />} />
    </Flex>  
   </Flex>
   </Flex>

  )
}

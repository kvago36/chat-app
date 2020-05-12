import React, { ReactNode } from 'react'
import { Layout as AntLayout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const { Header, Footer, Content } = AntLayout;

type Props = {
  children: ReactNode
}

const TEST_ICON = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"

const Layout = ({ children }: Props) => {
  const layoutStyle = { height: '100%', backgroundColor: 'transparent' }
  const { pathname } = useLocation()

  return (
    <Wrapper>
      <AntLayout style={layoutStyle}>
        <Header className="header">
          <HeaderWrapper>
            <Logo />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]}>
              <Menu.Item key="login">
                <NavLink to="login"><FormattedMessage id="login" /></NavLink>
              </Menu.Item>
              <Menu.Item key="registration">
                <NavLink to="registration"><FormattedMessage id="registration" /></NavLink>
              </Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
              <Avatar src={TEST_ICON} icon={<UserOutlined />} />
            </Menu>
          </HeaderWrapper>
        </Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </AntLayout>
    </Wrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

export default Layout
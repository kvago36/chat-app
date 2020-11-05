import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import { Squash as Hamburger } from 'hamburger-react'
import styled from 'styled-components'
import { Avatar, Switch, Menu, Dropdown, Button } from 'antd'
import { UserOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons'

import { Theme } from 'stores/theme-store'

import { useStores } from 'hooks/use-stores'

import { StyledButton } from 'components/styled/Button/Button'
import { StyledHeader } from 'components/styled/Layout/Layout'
import { StyledMenu, StyledMenuItem } from 'components/styled/Menu/Menu'

import axios from 'axiosConfig'

const { SubMenu } = Menu

const TEST_ICON = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"

interface UserMenuProps {
  themeChange: (checked: boolean) => void,
  checked: boolean
}

const UserMenu = ({ themeChange, checked }: UserMenuProps) => (
  <StyledMenu>
    <StyledMenuItem key="1">
      <Switch
        onChange={themeChange}
        checkedChildren={<FormattedMessage id="day" />}
        unCheckedChildren={<FormattedMessage id="night" />}
        defaultChecked={checked}
      />
    </StyledMenuItem>
    <Menu.Divider />
    <StyledMenuItem key="3" disabled>
      3rd menu item（disabled）
    </StyledMenuItem>
  </StyledMenu>
);

const Header = observer(() => {
  const history = useHistory()
  const { themeStore, userStore, authStore } = useStores()

  const logOut = () => {
    authStore.clearToken()
    axios.post('/users/logout')
    history.replace('/login')
  }

  const themeChange = (checked: boolean) => {
    themeStore.setTheme(checked ? Theme.dark : Theme.light)
  }

  return (
    <StyledHeader className="header">
      <HeaderWrapper>
        <Logo />
        <StyledMenu mode="horizontal">
          {
            authStore.token && (
              <StyledMenuItem key="search">
                <NavLink to="/">
                  <FormattedMessage id="search" />
                </NavLink>
              </StyledMenuItem>
            )
          }

          {
            !authStore.token && (
              <StyledMenuItem key="login">
                <NavLink to="/login">
                  <FormattedMessage id="login" />
                </NavLink>
              </StyledMenuItem>
            )
          }

          {
            !authStore.token && (
              <StyledMenuItem key="registration">
                <NavLink to="/registration">
                  <FormattedMessage id="registration" />
                </NavLink>
              </StyledMenuItem>
            )
          }

          <SubMenu key="SubMenu" title="Navigation Three - Submenu">
            <StyledMenuItem key="about">
              <NavLink to="/about">
                <FormattedMessage id="about" />
              </NavLink>
            </StyledMenuItem>
            <StyledMenuItem key="contacts">
              <NavLink to="/contacts">
                <FormattedMessage id="contacts" />
              </NavLink>
            </StyledMenuItem>
            <StyledMenuItem key="setting:2">Option 2</StyledMenuItem>
            <StyledMenuItem key="setting:3">Option 3</StyledMenuItem>
            <StyledMenuItem key="setting:4">Option 4</StyledMenuItem>
          </SubMenu>

          {
            authStore.token && (
              <StyledMenuItem key="user">
                <Dropdown overlay={<UserMenu checked={themeStore.theme === Theme.dark} themeChange={themeChange} />} placement="bottomRight">
                  <Button type="link">
                    {userStore.profile.name} <DownOutlined />
                  </Button>
                </Dropdown>
              </StyledMenuItem>
            )
          }
        </StyledMenu>

        {
          authStore.token && (
            <StyledButton type="dashed" onClick={logOut}><FormattedMessage id="logout" /></StyledButton>
          )
        }

        {/* <MobileMenu>
          <Hamburger />
        </MobileMenu> */}
      </HeaderWrapper>
    </StyledHeader>
  )
})

const MobileMenu = styled.div`

`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 12, 12, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
`

export default Header
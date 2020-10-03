import React, { ReactNode } from 'react'
import { Layout as AntLayout } from 'antd'
import styled from 'styled-components'

import Navigation from 'components/styled/Navigation'

import { StyledSider, StyledContent } from 'components/styled/Layout/Layout'
import { useStores } from 'hooks/use-stores'


import Header from 'components/Header'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { themeStore } = useStores()
  const layoutStyle = { height: '100%', backgroundColor: 'transparent' }

  console.log(themeStore.theme)

  return (
    <Wrapper>
      <AntLayout style={layoutStyle}>
        <Header />
        <AntLayout>
          <StyledSider>
            <Navigation />
          </StyledSider>
          <StyledContent>
            {children}
          </StyledContent>
        </AntLayout>
      </AntLayout>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

export default Layout
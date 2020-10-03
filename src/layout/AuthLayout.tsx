import React, { ReactNode } from 'react'
import styled from 'styled-components'

import Header from 'components/Header'

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export default AuthLayout
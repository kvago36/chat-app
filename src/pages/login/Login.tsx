import React, { useState } from 'react'
import { Redirect } from 'react-router' 
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react'
import { Form, Input, Button, Checkbox, message } from 'antd';

import { useStores } from 'hooks/use-stores'

interface Login {
  username: string,
  password: string
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = observer(() => {
  const [ isLoading, setloading ] = useState(false)
  const [ authorization, setAuthorization ] = useState(false)
  const { formatMessage } = useIntl()
  const { userStore } = useStores()

  const onFinish = async (values: any) => {
    const { email, password } = values

    setloading(true)

    message
    .loading(formatMessage({ id: 'loading' }))

    try {
      const response = await fetch('api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const { name, ...rest } = await response.json()

      message.destroy()

      if (!name) {
        message.error(formatMessage({ id: 'singInError' }), 3);
        return;
      }

      message.success(formatMessage({ id: 'singInSuccess' }, { name }), 2);
      userStore.signIn({ name, ...rest })
      setTimeout(() => setAuthorization(true), 200)
    } catch (error) {
      // show error
      console.error(error)
    } finally {
      setloading(false)
    }
  };

  const onFinishFailed = (errorInfo: any): void | undefined => {
    console.log('Failed:', errorInfo);
  };

  if (authorization) {
    return <Redirect to='' />
  }

  return (
    <Wrapper>
      <Form
        {...layout}
        size="middle"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={formatMessage({id: 'email'})}
          style={{ textTransform: 'capitalize' }}
          name="email"
          rules={[{ required: true, message: formatMessage({id: 'emailRequired'}) }]}
        >
          <Input name="email" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={formatMessage({id: 'password'})}
          style={{ textTransform: 'capitalize' }}
          name="password"
          rules={[{ required: true, message: formatMessage({id: 'passwordRequired'}) }]}
        >
          <Input.Password name="password" autoComplete="new-password" />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>
            <FormattedMessage id="checkboxRemember" />
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button disabled={isLoading} type="primary" htmlType="submit">
            <FormattedMessage id="buttonSubmit" />
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  background: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Login
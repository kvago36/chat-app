import React, { useState } from 'react'
import { Redirect } from 'react-router' 
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useStores } from 'hooks/use-stores'

import axios from 'axiosConfig'

interface Login {
  email: string,
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
  const [ authorization, setAuthorization ] = useState<any>(null)
  const { formatMessage } = useIntl()
  const { userStore, authStore } = useStores()

  const onFinish = async (values: any) => {
    const { email, password } = values

    setloading(true)

    message
    .loading(formatMessage({ id: 'loading' }))

    try {
      const response = await axios.post('/users/signin', { email, password })
      const { user, token, error } = await response.data

      message.destroy()

      if (error) {
        message.error(formatMessage({ id: 'singInError' }), 3);
        return;
      }

      const { profile: { name, date, ...restProfile }, ...restUser } = user

      message.success(formatMessage({ id: 'singInSuccess' }, { name }), 2);
      authStore.setToken(token)
      userStore.setUser({ ...restUser, profile: { name, birthday: new Date(date), ...restProfile } })
      setTimeout(() => setAuthorization(user), 200)
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

  if (authorization !== null) {
    return <Redirect to={{ pathname: `/users/${authorization.profile.name}`, state: authorization }} />
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
          rules={[
            { 
              required: true,
              message: formatMessage({id: 'emailRequired'})
            },
            {
              type: 'email',
              message: formatMessage({id: 'emailNotValid'}),
            },
          ]}
        >
          <Input name="email" prefix={<UserOutlined style={{ color: '#b5b5b5' }} />} placeholder="Username" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={formatMessage({id: 'password'})}
          style={{ textTransform: 'capitalize' }}
          name="password"
          rules={[{ required: true, message: formatMessage({id: 'passwordRequired'}) }]}
        >
          <Input.Password name="password" prefix={<LockOutlined style={{ color: '#b5b5b5' }} />} placeholder="Password" autoComplete="new-password" />
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
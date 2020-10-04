import React, { useState, useEffect } from 'react'
import { useLocation, Redirect, useHistory } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react'
import { Form, Input, Button, Checkbox, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components'

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
  const [isLoading, setloading] = useState(false)
  const [authorization, setAuthorization] = useState<any>(null)
  let location = useLocation()
  let history = useHistory()
  const { formatMessage } = useIntl()
  const { userStore, authStore } = useStores()

  useEffect(() => {
    try {
      const sessionError = sessionStorage.getItem('error')

      if (sessionError) {
        const error = JSON.parse(sessionError)

        history.replace('/login', error)
      }
    } catch (error) {
      console.log(error)
    }

    return () => {
      sessionStorage.removeItem('error')
    }
  }, [])

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
    const { from } = location.state || {}

    return <Redirect to={{ pathname: from || `/users/${authorization.profile.name}`, state: authorization }} />
  }

  return (
    <>
      {
        location.state?.error && <CustomAlert banner closable message={<FormattedMessage id={location.state.error} />} type="error" showIcon />
      }
      <Form
        {...layout}
        size="middle"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={formatMessage({ id: 'email' })}
          style={{ textTransform: 'capitalize' }}
          name="email"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'emailRequired' })
            },
            {
              type: 'email',
              message: formatMessage({ id: 'emailNotValid' }),
            },
          ]}
        >
          <Input name="email" prefix={<UserOutlined style={{ color: '#b5b5b5' }} />} placeholder="Username" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={formatMessage({ id: 'password' })}
          style={{ textTransform: 'capitalize' }}
          name="password"
          rules={[{ required: true, message: formatMessage({ id: 'passwordRequired' }) }]}
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
    </>
  )
})

const CustomAlert = styled(Alert)`
  position: fixed;
  top: 74px;
  width: calc(100% - 14px);
`

export default Login
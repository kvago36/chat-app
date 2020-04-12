import React, { useState } from 'react'
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
  const [ loading, setloading ] = useState(false)
  const { formatMessage } = useIntl()
  const { userStore } = useStores()

  const onFinish = async (values: any) => {
    const { username, password } = values

    setloading(true)

    message
    .loading('Action in progress..')

    try {
      const response = await fetch('api/singin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const { name, ...rest } = await response.json()

      message.destroy()

      if (!name) {
        message.error(formatMessage({ id: 'singInError' }), 3);
        return;
      }

      message.success(formatMessage({ id: 'singInSuccess' }, { name }), 3);
      userStore.signIn({ name, ...rest })
    } catch (error) {
      // show error
    } finally {
      setloading(false)
    }
  };

  const onFinishFailed = (errorInfo: any): void | undefined => {
    console.log('Failed:', errorInfo);
  };

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
          label="Username"
          name="username"
          rules={[{ required: true, message: formatMessage({id: 'usernameRequired'}) }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: formatMessage({id: 'passwordRequired'}) }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>
            <FormattedMessage id="checkboxRemember" />
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button disabled={loading} type="primary" htmlType="submit">
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
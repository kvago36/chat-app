import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Checkbox,
  message,
} from 'antd';
import { FormattedMessage, useIntl } from 'react-intl'
import CSS from 'csstype';
import { observer } from 'mobx-react'

import axios from 'axiosConfig'

import { useStores } from 'hooks/use-stores'

import Layout from 'layout/Layout'

import { isEmail } from 'utils'
import { AuthStore } from 'stores/auth-store';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const capitalizeText: CSS.Properties = {
  textTransform: 'capitalize'
}

const Registration = observer(() => {
  const [isLoading, setLoading] = useState(false)
  const [timeoutId, setTimeoutId] = useState(0)
  const { formatMessage } = useIntl()
  const { userStore, authStore } = useStores()

  const onFinishFailed = () => {}

  const validateEmail = async (email: string) => {
    try {
      const response = await axios.post('/users/email', { email })
      const { error } = await response.data

      if (error) {
        return
      }

      return email
    } catch (error) {
      console.log(error)
    }
  }

  const onFinish = async (values: any) => {
    const { name, email, password, gender, date } = values

    setLoading(true)

    message
    .loading(formatMessage({ id: 'loading' }))

    try {
      const response = await axios.post('/users/signup', {
        name,
        email,
        password,
        gender,
        date: date.unix()
      })
      const { user, token } = await response.data

      message.destroy()

      if (!user) {
        message.error(formatMessage({ id: 'singUpError' }), 3);
        return;
      }

      message.success(formatMessage({ id: 'singUpSuccess' }), 2);
      authStore.setToken(token)
      userStore.setUser({ ...user })
    } catch (error) {
      // show error
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Form
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
          label={formatMessage({ id: 'name' })}
          style={capitalizeText}
          rules={[{ required: true, message: formatMessage({id: 'nameRequired'}) }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          name="email"
          label={formatMessage({ id: 'email' })}
          style={capitalizeText}
          rules={[
            { 
              required: true,
              message: formatMessage({id: 'emailRequired'})
            },
            ({ getFieldError }) => ({
              validator(rule, value) {
                return new Promise((resolve, reject) => {
                  if (timeoutId) {
                    clearTimeout(timeoutId)
                  }

                  setTimeoutId(setTimeout(async () => {
                    if (!isEmail(value)) {
                      return reject(formatMessage({ id: 'emailNotValid' }))
                    }

                    const canUseEmail = await validateEmail(value)

                    if (canUseEmail) {
                      resolve();
                    } else {
                      reject(formatMessage({ id: 'emailAlreadyTaken' }))
                    }
                  }, 200))
                })
              },
            }),
          ]}
          hasFeedback
        >
          <Input name="email" />
        </Form.Item>
        <Form.Item
          name="password"
          style={capitalizeText}
          label={formatMessage({ id: 'password' })}
          rules={[{ required: true, message: formatMessage({ id: 'passwordRequired' }) }]}
          hasFeedback
        >
          <Input.Password name="password" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          style={capitalizeText}
          label={formatMessage({id: 'comfirmPassword'})}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'comfirmPasswordRequired' }),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(formatMessage({ id: 'passwordDidNotMatch' }));
              },
            }),
          ]}
       >
        <Input.Password />
      </Form.Item>
        <Form.Item
          name="gender"
          style={{ textTransform: 'capitalize' }}
          label={formatMessage({ id: 'gender' })}
          rules={[{ required: true, message: formatMessage({id: 'genderRequired'}) }]}
        >
          <Radio.Group>
            <Radio.Button value="male"><FormattedMessage id="male" /></Radio.Button>
            <Radio.Button value="female"><FormattedMessage id="female" /></Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="country"
          style={{ textTransform: 'capitalize' }}
          label={formatMessage({ id: 'country' })}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="region"
          style={{ textTransform: 'capitalize' }}
          label={formatMessage({ id: 'region' })}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="city"
          style={{ textTransform: 'capitalize' }}
          label={formatMessage({ id: 'city' })}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          style={{ textTransform: 'capitalize' }}
          label={formatMessage({ id: 'birthdayDate' })}
          rules={[{ required: true, message: formatMessage({id: 'birthdayDateRequired'}) }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          {...tailLayout}
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator:(_, value) => value ? Promise.resolve() : Promise.reject(formatMessage({ id: 'agreement'})) },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button disabled={isLoading} type="primary" htmlType="submit">
            <FormattedMessage id="buttonSubmit" />
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
});

export default Registration
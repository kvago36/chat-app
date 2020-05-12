import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Checkbox,
  Progress,
  InputNumber,
  message
} from 'antd';
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'
import CSS from 'csstype';
import { observer } from 'mobx-react'

import { useStores } from 'hooks/use-stores'

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
  const [progress, setProgress] = useState(4)
  const { formatMessage } = useIntl()
  const { userStore } = useStores()

  const onFinishFailed = () => {}

  const requiredCount = 9

  const progressPersents = Math.round(progress / requiredCount * 100)

  const onChange = (number: any) => setProgress(number)

  console.log(progressPersents)


  const onFinish = async (values: any) => {
    const { name, email, password, gender, date } = values

    setLoading(true)

    message
    .loading(formatMessage({ id: 'loading' }))

    try {

      const response = await fetch('api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, gender, date: date.unix() })
      })

      const { user } = await response.json()

      message.destroy()

      if (!user) {
        message.error(formatMessage({ id: 'singUpError' }), 3);
        return;
      }

      message.success(formatMessage({ id: 'singUpSuccess' }), 2);
      userStore.signIn({ ...user })
    } catch (error) {
      // show error
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Form
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <InputNumber min={0} max={9} defaultValue={0} onChange={onChange} />
        <ProgressWrapper>
          <Progress showInfo={false} steps={requiredCount} percent={progressPersents} status="active" strokeColor="#1890ff" />
        </ProgressWrapper>
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
            { required: true, message: formatMessage({id: 'emailRequired'}) },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            }
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
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressWrapper = styled.div`
  margin: 20px 0;
`

export default Registration
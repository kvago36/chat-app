import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Layout, Select, InputNumber, Form, Row, Col } from 'antd';
import styled from 'styled-components'

import { useStores } from 'hooks/use-stores'
import { Theme } from 'stores/theme-store'

import axios from 'axiosConfig'

import { StyledSider, StyledContent } from 'components/styled/Layout/Layout'
import { StyledButton } from 'components/styled/Button/Button'
import Navigation from 'components/navigation'

import { Filter } from 'types/Filter'
import { User } from 'types/User'

const { Option } = Select;

const defaultFilter = {
  minAge: 18,
  maxAge: 60,
  location: '',
}

export const Main = observer(() => {
  const { counterStore, themeStore } = useStores()
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([])
  const [isFetching, setFetching] = useState(false)
  const [filters, setFilters] = useState<Filter>(defaultFilter)

  useEffect(() => {
    fetchUsers()
  }, [filters])

  const fetchUsers = async () => {
    setFetching(true)
    try {
      const response = await axios.get(`/users`)
      const { users, error } = await response.data

      if (!users) {
        throw new Error('')
      }

      setUsers(users)
    } catch (error) {
      console.error(error, 1131231231231221)
    } finally {
      setFetching(false)
    }
  }

  const resetFields = () => {
    form.resetFields();
  }

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const onChange = (age: any) => console.log(age)

  return (
    <Layout>
      <StyledSider>
        <Navigation />
      </StyledSider>
      <StyledContent>
        <StyledButton onClick={() => themeStore.setTheme(Theme.light)}>
          set theme: light
        </StyledButton>
        <StyledButton onClick={() => themeStore.setTheme(Theme.dark)}>
          set theme: dark
        </StyledButton>
        <StyledButton type='dashed' onClick={() => counterStore.increment()}>+</StyledButton>
        <StyledButton type='dashed' onClick={() => counterStore.decrement()}>-</StyledButton>

        <FiltersWrapper>
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onSubmit}
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="searcher"
                  label="Me"
                >
                  <Select allowClear>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="search"
                  label="Search"
                >
                  <Select allowClear>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="from"
                  label="From"
                >
                  <InputNumber min={18} max={65} defaultValue={5} onChange={onChange} />
                </Form.Item>
                <Form.Item
                  name="to"
                  label="To"
                >
                  <InputNumber min={18} max={10} defaultValue={3} onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item
                  name="country"
                  label="Country"
                >
                  <Select allowClear>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="state"
                  label="State"
                >
                  <Select allowClear>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="city"
                  label="City"
                >
                  <Select allowClear>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <StyledButton type="primary" htmlType="submit">
                  Search
                </StyledButton>
                <StyledButton
                  style={{ margin: '0 8px' }}
                  onClick={resetFields}
                >
                  Clear
                </StyledButton>
              </Col>
            </Row>
          </Form>
        </FiltersWrapper>
        {
          users.map((user: User) => <p>{user.id}</p>)
        }
      </StyledContent>
    </Layout>
  )
})

const FiltersWrapper = styled.div`
  display: flex;
`

export default Main
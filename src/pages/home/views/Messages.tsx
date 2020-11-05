import React, { useEffect, useState } from 'react'
import { Switch, Route, Link, useRouteMatch, useHistory, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { List, Avatar } from 'antd'
import io from 'socket.io-client'

import { useStores } from 'hooks/use-stores'

import { Message } from 'types/Message'

import axios from 'axiosConfig'

type Params = {
  userId: string
}

const Chat = () => {
  const { userId } = useParams<Params>()
  const { authStore, userStore } = useStores()

  useEffect(() => {
    const socket = io('http://localhost:4001', {
      query: {
        id: userStore.id,
        token: authStore.token,
        userId
      },
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log(socket.connected); // true
    });

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <p>Chat with {userId}</p>
  )
}

const data = [
  {
    id: '5f74b5b5ae65610728a9725e',
    from: 'User',
    title: 'Ant Design Title 1',
  },
  {
    id: '5eb885f988032c25d042436b',
    from: 'Jonh',
    title: 'Ant Design Title 2',
  },
];

// attachment: ""
// createdAt: "2020-11-05T15:36:08.564Z"
// edited: false
// reciver: "5f74b5b5ae65610728a9725e"
// sender: "5eb885f988032c25d042436b"
// status: "created"
// type: "sms"
// updatedAt: "2020-11-05T15:36:08.564Z"
// value: "Hi there 4"
// _id: "5fa41be8804bc9302c43a91c"

const MessagesList = () => {
  const { userId } = useParams<Params>()
  const { data: response, error } = useSWR(`/users/${userId}/messages`, axios)
  const history = useHistory()

  const startChat = (id: string) => history.push(id);

  if (error) return <div>failed to load</div>

  if (!response) return <div>loading...</div>

  const { messages }: { messages: Message[] } = response.data

  return (
    <div>
      <h4>Messages</h4>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={item => (
          <List.Item onClick={() => startChat(item.reciver)}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<Link to={`messages/${item.reciver}`}>{item.sender}</Link>}
              description={item.value}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

const Messages = () => {
  const { path } = useRouteMatch()

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/`}>
          <MessagesList />
        </Route>
        <Route path={`${path}/:userId`}>
          <Chat />
        </Route>
      </Switch>
    </div>
  )
}

export default Messages
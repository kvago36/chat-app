import React, { useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch, useHistory, useParams } from 'react-router-dom'
import { List, Avatar } from 'antd';
import io from 'socket.io-client';

import { useStores } from 'hooks/use-stores'

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

const MessagesList = () => {
  const history = useHistory()

  const startChat = (id: string) => history.push(id);

  return (
    <div>
      <h4>Messages</h4>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item onClick={() => startChat(item.id)}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<Link to={`messages/${item.id}`}>{item.from}</Link>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
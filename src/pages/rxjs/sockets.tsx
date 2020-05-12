import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import { Select } from 'antd';

const { Option } = Select;

enum Rooms {
  home = "home",
  local = "local",
  test = "test"
}

const RoomsList = () => {
  const [room, setToom] = useState(Rooms.home)

  console.log(room)

  return (
    <Wrapper>
      <Select defaultValue={Rooms.home} onChange={setToom}>
        <Option value={Rooms.local}>local</Option>
        <Option value={Rooms.test}>test</Option>
      </Select>
      <Test room={room} />
    </Wrapper>
  )
}

const Test = ({ room }: { room: string }) => {
  const [message, setMessage] = useState()

  useEffect(() => {
    const socket = io(`http://localhost:3001/${room}`, { 
      transports: ['websocket'],
      path: '/myownpath'
    });

    socket.on('connect', (t: any) => {  
      socket.on('some', setMessage);
    });

    const interval = setInterval(() => socket.emit('chat message', '1'), 5000)

    return () => clearInterval(interval)
  }, [])

  return <div>{message}</div>
}

const Wrapper = styled.div`
  background-color: green;
`

export default RoomsList
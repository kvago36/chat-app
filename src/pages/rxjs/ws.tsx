import React, { useState, useEffect } from 'react'
import { webSocket } from 'rxjs/webSocket';

const Test = () => {
  const [message, setMessage] = useState()

  useEffect(() => {
    const subject = webSocket('wss://echo.websocket.org')

    subject.subscribe(
      (msg: any) => setMessage(msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
    
    subject.next('hi')
  }, [])

  return <div>{message}</div>
}

export default Test
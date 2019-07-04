import React, { FunctionComponent, useRef, useEffect } from 'react'

import Socket from 'Utils/Socket'

const ChatComponent: FunctionComponent = () => {
  interface socket {
    [propName: string]: any
  }
  
  const _socket: socket = useRef(null)
  
  useEffect(() => {
    _socket.current = new Socket('http://localhost:4001')
    return () => {
      debugger
      _socket.current.close()
    }
  }, [])
  
  return (
    <>
      <h1>Welcome Chat Room</h1>
      <button>나가기</button>
      <button>다시?</button>
    </>
  )
}

export default ChatComponent

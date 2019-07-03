import React, { FunctionComponent, useRef, useEffect } from 'react'
import io from 'socket.io-client'

const ChatComponent: FunctionComponent = () => {
  interface socket {
    [propName: string]: any
  }
  
  const _socket: socket = useRef(null)
  
  useEffect(() => {
    _socket.current = io.connect('http://localhost:4001')
    return () => {
      _socket.current.close()
    }
  }, [])
  
  useEffect(() => {
    if (_socket.current) {
      _socket.current.emit(
        'getUserAgent',
        { userAgent: 'user agent' }
      )
    }
  }, [_socket])
  
  return (
    <>
      <h1>Welcome Chat Room</h1>
      <button>나가기</button>
      <button>다시?</button>
    </>
  )
}

export default ChatComponent

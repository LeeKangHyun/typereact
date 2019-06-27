import React, { FunctionComponent, useRef, useEffect } from 'react'
import io from 'socket.io-client'

const ChatComponent:FunctionComponent = () => {
  interface socket {
    [propName: string]: any
  }
  
  const _socket: socket = useRef(null)
  
  useEffect(() => {
    // const socket = io.connect('/socket.io')
    const socket = io.connect('http://localhost:4001')
    _socket.current = socket
    socket.on('news', (data: any) => {
      console.log(data)
      socket.emit('my other event', { my: 'data' })
    })
    
    return () => {
      socket.on('disconnect', (a: any) => {
        console.log(a)
      })
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

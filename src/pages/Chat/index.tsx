import React, { FunctionComponent, useRef, useEffect, useCallback } from 'react'

import Socket, { SocketInterface } from 'Utils/Socket'

const ChatComponent: FunctionComponent = () => {
  interface socket {
    current: SocketInterface | any
  }
  
  const _socket: socket = useRef(null)

  const onClickReConnect = useCallback(() => {
    _socket.current.reconnect()
  }, [_socket.current])

  const onClickOut = useCallback(() => {
    _socket.current.disconnect()
  }, [_socket.current])
  
  useEffect(() => {
    const { protocol, hostname } = window.location
    _socket.current = new Socket(`${protocol}//${hostname}:4001`)
    return () => {
      _socket.current.disconnect()
    }
  }, [])
  
  return (
    <>
      <h1>Welcome Chat Room</h1>
      <button onClick={onClickOut}>나가기</button>
      <button onClick={onClickReConnect}>다시</button>
    </>
  )
}

export default ChatComponent

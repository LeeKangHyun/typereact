import React, { FC, useRef, useState, useEffect, useCallback, FormEvent } from 'react'

import Socket, { SocketInterface } from 'Utils/Socket'
import {
  Wrap,
  Title,
  NameForm,
  Button
} from './styled'

const ChatComponent: FC = () => {
  interface socket {
    current: SocketInterface | any
  }
  
  const [name, setName] = useState<string>('')
  const _socket: socket = useRef(null)

  const onClickReConnect = useCallback(() => {
    _socket.current.reconnect()
  }, [_socket.current])

  const onClickOut = useCallback(() => {
    _socket.current.disconnect()
  }, [_socket.current])

  const onChangeToName = useCallback((event: FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget
    setName(value)
  }, [])

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])
  
  useEffect(() => {
    const { protocol, hostname } = window.location
    _socket.current = new Socket(`${protocol}//${hostname}:4001`)

    return () => {
      _socket.current.disconnect()
    }
  }, [])
  
  return (
    <Wrap>
      <Title>Welcome Chat Room</Title>
      <NameForm onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          onChange={onChangeToName}
          placeholder="닉네임 입력"
        />
        <Button
          type="submit"
          onClick={onClickReConnect}
        >
          연결
        </Button>
      </NameForm>
      <button onClick={onClickOut}>나가기</button>
    </Wrap>
  )
}

export default ChatComponent

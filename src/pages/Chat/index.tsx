import * as React from 'react'
import { FC, useRef, useState, useEffect, useCallback, FormEvent } from 'react'
import { toast } from 'react-toastify'

import Socket, { SocketInterface } from 'Utils/Socket'

import {
  Wrap,
  Title,
  NameForm,
  Button
} from './styled'

import 'react-toastify/dist/ReactToastify.min.css'

toast.configure({
  position: 'top-right',
  autoClose: 1500
})

const ChatComponent: FC = () => {
  interface socket {
    current: SocketInterface | any
  }
  
  const [name, setName] = useState<string>('')
  const _socket: socket = useRef(null)

  const onClickReConnect = useCallback(() => {
    const a = _socket.current.reconnect()
    console.log(a)
    toast("채팅 연결")
  }, [])

  const onClickOut = useCallback(() => {
    _socket.current.disconnect()
    toast("채팅 종료")
  }, [])

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
    _socket.current.on('Enter', (data: any) => {
      console.log(data)
    })

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

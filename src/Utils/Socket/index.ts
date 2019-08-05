import * as io from 'socket.io-client'

export interface SocketInterface {
  disconnect(): void
  reconnect(): void
  emit(eventName: string, fn: Function): void
  on(eventName: string, fn: Function): void
}

interface _socketType extends SocketIOClient.Socket {
  [propName: string]: any
}

class Socket implements SocketInterface {
  _socket: _socketType
  constructor(uri: string, opts: object = { autoConnect: false }) {
    this._socket = io.connect(uri, opts)
  }

  public disconnect = () => this._socket.close()
  public reconnect = () => this._socket.open()
  public emit = (eventName: string, fn: Function) => this._socket.emit(eventName, fn)
  public on = (eventName: string, fn: Function) => this._socket.on(eventName, fn)
}

export default Socket

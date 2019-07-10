import io from 'socket.io-client'

export interface SocketInterface {
  disconnect(): void
  reconnect(): void
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
}

export default Socket

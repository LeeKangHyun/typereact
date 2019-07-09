import io from 'socket.io-client'

export interface SocketInterface {
  disconnect(): void
  reconnect(): void
}

class Socket implements SocketInterface {
  _socket: any
  constructor(uri: string, opts?: object) {
    this._socket = io.connect(uri, opts)
  }
  
  public disconnect = () => this._socket.close()
  public reconnect = () => this._socket.open()
}

export default Socket

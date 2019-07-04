import * as io from 'socket.io-client'

interface SocketInterface {
  disconnect(): void
}

class Socket implements SocketInterface{
  _socket: any
  constructor(uri: string, opts?: object) {
    this._socket = io.connect(uri, opts)
  }
  
  public disconnect = () => this._socket.close()
}

export default Socket

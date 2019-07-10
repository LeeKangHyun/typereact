import Socket, { SocketInterface } from '../Socket'

describe('소켓 생성', () => {
  let socket: SocketInterface

  beforeEach(done => {
    socket = new Socket('http://localhost:4001')
    done()
  })

  it('소켓 연결', () => {
    socket.reconnect()
  })

  it('소켓 해제', () => {
    socket.disconnect()
  })
})
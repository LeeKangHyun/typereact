import express from 'express'
import path from 'path'
import morgan from 'morgan'
import http from 'http'
import socket from 'socket.io'

import API from './routes/api'

/*
* API
*/

const app = express()

app.set('port', 3001)

app.use(express.static(path.join(__dirname, '..', 'build', 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/api', API)

app.all('/*', (req, res) => {
  console.log('Reading the main route through http request, sending index.html')
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

const server = http.createServer(app)

server.listen(app.get('port'), () => {
  console.log('APIServer is Opened ' + app.get('port'))
})

/*
* Chat API
*/

const chatApp = express()

chatApp.set('port', 4001)

const chatServer = http.createServer(chatApp)

const io = socket(chatServer)

io.on('connection', (socket: socket.Socket): void => {
  const handshake: socket.Handshake = socket.handshake
  console.log('Device connected')
  console.log(handshake, handshake.headers['user-agent'], handshake.address)
  
  socket.on('getUserAgent', (data) => {
    console.log(data)
  })
  
  socket.on('', () => {
  
  })
  
  socket.on('disconnect', () => {
    console.log('Device disconnected')
  })
})

chatServer.listen(chatApp.get('port'), () => {
  console.log(`ChatServer is Opened ${chatApp.get('port')}`)
})

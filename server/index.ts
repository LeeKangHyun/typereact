import express from 'express'
import path from 'path'
import morgan from 'morgan'
import http from 'http'
import socket from 'socket.io'
import cors from 'cors'

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

const whitelist = ['http://localhost:3001']

chatApp.use('*', cors({
  origin: function (origin: any, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed'))
    }
  }
}))

chatApp.set('port', 4001)

const chatServer = http.createServer(chatApp)

const io = socket(chatServer)

io.on('connection', (socket: socket.Socket): void => {
  console.log('User connected')
  
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', (data) => {
    console.log(data)
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

chatServer.listen(chatApp.get('port'), () => {
  console.log(`ChatServer is Opened ${chatApp.get('port')}`)
})

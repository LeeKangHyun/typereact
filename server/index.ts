import * as express from 'express'
import * as path from 'path'
import * as morgan from 'morgan'
import * as http from 'http'

import API from './routes/api'

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
server.listen(app.get('port'), function() {
  console.log('Express Listening on Port ' + app.get('port'))
})

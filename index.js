'use strict'

require('dotenv').config()

const boom = require('boom')
const Hapi = require('hapi')
const chalk = require('chalk')

const server = new Hapi.Server({
  host: process.env.JR_HOST || '0.0.0.0',
  port: process.env.JR_PORT || 8888
})

server.route([
  {
    method: 'POST',
    path: '/{key}/{value}',
    config: {
      handler: (request, reply) => {
        dump(request.payload)
        return {
          [request.params.key]: request.params.value
        }
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  },
  {
    method: 'POST',
    path: '/',
    config: {
      handler: (request, reply) => {
        dump(request.payload)
        return request.payload
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  },
])

server.start(error => {
  if (error) {
    return console.error(error)
  }
  console.log('Server running at', server.info.uri)
})

/* colorize log output */

const colors = [
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.cyan
]

let color

function dump (content) {
  color = colors[(colors.indexOf(color) + 1) % colors.length]
  console.log(color(JSON.stringify(content, null, 2)))
}
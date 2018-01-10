'use strict'

require('dotenv').config()

const boom = require('boom')
const Hapi = require('hapi')
const chalk = require('chalk')
const Joi = require('joi');

const server = new Hapi.Server({
  host: process.env.JR_HOST || '0.0.0.0',
  port: process.env.JR_PORT || 8888
})

server.route([
  {
    method: 'POST',
    path: '/',
    config: {
      handler: function (request, h) {
        dump(request.payload)
        const response = h.response(request.payload)
        response.type('application/json')
        response.code(200)
        return response
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  },
  {
    method: 'POST',
    path: '/{code}',
    config: {
      handler: function (request, h) {
        dump(request.payload)
        const response = h.response(request.payload)
        response.type('application/json')
        response.code(request.params.code)
        return response
      },
      validate: {
          params: {
              code: Joi.number().integer().required()
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
    path: '/{key}/{value}',
    config: {
      handler: (request, reply) => {
        dump(request.payload)
        return {
          [request.params.key]: request.params.value
        }
      },
      validate: {
          params: {
              key: Joi.string().required(),
              value: Joi.string().required()
          }
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  }
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
  let now = new Date()
  console.log(chalk.black(`\n${now.toString()}:`))
  color = colors[(colors.indexOf(color) + 1) % colors.length]
  console.log(color(JSON.stringify(content, null, 2)))
}
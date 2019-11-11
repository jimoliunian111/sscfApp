'use strict'
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"beta"',
  // DOMAIN: '"http://m.proxy.cfb.com"',
  // DOMAIN: '""',
  DOMAIN: '"http://h5.beta.12354.com"',
  UPLOADDOMAIN: '"http://file.service.beta.2239.com"',
  HEALTH_HOST: '"http://bridge.product.beta.2239.com"',
  AUTH: false,
  NEWAUTH: true,
  DEBUG: 'false',
  VERSION: '2.0'
})


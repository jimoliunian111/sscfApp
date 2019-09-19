'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN: '"/api"',
  // DOMAIN: '"http://h5.beta.12354.com"',
  STATIC_JSON: '"/api/json"',
  // DOMAIN: '"http://wap.proxy.test"',
  UPLOADDOMAIN: '"http://file.service.beta.2239.com"',
  HEALTH_HOST: '"http://bridge.product.beta.2239.com"',
  AUTH: true,
  NEWAUTH: true,
  DEBUG: 'true',
  VERSION: '2.0'
});
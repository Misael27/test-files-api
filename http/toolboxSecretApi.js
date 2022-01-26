const axios = require('axios')
const dotenv = require('dotenv')

function apiConfig (config) {
  if (!config) config = {}
  dotenv.config()
  const defaultOptions = {
    baseURL: process.env.TBXNET_URL,
    headers: {
      'Content-Type': config.contentType ? config.contentType : 'application/json',
      Authorization: 'Bearer aSuperSecretKey'
    }
  }
  return axios.create(defaultOptions)
}

exports.getFiles = function () {
  return apiConfig().get('/secret/files')
    .then((response) => {
      return response.data
    })
}

exports.getFileCsv = function (fileName) {
  return apiConfig({ contentType: 'text/csv' }).get(`/secret/file/${fileName}`)
    .then((response) => {
      return response.data
    })
}

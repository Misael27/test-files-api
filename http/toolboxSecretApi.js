const axios = require('axios');
const dotenv = require('dotenv');

function apiConfig() {
    dotenv.config();
    const defaultOptions = {
        baseURL: process.env.TBXNET_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer aSuperSecretKey"
        }
    };
    return axios.create(defaultOptions);
}

exports.getFiles = function() {
    console.log("llamando api");
    return apiConfig().get(`/secret/files`)
    .then((response) => {
        return response.data;
    });
}

const axios = require('axios');

const julesAPI = axios.create({
  baseURL: 'https://api.jules.ai/v1',
  headers: {
    Authorization: `Bearer ${process.env.JULES_API_KEY}`,
  },
});

module.exports = julesAPI;

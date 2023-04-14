const express = require('express')
const axios = require('axios')

const router = express.Router()
const baseUrl = process.env.UNSPLASH_API_BASE_URL
const keyName = process.env.UNSPLASH_API_KEY_NAME
const keyValue = process.env.UNSPLASH_API_KEY_VALUE

router.get('/landscape', async (req, res) => {
  try {
    let { data } = await axios.get(baseUrl, {
      params: {
        [keyName]: keyValue,
        orientation: 'landscape'
      }
    })
    if (data.urls.regular.startsWith('https://plus.unsplash.com')) {
      data = { data } = await axios.get(baseUrl, {
        params: {
          [keyName]: keyValue,
          orientation: 'landscape'
        }
      })
    }
    data.urls.regular = data.urls.regular.replace('q=80', 'q=100')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'API Proxy Server Error' })
  }
})

router.get('/portrait', async (req, res) => {
  try {
    let { data } = await axios.get(baseUrl, {
      params: {
        [keyName]: keyValue,
        orientation: 'portrait'
      }
    })
    if (data.urls.regular.startsWith('https://plus.unsplash.com')) {
      data = { data } = await axios.get(baseUrl, {
        params: {
          [keyName]: keyValue,
          orientation: 'portrait'
        }
      })
    }
    data.urls.regular = data.urls.regular.replace('q=80', 'q=100')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'API Proxy Server Error' })
  }
})

module.exports = router

const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  res.status(200).json({ message: 'API proxy server by xubingyang.com' })
})

module.exports = router

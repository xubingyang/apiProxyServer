const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const apicache = require('apicache')
require('dotenv').config()

const unsplashRouter = require('./routes/unsplash')

const app = express()

app.use(cors())

const cache = apicache.middleware

const unsplashLimiter = rateLimit({
  max: process.env.UNSPLASH_API_LIMITER_MAX,
  windowMs: process.env.UNSPLASH_API_LIMITER_HOUR * 60 * 60 * 1000,
  skipFailedRequests: process.env.UNSPLASH_API_LIMITER_SKIP_FAILED_REQUESTS,
  message: {
    error: 'unsplash只允许每小时请求50次，请1小时候再次尝试访问'
  }
})

app.set('trust proxy', 1)

app.use(
  '/unsplash',
  unsplashLimiter,
  cache(process.env.UNSPLASH_API_CACHE_DURATION),
  unsplashRouter
)

const port = process.env.PORT || 5500

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

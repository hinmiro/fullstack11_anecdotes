import express from 'express'
import path from 'path'
import process from 'process'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))

app.use(
   '/anecdotes',
   createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
   })
)

app.get((req, res) => {
   res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})

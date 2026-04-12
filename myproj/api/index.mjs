import express from 'express'
import cors from 'cors'
import { initializeDatabase, pool } from './src/db.mjs'

const PORT = Number(process.env.PORT || 5000)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*'

const app = express()

app.use(express.json())
app.use(cors({ origin: CLIENT_ORIGIN === '*' ? true : CLIENT_ORIGIN }))

app.get('/health', (_, res) => {
  res.send({ status: 'ok' })
})

app.get('/messages', async (_, res) => {
  const [rows] = await pool.query(
    'SELECT id, username, message, created_at FROM messages ORDER BY created_at DESC'
  )
  res.send(rows)
})

app.post('/messages', async (req, res) => {
  const username = String(req.body.username || '').trim()
  const message = String(req.body.message || '').trim()

  if (!username || !message) {
    return res.status(400).send({
      error: 'Name and message are required',
    })
  }

  const [result] = await pool.execute(
    'INSERT INTO messages (username, message) VALUES (?, ?)',
    [username, message]
  )

  res.status(201).send({
    id: result.insertId,
    username,
    message,
  })
})

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Guestbook API is running at http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Database initialization failed', error)
    process.exit(1)
  })

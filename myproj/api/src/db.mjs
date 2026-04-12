import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  connectionLimit: 20,
  host: process.env.DB_HOST || 'mysql',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'guestbook_db',
})

const CREATE_MESSAGES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const initializeDatabase = async () => {
  for (let attempt = 1; attempt <= 15; attempt += 1) {
    try {
      const connection = await pool.getConnection()
      await connection.query(CREATE_MESSAGES_TABLE_SQL)
      console.log('Messages table is ready')
      connection.release()
      return
    } catch (error) {
      console.error(`MySQL connection attempt ${attempt} failed`, error.message)
      if (attempt === 15) {
        throw error
      }
      await sleep(3000)
    }
  }
}

export { initializeDatabase, pool }

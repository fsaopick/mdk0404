import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST || 'mysql',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'time_db',
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const initializeDatabase = async () => {
  const retries = Number(process.env.DB_CONNECT_RETRIES || 15)
  const retryDelayMs = Number(process.env.DB_CONNECT_RETRY_DELAY_MS || 3000)

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const connection = await pool.getConnection()
      console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
      await connection.query(CREATE_TIMES_TABLE_SQL)
      console.log('Times table is ready')
      connection.release()
      return
    } catch (error) {
      console.error(`MySQL connection attempt ${attempt} failed`, error.message)
      if (attempt === retries) {
        throw error
      }
      await sleep(retryDelayMs)
    }
  }
}

export default pool
export { initializeDatabase }

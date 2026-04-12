import pool from './mysqlPool.mjs'

const readRecords = async () => {
  const [results] = await pool.query(
    'SELECT * FROM `times` ORDER BY created_at DESC'
  )
  return results
}

const insertRecord = async (time) => {
  const [result] = await pool.execute('INSERT INTO times (time) VALUES (?)', [
    time,
  ])
  console.log(`New time ${time} was saved to the DB`)
  return result
}

const deleteRecord = async (id) => {
  const [result] = await pool.execute('DELETE FROM times WHERE id = ?', [id])
  console.log(`Time with id ${id} was deleted from the DB`)
  return result
}

export { readRecords, insertRecord, deleteRecord }

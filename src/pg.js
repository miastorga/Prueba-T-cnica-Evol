import pkg from 'pg'
const { Pool } = pkg


const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
  database: 'evol'
})

export default pool

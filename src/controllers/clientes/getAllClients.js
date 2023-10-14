import pool from '../../pg.js'

export const getAllClients = async (req, res, next) => {
  try {
    const allClients = await pool.query('SELECT * FROM USUARIOS')
    res.locals.data = {
      data: allClients.rows,
      modelName: 'clientes',
    }
    next()
  } catch (error) {
    res.locals.error = { statusCode: 500, message: 'Algo salió mal al obtener todos los clientes.' }
    next()
  }
}
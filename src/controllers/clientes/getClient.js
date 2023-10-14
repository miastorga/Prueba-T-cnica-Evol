import pool from '../../pg.js'

export const getClient = async (req, res, next) => {
  const { rut } = req.params
  try {
    const client = await pool.query('SELECT * FROM USUARIOS WHERE RUT = $1', [rut])

    if (client.rows.length === 0) {
      res.locals.error = { statusCode: 404, message: 'Cliente no encontrado' }
    } else {
      res.locals.data = {
        data: client.rows[0],
        modelName: 'cliente',
      }
    }
    next()
  } catch (error) {
    res.locals.error = { statusCode: 500, message: 'Algo salió mal al obtener el cliente.' }
    next()
  }
}
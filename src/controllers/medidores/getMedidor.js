import pool from '../../pg.js'

export const getMedidor = async (req, res, next) => {
  const { codigo } = req.params
  try {
    const medidor = await pool.query('SELECT * FROM MEDIDORES WHERE CODIGO = $1', [codigo])

    if (medidor.rows.length === 0) {
      res.locals.error = { statusCode: 404, message: 'Medidor no encontrado' }
    } else {
      res.locals.data = {
        data: medidor.rows[0],
        modelName: 'medidor',
      }
    }
    next()
  } catch (error) {
    res.locals.error = { statusCode: 500, message: 'Algo salió mal al obtener el el medidor.' }
    next()
  }
}
import pool from '../../pg.js'

export const getAllMedidores = async (req, res, next) => {
  try {
    const allMedidores = await pool.query('SELECT * FROM MEDIDORES')
    res.locals.data = {
      data: allMedidores.rows,
      modelName: 'medidores',
    }
    next()
  } catch (error) {
    res.locals.error = { statusCode: 500, message: 'Algo salió mal al obtener todos los medidores.' }
    next()
  }

}
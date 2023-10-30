import pool from '../../pg.js'

export const createClient = async (req, res, next) => {
  const { rut, nombre, direccion } = req.body

  try {
    const existingClient = await pool.query('SELECT * FROM usuarios WHERE rut = $1', [rut])

    if (existingClient.rowCount > 0) {
      res.locals.error = { statusCode: 400, message: 'El cliente con ese RUT ya existe.' }
      return next()
    }

    await pool.query('insert into usuarios (rut, nombre, direccion) values ($1, $2, $3)', [rut, nombre, direccion])

    res.locals.data = {
      statusCode: 201,
      modelName: 'cliente',
      message: 'Cliente creado con éxito',
    }
    next()
  } catch (error) {
    res.locals.error = { statusCode: 500, message: 'error al crear cliente.' }
    next()
  }
}

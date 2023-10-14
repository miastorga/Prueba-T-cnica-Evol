import pool from '../../pg.js'

export const updateClient = async (req, res, next) => {
  const oldRut = req.params.rut
  const { rut: newRut, nombre, direccion } = req.body

  try {
    let client

    if (newRut && oldRut !== newRut) {
      const existingClient = await pool.query('SELECT * FROM USUARIOS WHERE rut = $1', [newRut])

      if (existingClient.rows.length) {
        res.locals.error = { statusCode: 409, message: 'El RUT proporcionado ya existe.' }
        return next()
      }

      client = await pool.query('UPDATE USUARIOS SET rut = $1, nombre = $2, direccion = $3 WHERE rut = $4 RETURNING *', [newRut, nombre, direccion, oldRut])
    } else {
      client = await pool.query('UPDATE USUARIOS SET nombre = $1, direccion = $2 WHERE rut = $3 RETURNING *', [nombre, direccion, oldRut])
    }

    if (newRut && oldRut !== newRut) {
      client = await pool.query('UPDATE USUARIOS SET rut = $1, nombre = $2, direccion = $3 WHERE rut = $4 RETURNING *', [newRut, nombre, direccion, oldRut])
    } else {
      client = await pool.query('UPDATE USUARIOS SET nombre = $1, direccion = $2 WHERE rut = $3 RETURNING *', [nombre, direccion, oldRut])
    }

    if (!client.rows.length) {
      res.locals.error = { statusCode: 404, message: 'Cliente no encontrado.' }
    } else {
      res.locals.data = {
        data: client.rows,
        modelName: 'cliente',
        message: 'Cliente actualizado con éxito'
      }
    }
    next()
  } catch (error) {
    res.locals.error = { statusCode: 500, message: 'Error al actualizar cliente.' }
    next()
  }
}

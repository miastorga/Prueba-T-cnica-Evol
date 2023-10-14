import pool from '../../pg.js'

export const updateMedidor = async (req, res, next) => {
  const oldCodigo = req.params.codigo
  const { codigo: newCodigo, nombre, fechacreacion, rut } = req.body

  try {
    let medidor

    if (newCodigo && oldCodigo !== newCodigo) {
      const existingMedidor = await pool.query('SELECT * FROM MEDIDORES WHERE codigo = $1', [newCodigo])

      if (existingMedidor.rows.length) {
        res.locals.error = { statusCode: 409, message: 'El código de medidor proporcionado ya existe.' }
        return next()
      }

      medidor = await pool.query('UPDATE MEDIDORES SET codigo = $1, nombre = $2, fechacreacion = $3, rut = $4 WHERE codigo = $5 RETURNING *', [newCodigo, nombre, fechacreacion, rut, oldCodigo])
    } else {
      medidor = await pool.query('UPDATE MEDIDORES SET nombre = $1, fechacreacion = $2, rut = $3 WHERE codigo = $4 RETURNING *', [nombre, fechacreacion, rut, oldCodigo])
    }

    if (!medidor.rows.length) {
      res.locals.error = { statusCode: 404, message: 'Medidor no encontrado.' }
    } else {
      res.locals.data = {
        data: medidor.rows[0],
        modelName: 'medidor',
        message: 'Medidor actualizado con éxito'
      }
    }
    next()
  } catch (error) {
    res.locals.error = { statusCode: 500, message: 'Error al actualizar medidor.' }
    console.log(error)
    console.log(' 505')
    next()
  }
}

import pool from '../../pg.js'

export const deleteClient = async (req, res, next) => {
  const { rut } = req.params

  try {
    const client = await pool.query('DELETE FROM USUARIOS WHERE RUT = $1', [rut])
    if (!client.rowCount) {
      res.locals.error = { statusCode: 404, message: 'Cliente no encontrado.' }
    } else {
      res.locals.data = {
        modelName: 'cliente',
        message: 'Cliente eliminado con éxito'
      }
    }
    next()
  } catch (error) {
    if (error.code === '23503') {
      res.locals.error = {
        statusCode: 409,
        message: 'No se puede eliminar el cliente ya que está asociado con un medidor'
      }
    } else {
      res.locals.error = {
        statusCode: 500,
        message: 'Error al eliminar cliente.'
      }
    }
    next()
  }
}
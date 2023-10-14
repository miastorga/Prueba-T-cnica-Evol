import pool from '../../pg.js'

export const deleteMedidor = async (req, res, next) => {
  const { codigo } = req.params

  try {
    const medidor = await pool.query('DELETE FROM MEDIDORES WHERE CODIGO = $1', [codigo])
    if (!medidor.rowCount) {
      res.locals.error = { statusCode: 404, message: 'Medidor no encontrado.' }
    } else {
      res.locals.data = {
        modelName: 'medidor',
        message: 'Medidor eliminado con éxito'
      }
    }
    next()
  } catch (error) {
    console.log(error)
    res.locals.error = { statusCode: 500, message: 'Error al eliminar el medidor.' }
    next()
  }
}
import pool from '../../pg.js'

export const createMedidor = async (req, res, next) => {
  const { rut, nombre, codigo, fechaCreacion } = req.body
  console.log('rut', rut)

  console.log('fecha creacion', fechaCreacion)

  try {
    const existingMedidor = await pool.query('SELECT * FROM medidores WHERE codigo = $1', [codigo])

    if (existingMedidor.rowCount > 0) {
      res.locals.error = { statusCode: 400, message: 'El medidor con ese con este codigo ya existe.' }
      return next()
    }

    const userExists = await pool.query('SELECT * FROM usuarios WHERE rut = $1', [rut])
    if (userExists.rowCount === 0) {
      res.locals.error = { statusCode: 404, message: 'El RUT proporcionado no está registrado.' }
      return next()
    }

    const medidoresClient = await pool.query('SELECT COUNT(*) as count FROM medidores WHERE RUT = $1', [rut])
    const medidorCount = parseInt(medidoresClient.rows[0].count)

    if (medidorCount >= 3) {
      res.locals.error = { statusCode: 400, message: 'Un usuario no puede tener más de 3 medidores.' }
      return next()
    }

    await pool.query(
      'INSERT INTO Medidores (Codigo, Nombre, FechaCreacion, RUT) VALUES ($1, $2, $3, $4)',
      [codigo, nombre, fechaCreacion, rut]
    )
    res.locals.data = {
      statusCode: 201,
      message: 'Medidor creado con éxito',
    }
    next()

  } catch (error) {
    console.log(error)
    if (error.code === '23505') {
      res.locals.error = { statusCode: 400, message: 'Error: El código ya existe.' }
    } else {
      res.locals.error = { statusCode: 500, message: 'Error al crear el medidor.' }
    }
    next()
  }
}

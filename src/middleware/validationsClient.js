import { isDireccionValid, isNombreValid, isRutValid } from '../helpers/validations.js'

export const validateClient = (req, res, next) => {
  const { rut, nombre, direccion } = req.body

  if (!isRutValid(rut)) {
    return res.status(400).json({ status: 404, message: 'El formato del RUT es inválido. Formato 12.345.678-9/k' })
  }

  if (!isNombreValid(nombre)) {
    return res.status(400).json({ ststus: 404, message: 'El nombre es obligatorio y no debe exceder los 50 caracteres.' })
  }

  if (!isDireccionValid(direccion)) {
    return res.status(400).json({ statusCode: 400, message: 'La dirección no debe exceder los 100 caracteres.' })
  }

  next()
}

import { isNombreValid, isCodigoValido, isRutValid, isValidDate } from '../helpers/validations.js'

export const validateMedidores = (req, res, next) => {
  const { codigo, nombre, rut, fechaCreacion } = req.body

  if (!isCodigoValido(codigo)) {
    return res.status(400).json({ status: 404, message: 'El codigo es obligatorio y no debe exceder los 20 caracteres' })
  }

  if (!isNombreValid(nombre)) {
    return res.status(400).json({ status: 404, message: 'El nombre es obligatorio y no debe exceder los 50 caracteres.' })
  }

  if (!isRutValid(rut)) {
    return res.status(400).json({ status: 404, message: 'El formato del RUT es inválido. Formato 12.345.678-9/k' })
  }

  // if (!isValidDate(fechaCreacion)) {
  //   return res.status(400).json({ status: 404, message: 'Formato fecha no valido. Debe ser YYYY-MM-DD' })
  // }
  next()
}


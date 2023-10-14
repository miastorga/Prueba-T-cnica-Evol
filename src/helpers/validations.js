export const isRutValid = (rut) => {
  const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/
  if (!rutPattern.test(rut)) {
    console.log("RUT inválido")
    return false
  }
  console.log('rut valido')
  return true
}

export const isDireccionValid = direccion => {
  if (!direccion || direccion.trim() === '' || direccion.length > 255) {
    return false
  }
  return true
}

export const isNombreValid = nombre => {
  if (!nombre || nombre.trim() === '' || nombre.length > 50) {
    return false
  }
  return true
}

export const isCodigoValido = codigo => {
  if (!codigo || codigo.trim() === '' || codigo.lenght > 20) {
    return false
  }
  return true
}

export const isValidDate = (date) => {
  console.log('fecha')
  const regex = /^(?:19|20)\d\d[-](?:(?:0[1-9]|1[0-2])[-](?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])[-](?:29|30)|(?:0[13578]|1[02])[-]31)$/
  return regex.test(date)
}
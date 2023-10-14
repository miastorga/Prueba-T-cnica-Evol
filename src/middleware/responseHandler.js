export const responseHandler = (req, res) => {
  if (res.locals.error) {
    const { statusCode, message } = res.locals.error
    return res.status(statusCode).json({
      status: statusCode,
      message: message
    })
  }

  // exito
  if (res.locals.data) {
    const { data, modelName, message, statusCode = 200 } = res.locals.data // Aquí estamos usando destructuring con un valor por defecto
    return res.status(statusCode).json({
      status: statusCode,
      [modelName]: data,
      message: message
    })
  }

  res.status(500).json({
    status: 500,
    message: 'Error inesperado.'
  })
}

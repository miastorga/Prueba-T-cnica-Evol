import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function ClientsForm() {

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const mode = location.state.mode

  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    direccion: ''
  })
  const [message, setMessage] = useState('')
  const [editing, setEditing] = useState(false)

  const handlerSubmit = async e => {
    e.preventDefault()

    if (editing) {
      const res = await fetch(`http://localhost:3000/api/clients/${params.rut}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (data.status === 200) {
        console.log('actualizoa')
        navigate('/')
      } else if (data.status === 404) {
        console.log('no actualizado')
        setMessage(data)
      } else {
        setMessage(data)
      }
    } else {
      const res = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      console.log(data)

      if (data.status === 201) {
        setForm({
          rut: '',
          nombre: '',
          direccion: ''
        })
        navigate('/')
      } else if (data.status === 404) {
        setMessage(data)
      }
      setMessage(data)
    }
  }

  const handlerChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const loadClient = async rut => {
    const res = await fetch(`http://localhost:3000/api/clients/${rut}`)
    const data = await res.json()
    setForm({ rut: data.cliente.rut, nombre: data.cliente.nombre, direccion: data.cliente.direccion })
    setEditing(true)
  }

  useEffect(() => {
    if (params.rut) {
      loadClient(params.rut)
    }
  }, [params.rut])

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' >
      <Typography style={{ margin: '1rem', color: `${message.status !== 201 ? 'red' : 'green'}`, fontWeight: 'bold' }}>
        {message.message}
      </Typography>
      <Grid item xs={3} >
        <Card sx={{ mt: 5 }} >
          <Typography style={{ margin: '1.5rem 0rem', textAlign: 'center' }}>
            {mode === 'agregar' ? 'Crear Cliente' : 'Editar Cliente'}
          </Typography>
          <CardContent>
            <form onSubmit={handlerSubmit}>
              <TextField id="" label="Rut" name='rut' value={form.rut} variant="outlined" sx={{ display: 'block', margin: '.5rem 0' }} onChange={handlerChange} autoComplete="off" />
              <TextField id="" label="Nombre" name='nombre' value={form.nombre} variant="outlined" sx={{ display: 'block', margin: '.5rem 0' }} onChange={handlerChange} autoComplete="off" />
              <TextField id="" label="Direccion" name='direccion' value={form.direccion} variant="outlined" sx={{ display: 'block', margin: '.5rem 0' }} onChange={handlerChange} autoComplete="off" />
              <Button type="submit">
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

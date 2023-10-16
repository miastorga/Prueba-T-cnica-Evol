import { Typography, Button, Card, CardContent, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function MedidorForm() {

  const location = useLocation()
  const mode = location.state.mode

  const navigate = useNavigate()
  const params = useParams()
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    fechacreacion: '',
    rut: ''
  })
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('')
  // const formatDate = isoDate => {
  //   const dateObj = new Date(isoDate)
  //   return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
  // }

  const handlerSubmit = async e => {
    e.preventDefault()

    if (!form.fechacreacion) {
      setMessage({ status: 'error', message: 'La fecha no puede estar vacía.' })
      return
    }

    if (editing) {
      const res = await fetch(`http://localhost:3000/api/medidores/${params.codigo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (data.status === 200) {
        console.log('medidor actualizad')
        navigate('/medidores')
      } else if (data.status === 400) {
        console.log('medidor no act')
        setMessage(data)
      } else {
        setMessage(data)
      }
    } else {
      const res = await fetch('http://localhost:3000/api/medidores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.status === 201) {
        setForm({
          codigo: '',
          nombre: '',
          fechacreacion: '',
          rut: ''
        })
        navigate('/medidores')
      } else if (data.status === 404) {
        setMessage(data)
      }
    }
  }

  const handlerChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses van de 0-11, por lo que añadimos 1
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }


  const loadClient = async codigo => {
    const res = await fetch(`http://localhost:3000/api/medidores/${codigo}`)
    const data = await res.json()
    const formattedDate = formatDate(data.medidor.fechacreacion)
    console.log(data.medidor.fechacreacion)

    setForm({ codigo: data.medidor.codigo, nombre: data.medidor.nombre, fechacreacion: formattedDate, rut: data.medidor.rut })
    setEditing(true)
  }

  useEffect(() => {
    if (params.codigo) {
      loadClient(params.codigo)
    }
  }, [params.codigo])

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Typography style={{ margin: '1rem', color: `${message.status !== 201 ? 'red' : 'green'}`, fontWeight: 'bold' }}>
        {message.message}
      </Typography>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }}>
          <Typography style={{ margin: '1.5rem 0rem', textAlign: 'center' }}>
            {mode === 'agregar' ? 'Crear Medidor' : 'Editar Medidor'}
          </Typography>
          <CardContent>
            <form onSubmit={handlerSubmit}>
              <TextField id="" value={form.codigo} name="codigo" label="Codigo" variant="outlined" onChange={handlerChange} sx={{ display: 'block', margin: '.5rem 0' }} />
              <TextField id="" value={form.nombre} name="nombre" label="Nombre" variant="outlined" onChange={handlerChange} sx={{ display: 'block', margin: '.5rem 0' }} />
              <TextField id="" value={form.fechacreacion} name="fechacreacion" InputLabelProps={{ shrink: true, }} label="Fecha creacion" placeholder="AAAA-MM-DD"
                variant="outlined" type="date" onChange={handlerChange} sx={{ display: 'block', margin: '.5rem 0' }} />
              <TextField id="" value={form.rut} name="rut" label="Rut" variant="outlined" onChange={handlerChange} sx={{ display: 'block', margin: '.5rem 0' }} />
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

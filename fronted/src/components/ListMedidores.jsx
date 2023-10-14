import { useState, useEffect } from "react"
import { Button, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import DataTable from "./Datatable"

function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function ListMedidores() {
  const [medidores, setMedidores] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const loadItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/medidores')
      const data = await response.json()
      const dataFormated = data['medidores'].map(medidor => (
        { ...medidor, fechacreacion: formatDate(medidor.fechacreacion) }
      ))
      setMedidores(dataFormated)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handlerDelete = async (codigo) => {
    const res = await fetch(`http://localhost:3000/api/medidores/${codigo}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    if (data.status === 409) {
      return setMessage(data)
    } else if (data.status === 500) {
      return setMessage(data)
    } else if (data.status === 200) {
      setMessage(data)
      return setMedidores(medidores.filter(medidor => medidor.codigo !== codigo))
    } else {
      return setMessage(data)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const columns = [
    { id: "codigo", label: "codigo" },
    { id: "nombre", label: "Nombre" },
    { id: "fechacreacion", label: "Fecha creacion" },
    { id: 'rut', label: 'Rut' },
    { id: "actions", label: "" }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
        <Typography style={{ margin: '1rem 0rem', fontSize: '2rem' }}>
          Medidores
        </Typography>
        <Typography style={{ margin: '0rem 0rem', fontSize: '1rem' }}>
          {message.message}
        </Typography>
        <Button style={{ margin: '1rem 0rem', fontSize: '1rem' }} onClick={() => navigate('/medidores/add', { state: { mode: 'agregar' } })}>
          + Agregar medidores
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={medidores}
        onEdit={(medidor) => navigate(`/medidores/edit/${medidor.codigo}`, { state: { mode: 'editar' } })}
        onDelete={handlerDelete}
      />
    </div>
  )
}
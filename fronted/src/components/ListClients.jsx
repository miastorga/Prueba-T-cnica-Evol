import { useState, useEffect } from "react"
import { Button, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import DataTable from "./Datatable"


export default function ListClients() {
  const [clientes, setClientes] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const loadItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clients')
      const data = await response.json()
      setClientes(data.clientes)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handlerDelete = async (rut) => {
    const res = await fetch(`http://localhost:3000/api/clients/${rut}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    if (data.status === 409) {
      return setMessage(data)
    } else if (data.status === 500) {
      return setMessage(data)
    } else if (data.status === 200) {
      setMessage(data)
      return setClientes(clientes.filter(cliente => cliente.rut !== rut))
    } else {
      return setMessage(data)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const columns = [
    { id: "rut", label: "Rut" },
    { id: "nombre", label: "Nombre" },
    { id: "direccion", label: "Dirección" },
    { id: "actions", label: "" }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
        <Typography style={{ margin: '1rem 0rem', fontSize: '2rem' }}>
          Clientes
        </Typography>
        <Typography style={{ margin: '0rem 0rem', fontSize: '1rem' }}>
          {message.message}
        </Typography>
        <Button style={{ margin: '1rem 0rem', fontSize: '1rem' }} onClick={() => navigate('/add', { state: { mode: 'agregar' } })}>
          + Agregar clientes
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={clientes}
        onEdit={(cliente) => navigate(`/edit/${cliente.rut}`, { state: { mode: 'editar' } })}
        onDelete={handlerDelete}
      />
    </div>
  )

}
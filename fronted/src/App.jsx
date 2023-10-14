import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListClients from './components/ListClients'
import NavBar from './components/Navbar'
import { Container } from '@mui/material'
import ClientsForm from './components/ClientsForm'
import ListMedidores from './components/ListMedidores'
import MedidorForm from './components/MedidorForm'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/clientes' element={<ListClients />} />
          <Route path='/clientes/add' element={<ClientsForm />} />
          <Route path='/clientes/edit/:rut' element={<ClientsForm />} />
          <Route path='/medidores' element={<ListMedidores />} />
          <Route path='/medidores/add' element={<MedidorForm />} />
          <Route path='/medidores/edit/:codigo' element={<MedidorForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App

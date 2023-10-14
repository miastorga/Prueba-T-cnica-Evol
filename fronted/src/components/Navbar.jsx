import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <a href='https://services.evol.energy/' target="_blank" rel="noreferrer">
                <img src="../../src/assets/evol.png" width={150} alt="" srcSet="" />
              </a>
            </Typography>
            <Button onClick={() => navigate('/clientes')}>
              clientes
            </Button>
            <Button onClick={() => navigate('/medidores')}>
              medidores
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

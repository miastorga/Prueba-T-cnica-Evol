import { Router } from "express"
import clientesRoutes from './clients.routes.js'
import medidoresRoutes from './medidores.routes.js'

const router = Router()

router.use('/api/clients', clientesRoutes)
router.use('/api/medidores', medidoresRoutes)

export default router
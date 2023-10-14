import { Router } from "express"

import { getClient } from '../controllers/clientes/getClient.js'
import { getAllClients } from '../controllers/clientes/getAllClients.js'
import { createClient } from '../controllers/clientes/createClient.js'
import { updateClient } from '../controllers/clientes/updateClient.js'
import { deleteClient } from '../controllers/clientes/deleteClient.js'

import { responseHandler } from "../middleware/responseHandler.js"
import { validateClient } from "../middleware/validationsClient.js"

const router = Router()

router.get('/', getAllClients, responseHandler)
router.get('/:rut', getClient, responseHandler)
router.post('/', validateClient, createClient, responseHandler)
router.put('/:rut', validateClient, updateClient, responseHandler)
router.delete('/:rut', deleteClient, responseHandler)

export default router
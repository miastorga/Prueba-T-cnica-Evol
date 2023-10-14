
import { Router } from "express"

import { createMedidor } from '../controllers/medidores/createMedidor.js'

import { responseHandler } from "../middleware/responseHandler.js"
import { validateMedidores } from "../middleware/validationsMedidores.js"
import { getAllMedidores } from "../controllers/medidores/getAllMedidores.js"
import { deleteMedidor } from "../controllers/medidores/deleteMedidor.js"
import { getMedidor } from "../controllers/medidores/getMedidor.js"
import { updateMedidor } from "../controllers/medidores/updateMedidor.js"

const router = Router()

router.post('/', validateMedidores, createMedidor, responseHandler)
router.get('/', getAllMedidores, responseHandler)
router.delete('/:codigo', deleteMedidor, responseHandler)
router.get('/:codigo', getMedidor, responseHandler)
router.put('/:codigo', validateMedidores, updateMedidor, responseHandler)

export default router
import express from 'express'
import morgan from 'morgan'
import router from './routes/index.routes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)

app.listen(3000)
console.log('Server on port 3000')
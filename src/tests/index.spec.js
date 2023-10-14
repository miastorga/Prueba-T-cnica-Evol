import request from 'supertest'
import app from '../app.js'
const pool = require('../../src/pg.js')


jest.mock('../../src/pg.js')

describe('createClient', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if client with RUT already exists', async () => {
    query.mockResolvedValueOnce({ rowCount: 1 })

    const res = await request(app)
      .post('http://localhost:3000/clients')
      .send({
        rut: '12345678-9',
        nombre: 'John Doe',
        direccion: '123 Main St',
      })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe('El cliente con ese RUT ya existe.')
  })
})

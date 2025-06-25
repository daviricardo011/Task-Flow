import { Router } from 'express'
import { connection } from '../config/database'
import userRoutes from './users.routes'

const router = Router()

router.get('/server-health', async (req, res) => {
  try {
    await connection.query('SELECT 1')
    res.status(200).json({ status: 'ok', database: 'connected' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'DB connection failed' })
  }
})

router.use('/users', userRoutes)

export default router
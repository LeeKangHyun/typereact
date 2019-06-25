import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

router.get('/Hello', (req: Request, res: Response) => {
  res.status(200).send({ str: 'Hello, World', id: 'Dev Kang' })
})

export default router

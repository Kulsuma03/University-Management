import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

//perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', usersRouter)

// testing
app.get('/', (req: Request, res: Response) => {
  res.send('University Management Start Successfully')
})

export default app

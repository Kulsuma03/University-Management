import { RequestHandler } from 'express'
import usersServices from './users.services'
import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
      }),
      password: z.string().optional(),
    })

    await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await usersServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const userController = {
  createUser,
}

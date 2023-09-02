import express from 'express'
import { usersController } from './users.controlelr'

const router=express.Router()


router.get('',usersController.getAllUsers)
router.get('/:id',usersController.getSingleUser)


export const userRouter=router
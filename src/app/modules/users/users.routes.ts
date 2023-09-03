import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { usersController } from './users.controlelr'

const router=express.Router()


router.get('',auth(ENUM_USER_ROLE.ADMIN),usersController.getAllUsers)
router.get('/:id',auth(ENUM_USER_ROLE.ADMIN),usersController.getSingleUser)
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN),usersController.updateSingleUsers)
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN),usersController.deleteSingleUser)


export const userRouter=router
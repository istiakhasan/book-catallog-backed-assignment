import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { orderController } from './orders.controller'



const router=express.Router()


router.post('/create-order',auth(ENUM_USER_ROLE.CUSTOMER),orderController.createOrders)
router.get('/',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER),orderController.getAllOrders)
// router.get('/:id',orderController.getSingleCategory)
// router.patch('/:id',orderController.updateCategory)
// router.delete('/:id',orderController.deleteCategory)


export const ordersRouter=router
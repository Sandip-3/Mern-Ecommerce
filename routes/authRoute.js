import express from 'express';
import {registerController, loginController ,getUserData, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

//router object
const router = express.Router();

//routing
//Register || Post Method
router.post('/register' , registerController)

//Login || Post Method
router.post('/login' , loginController);

router.post('/me',requireSignIn,getUserData)

//Forget Password || Post
router.post('/forgot-password' , forgotPasswordController)

//Test Protected Route
router.get('/test' , requireSignIn ,isAdmin, testController);

//Protected Dashboard 
router.get('/user-auth', requireSignIn, (req ,res) =>{
    res.status(200).send({ok: true});
} )

router.get('/admin-auth', requireSignIn, isAdmin ,(req ,res) =>{
    res.status(200).send({ok: true});
} )

router.put('/update-profile' , requireSignIn , updateProfileController)

//Orders
router.get('/orders' , requireSignIn , getOrdersController)

//All Orders
router.get('/all-orders' , requireSignIn , isAdmin, getAllOrdersController)

//Status
router.put('/order-status/:orderId' , requireSignIn , isAdmin, orderStatusController)



export default router;


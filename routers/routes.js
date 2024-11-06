import express from 'express';

const route = express.Router()
import { homeController } from '../controllers/homeController.js';
import { registerUser,Signup,loginUser,login } from '../controllers/userController.js';

route.get('/',homeController);

route.get('/registeration',registerUser)
route.post('/registeration',Signup)

route.get('/login',loginUser)
route.post('/login',login)


export default route;
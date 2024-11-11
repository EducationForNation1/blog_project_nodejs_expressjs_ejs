import express from 'express';

const route = express.Router()
import { homeController } from '../controllers/homeController.js';
import { registerUser,Signup,loginUser,login,logout } from '../controllers/userController.js';
import { isLogin,isLogout } from '../middleware/isLogin.js';
import dashboard from '../controllers/dashboard.js';
route.get('/',homeController);

route.get('/registeration',registerUser);
route.post('/registeration',Signup);

route.get('/login',isLogout,loginUser);
route.post('/login',login);

route.get('/dashboard',isLogin,dashboard);

route.get('/logout',isLogin,logout)


export default route;
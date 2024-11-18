import express from 'express';

const route = express.Router()
import { homeController } from '../controllers/homeController.js';
import { registerUser,Signup,loginUser,login,logout } from '../controllers/userController.js';
import { isLogin,isLogout } from '../middleware/isLogin.js';
import dashboard from '../controllers/dashboard.js';
import { createPost_get,createPost_post,upload,user_all_posts } from '../controllers/post.js';
route.get('/',homeController);

route.get('/registeration',registerUser);
route.post('/registeration',Signup);

route.get('/login',isLogout,loginUser);
route.post('/login',login);

route.get('/dashboard',isLogin,dashboard);

route.get('/logout',isLogin,logout)


// post
route.get('/create_post',isLogin,createPost_get);
route.post('/create_post',isLogin,upload.single('image'),createPost_post);
route.get('/user_all_posts',isLogin,user_all_posts);



export default route;
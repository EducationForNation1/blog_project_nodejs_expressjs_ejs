import postModel from "../models/postSchema.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the upload directory path
const uploadDir = path.join(process.cwd(),'public', 'uploads');

// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });


// create POST (get)
const createPost_get = async (req,res)=>{
    try {
        return res.render('user/create_post')
    } catch (error) {
        console.log(error.message)
    }
};


const createPost_post= async (req,res)=>{
    try {
        // console.log(req.body)

        const imagePath = req.file ? req.file.path : null; // Path to the uploaded file
        
        const response =  await postModel({
            'Title':req.body.post_title,
            'Description':req.body.post_description,
            'Image':req.file.filename,
            'createdBy':req.session.userId,
        });
        if(response){
            response.save();
            return res.render('user/create_post',{'errorMessage':'Post has been created'});
        }else{
            return res.render('user/create_post',{'errorMessage':'Something Wrong!'});
        }
    } catch (error) {
        console.log(error.message)
    }
};



// user_all_posts
const user_all_posts = async (req,res)=>{
        if(req.session && req.session.userId){
            const userId = req.session.userId;
            // res.send(req.session.userId)
            // console.log(req.session.userId)
            const all_posts_by_user =  await postModel.find({createdBy:userId})
            // console.log(all_posts_by_user)
           res.render('user/dashboard',{'name':req.session.name})
        }
}

export {createPost_get,createPost_post,upload,user_all_posts};
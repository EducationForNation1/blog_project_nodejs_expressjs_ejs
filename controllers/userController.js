import { render } from "ejs";
import userModel from "../models/UserSchema.js";
import bcrypt from 'bcryptjs';



const registerUser = (req, res) => {
    res.render('user/register_user');
};

const Signup = async (req, res) => {
    try {
        let myPassword = req.body.password;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(myPassword, salt);

        const userData = new userModel({
            Name: req.body.full_name,
            Email: req.body.email,
            Password: hashedPassword,
        });

        if (userData) {
           const email_exists =  await userModel.findOne({'Email':req.body.email})
            if(email_exists){
                return res.render('user/register_user',{ errorMessage: 'This email is already exists!'})
                // console.log('This email is exists:',email_exists)
            }else{
                await userData.save();
                // console.log('Data saved');
                return res.redirect('/login')
            }       
            
        } else {
            console.log('Data not saved, something went wrong!');
        }

        // console.log(req.body);
    } catch (error) {
        console.log(error.message);
    }
    res.render('user/register_user');
};





// Login User (get)
const loginUser = (req,res)=>{
    try {
        res.render('user/login')
    } catch (error) {
        console.log(error.message)
    }
}


// Login User (post)

const login = async (req,res)=>{
    try {
        // console.log(req.body)
        const record =  await userModel.findOne({"Email":req.body.email});
        if(record){
            const password = record.Password
          const result =  await bcrypt.compare(req.body.password,password)
          if(result){
                // create session
                req.session.userId = record._id;
             return res.redirect('/dashboard')
          }else{
            //  res.send("Welcome to my Dashboard")
           return res.redirect('/login')
          }
          
        }else{
            // console.log("Email Not Found")
           return res.render('user/login',{ errorMessage: 'This email is not exists!'})
        }
        // console.log(email)
        return res.render('user/login')
    } catch (error) {
        console.log(error.message)
    }
}

  

// logout
const logout = async(req,res)=>{
    try {
        if(req.session){
           await req.session.destroy();
           return res.redirect('/login')
        }
    } catch (error) {
       console.log(error.message) 
    }    
}

export { registerUser, Signup, loginUser,login,logout};
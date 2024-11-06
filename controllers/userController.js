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
            await userData.save();
            console.log('Data saved');
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
        console.log(req.body)
        const record =  await userModel.findOne({"Email":req.body.email});
        if(record){
            const password = record.Password
          const result =  await bcrypt.compare(req.body.password,password)
          if(result){
            // console.log("Password Matched")
            res.send("Welcome to my Dashboard")
          }else{
            //  res.send("Welcome to my Dashboard")
            res.send("password is not matched")
          }
          
        }else{
            // console.log("Email Not Found")
            res.render('user/login',{ errorMessage: 'This email is not exists!'})
        }
        // console.log(email)
        res.render('user/login')
    } catch (error) {
        console.log(error.message)
    }
}



export { registerUser, Signup, loginUser,login };
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name :{
        type:String,
        required:true,
    },

    Email :{
        type:String,
        required:true,
    },

    Password :{
        type:String,
        required:true,
    },
});


const userModel = mongoose.model('userRegistered',userSchema);

export default userModel;


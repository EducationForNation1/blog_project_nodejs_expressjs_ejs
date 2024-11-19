import mongoose from "mongoose";
import userModel from "./UserSchema.js";
const postSchema = new mongoose.Schema({
    Title :{
        type:String,
        required:true,
    },

    Description :{
        type:String,
        required:true,
    },
    Image: {
        type: String,
        required: false,  // Set to true if image is mandatory
    },

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userRegistered', 
        required: true }, // Reference to User
    
}, { timestamps: true });


const postModel = mongoose.model('post',postSchema);

export default postModel;


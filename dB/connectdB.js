import mongoose from "mongoose";

const connectdB = async(URL)=>{
    try {
       const db_options = {
            dbName : 'blog'
        }
    const dbMsg =   await mongoose.connect(URL,db_options);
    if(dbMsg){
        console.log('Connection Successfull!')
    }else{
        console.log('Connection Failed!')
    }

    } catch (error) {
        console.log(error.message)
    }
};



export default connectdB;
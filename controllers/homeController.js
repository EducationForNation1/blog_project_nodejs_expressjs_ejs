import postModel from "../models/postSchema.js";
import userModel from "../models/UserSchema.js";

const homeController = async(req,res)=>{
    try {
      const allPosts =   await postModel.find({}).populate('createdBy', 'Name');
    //   const userRecord = await userModel.find({createdBy:allPosts.createdBy})
    //     for(let i=0; i<userRecord.length; i++){
    //         if(userRecord[i]._id == allPosts.createdBy){
                
    //         }
    //     }
      console.log("All Posts",allPosts)
    //   console.log('User Data',userRecord)
        res.render('index',{"posts":allPosts})
    } catch (error) {
        console.log(error.message)
    }
}


export  {homeController};
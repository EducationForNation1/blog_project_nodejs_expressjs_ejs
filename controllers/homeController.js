import postModel from "../models/postSchema.js";

const homeController = async(req,res)=>{
    try {
      const allPosts =   await postModel.find({});
      console.log(allPosts)
        res.render('index',{"posts":allPosts})
    } catch (error) {
        console.log(error.message)
    }
}


export  {homeController};
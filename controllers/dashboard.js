import userModel from "../models/UserSchema.js";
const dashboard = async(req,res)=>{
    try {
     const userData = await userModel.find({'_id':req.session.userId})
      // console.log(userData[0].Name)
      res.render('user/dashboard',{'name':userData[0].Name});  

    } catch (error) {
        console.log(error.message);
    }
}


export default dashboard;
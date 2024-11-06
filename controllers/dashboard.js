const dashboard = (req,res)=>{
    try {
      res.render('user/dashboard');  
    } catch (error) {
        console.log(error.message);
    }
}


export default dashboard;
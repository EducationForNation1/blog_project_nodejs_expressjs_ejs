const isLogin = (req,res,next)=>{
    try {
        if(req.session && req.session.userId){
            next(); 
        }else{
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error.message)
    }
}



const isLogout = (req,res,next)=>{
    try {
        if(req.session && req.session.userId){
            res.redirect('/dashboard');
        }else{
            next()
        }
    } catch (error) {
        console.log(error.message)
    }
}


export {isLogin,isLogout}
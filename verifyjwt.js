const jwt=require('jsonwebtoken');

function verify(req,res,next){

    const authheader=req.headers.token;
    if(authheader){
        const token =authheader.split(" ")[1];
        jwt.verify(token,process.env.secret,(err,user)=>{
            if(err) res.status(403).json("token is not valid");
            req.user=user;
            next();
        })
    }

    else
    {
       return  res.status(401).json("you are not authenticated");
    }

}

module.exports=verify;
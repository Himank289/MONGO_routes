const router=require("express").Router();
const Admin=require("../models/Admin");
const CryptoJS= require("crypto-js");
const jwt=require('jsonwebtoken');

//register
router.post("/register", async (req, res) => {
    const newAdmin=new Admin({
        username: req.body.username,
        email: req.body.email,
        address:req.body.address,
        isAdmin:req.body.isAdmin,
        isHospital:req.body.isHospital,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.secret).toString(),

    });
    try{

        const user= await newAdmin.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err); 
    }
});



//login 
router.post("/login", async (req, res) => {
   
    try{

        const admin= await  Admin.findOne({email:req.body.email});
        !admin && res.status(401).json("wrong password");

        const bytes  = CryptoJS.AES.decrypt(admin.password, process.env.secret);
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword!==req.body.password && res.status(401).json("wrong password");

        const accesToken=jwt.sign({id:admin._id, isAdmin: admin.isAdmin} ,
            process.env.secret,
            {
                expiresIn:"7d"
            }
            
            );

            const {password,...info}=admin._doc;

        res.status(200).json({...info,accesToken});
    }catch(err){
        res.status(500).json(err); 
    }
});


module.exports=router;
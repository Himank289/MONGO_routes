const router=require("express").Router();
const User=require("../models/User");
const Admin=require("../models/Admin");
const Hosp=require("../models/Hospital");
const quer=require("../models/Query");
const verify=require("../verifyjwt");
const CryptoJS= require("crypto-js");
const { aggregate } = require("../models/User");


//GET query

router.get("/find/:id",async(req,res)=>{
    try{
       const querq=  await quer.findById(req.params.id);
       const {password,...info}=querq._doc;
            res.status(200).json(info);
     } catch(err){
        res.status(500).json(err);
    }

});


//GETALL queries
router.get("/",verify,async(req,res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){
        try{
             const users=query ? await quer.find().sort({_id:-1}).limit(10) : await quer    .find();
               res.status(200).json(users);
        } catch(err){
           res.status(500).json(err);
       }
    }
    else{
        res.status(403).json("You are not allowed to see all users")
    }

});

//Delete query /disregard query
 
router.delete("/:id",verify,async(req,res)=>{
    if(req.quer.id===req.params.id || req.user.isAdmin){
    try{
         await quer.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
     } catch(err){
        res.status(500).json(err);
    }
}else{
        res.status(403).json("You can delet only your  account")
    }

});


//GET all query statistics
router.get("/stats",async(req,res)=>{
    const today=new Date();
    const lastyear=today.setFullYear(today.setFullYear()-1);

    const montharray=["January","February","March","April","May","June","July","August","Septmeber","October",
"November","December"];

try {
    const data=await quer.aggregate([
        {
            $project:{
                month:{$month:"$createdAt"},
            },
    },{
        $group:{
            _id:"$month",
            total:{$sum:1},
        },
    },
]);
res.status(200).json(data)
    
} catch (err) {
    res.status(500).json(err);
}
});

//update query 

router.put("/:id",verify,async(req,res)=>{
    try{
        const updatedUser= await quer.findByIdAndUpdate(req.params.id,{
            $set:req.body},
            {new:true}
        );
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
    }

});

//Create Hospital

router.post("/create", async (req, res) => {
    const newHosp=new Hosp({
        hospitalname: req.body.hospitalname,
        email: req.body.email,
        address:req.body.address,
        contact:req.body.contact,
        doctorslist:req.body.doctorslist,
        departmentslist:req.body.departmentslist,
        treatmentlist:req.body.treatmentlist,
        policies:req.body.policies,       
        password: CryptoJS.AES.encrypt(req.body.password, process.env.secret).toString(),

    });
    try{

        const user= await newHosp.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err); 
    }
});


//create query
router.post("/createq", async (req, res) => {
    const newquer=new quer({
        userID:req.body.userID,
        hospitalID:req.body.hospitalID,
        queryText:req.body.queryText,
        queryAttachment:req.body.queryAttachment,
        queryStatus:req.body.queryStatus
    });
    try{

        const user= await newquer.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err); 
    }
});




module.exports = router
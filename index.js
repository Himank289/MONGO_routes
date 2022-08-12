const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/user');
const adminRoute=require('./routes/authadmin');
const adminsRoute=require('./routes/admin');


dotenv.config();


mongoose
    .connect(process.env.mongo_url, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/admins", adminsRoute);

app.listen(8800,()=>{
    console.log("Backend server is running!");
});











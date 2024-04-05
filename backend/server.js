require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');
const cors=require('cors')

const app=express();
const { Schema } = mongoose;
const PORT=process.env.PORT;
const mongodbUrl=process.env.MONGODB_URL
const siteUrl=process.env.SITE_URL
app.use(cors({
    origin: siteUrl, 
    credentials: true 
  }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))
const Secret=process.env.SECRET;


mongoose.connect(mongodbUrl).then(()=>{console.log("Database is running successfully !")}).catch((err)=>{console.log("error occur in db : ",err)})

const userSchema = new Schema({
    FirstName: {type:String,required:true}, // String is shorthand for {type: String}
    LastName: {type:String,required:true},
    email: {type:String,required:true},
    password:{type:String,required:true},
    Gender:{type:String,required:true},
    Mobile:{type:String,required:true},
    Dob: { type: Date,required:true},
  });

const User=mongoose.model('user',userSchema);


app.get('/',(req,res)=>{
    console.log("hi")
})

const checkUser=async(req,res,next)=>
{
    console.log(req.body.email)
    const data=await User.find({email:req.body.email})
    if(data.length===0)
    {
        next()
    }else{
    res.status(409).send("This email is already exist")
    }
}

app.post('/reg_page',checkUser,(req,res)=>{
    console.log(req.body);
    // checkUser(req.body.email)
    const password=Secret+req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
        if(!err)
        {
            const newUser=new User({
                FirstName:req.body.firstName,
                LastName:req.body.lastName,
                Gender:req.body.gender,
                Mobile:req.body.mobile,
                Dob:req.body.dob,
                email:req.body.email,
                password:hash
            })


            
            newUser.save().then((data)=>{
                console.log("new user is created successfully!")  
                res.status(200).send("congratulation your account is built")
            }).catch((err)=>{
                console.log("Error is occured during created user !",err)
                res.status(404).send("Something Went Wrong");
            })

        }else{
            console.log("Error is occured during created user !",err)
            res.status(404).send("Something Went Wrong");
        }

        });
    });
})

app.post('/log_page',async(req,res)=>{
    const pass=Secret+req.body.password;
     
    const user=await User.findOne({email:req.body.email})

     if(!user)
     {
        res.status(401).send("User not found");
     }else{
    
        bcrypt.compare(pass, user.password, function(err, result) {
             if(!err)
            {
                console.log(pass,user.password)
                if(result===true)
                {
                    console.log("congratulation you are connected")
                  
                    res.status(200).send({message:"congratulation you are connected",userId:user._id});
                }else{
                    console.log("wrong pass",result)
                    res.status(401).send("Wrong password.");
                }
            }else{
                console.log("error aa gya user nhi hoga login !",err)
                res.status(404).send("Something Went Wrong");
            }
        });
    }
   
})


app.listen(PORT,()=>{console.log("Server is running ",PORT)})
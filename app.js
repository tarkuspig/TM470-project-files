
const express = require("express");
const app=express();
const mongoose= require("mongoose");
app.use(express.json());
app.use(express.static('./gamefinal/prototype2/dist'))  //game files served
const bcrypt= require("bcryptjs") //encryption 
const jwt = require('jsonwebtoken'); //Web token authorisation
const menu = require('./menudata.json') //move menu to backend
const mongoUrl = "mongodb+srv://dcavin87:EnY0HbeJCXynPOrV@cluster0.dnhfiun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const JWT_HIDDEN = "sudhgosifhvpoijs;dcjmvjpwojugoiuhspfokg'apde]fpjws[fobgj'spdfkhbgfikhb+_8uouwrhg"
var cron = require('node-cron'); //job scheduler 

let daily_winner =['???', '?'] //Winners placeholder

mongoose
    .connect(mongoUrl) 
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log(e);
    });

app.get("/", (req, res)=>{  //
    res.send({status: "Started"})
});
require('./UserDetails')

app.get("/winner", (req, res)=>{
    res.send({daily_winner});   //sends winner information to home screen
});

//below is the scheduled winner being updated
cron.schedule('0 11 * * *', async () => {
    console.log('changing welcome message');
    
      console.log("resetting scores")
      try{
      const winner = await User.findOne({}).sort({daily_score: -1})
      console.log(winner)
      daily_winner = [winner.username, winner.daily_score]
      console.log(daily_winner)
      }
      catch(error){
        console.log(error)
      }      
  }); 
cron.schedule('0 18 * * *', async () => {  
    console.log('running a task every day at 6pm'); //resets daily scores
    
      console.log("resetting scores")
      
      try{
          await User.updateMany({}, {$set: {daily_score: 0, played: false}})
          console.log("update successful")
  
          res.send({ status:"ok", data: 'scores updated'});
      }   catch(error) {
          res.send({ status: "error", data: error });
      }
});
  
cron.schedule('0 18 * * *', async () => { //resets welcome message
    console.log('changing welcome message to ?');
    
      console.log("resetting scores")
      try{
      daily_winner = ['???', "?"]
      console.log(daily_winner)
      }catch(error){
        console.log(error)
      }
}); 
    


const User=mongoose.model("UserInfo");



app.get('/leaderboard', async(req, res) => {
    
    const userData = await User.find({});
    try{

        res.send({ status:"ok", data:userData });
    }   catch(error) {
        res.send({ status: "error", data: error });
    }
})

app.get('/menu', async(req, res) => { ///menu attempt
    
    
    try{

        res.send({ status:"ok", data:menu });
    }   catch(error) {
        res.send({ status: "error", data: error });
    }
})



app.post('/register', async(req, res) => {
    const {name, email, username, password, cumulative_score, daily_score} = req.body;

    const oldUser = await User.findOne({username:username});
    const oldEmail = await User.findOne({email:email});
    if(oldUser){
        return res.send({ data: "User already exists"})
    }
    if(oldEmail){
        return res.send({ data: "Email Address Already Registered"})
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    try {
        await User.create({
            name: name,
            username: username,
            email: email,
            cumulative_score: cumulative_score,
            daily_score: daily_score,
            password: encryptedPassword,
        });
        res.send({ status:"ok", data:"User Created" });
    }   catch(error) {
        res.send({ status: "error", data: error });
    }
});

app.post("/login-user", async(req, res) =>{
    
    const {username, password}=req.body;
    const oldUser=await User.findOne({username: username});

    if(!oldUser){
        return res.send({data: "Username Invalid"})
    }
    if(await bcrypt.compare(password, oldUser.password)){
        const token = jwt.sign({username: oldUser.username}, JWT_HIDDEN, {expiresIn: 30}); //token expiry in 5 minutes
        if(res.status(201)) {
            return res.send({status: "ok", data:token})
        }else{
            return res.send({ error: "error"});
        }
         
    }
});

app.post("/userdata", async(req, res) =>{
    const {token}=req.body;
    try{
        const user= jwt.verify(token, JWT_HIDDEN)
        const userId = user.username;
        
        User.findOne({ username: userId}).then((data) => {
            return res.send({ status: "ok", data: data})
        })
    } catch (error) {
        return res.send({ error: "error"});
    }
})


app.put("/log-score", async(req, res) =>{
    
    const multiscore = req.body[0][0];
    const score = req.body[0][1];
    const userId = req.body[1];
    try{
        const played = await User.findOne({ username: userId}, {played:1, _id:0}) 
        
        if(!played.played){
                console.log(multiscore)
                console.log(score)
                
                console.log(userId)
                await User.updateOne({ username: userId}, { $set: {daily_score: multiscore}})
                await User.updateOne({ username: userId}, { $inc: {cumulative_score: score}})
                await User.updateOne({ username: userId}, { $set: {played: true}})
        }       

    } 
    catch (error) {
        return res.send({ error: "error"});
    }
}


)
//
app.listen(5001, ()=>{
    console.log("Node js server has been started");
})

/* app.get('/leader', async(req, res) => { //attempt to get leader displayed, unsuccessful
    const overall = await User.findOne({}).sort({cumulative_score: -1})
    const daily = await User.findOne({}).sort({daily_score: -1})
    leaderData = [overall, daily]

    try{

        res.send({ status:"ok", data:leaderData });
        
    }   catch(error) {
        res.send({ status: "error", data: error });
    }
}) */
//EnY0HbeJCXynPOrV password, dcavin87 username
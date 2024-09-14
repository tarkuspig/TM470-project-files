const mongoose=require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
    name: String,
    username: {type: String, unique:true},
    email: {type: String, unique:true},
    password: String,
    cumulative_score: Number,
    daily_score: Number,
    played: Boolean, ///added for play once a daysolution
},{
    collection:"UserInfo"
});
mongoose.model("UserInfo", UserDetailsSchema);
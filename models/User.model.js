const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String
    },
    role:{
        type:String,
        enum:["viewer","creator"],
        default:"viewer"
    }

},{
    timestamps:true
});
 const User =mongoose.model("User",UserSchema)
 module.exports=User;
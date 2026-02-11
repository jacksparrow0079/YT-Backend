const mongoose =require("mongoose");

const VideoStatsSchema =new mongoose.Schema({
    video_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    },
    duratiom:{
        type:String,
        
    },
    dislikes:{
        type:Number,
        default:0
    },
    category:{
        type:String
    },
    tags:{
        type:[String]
    }
  
},{
timestamps:true
})


 const VideoStats = mongoose.model("VideoStats",VideoStatsSchema);
 module.exports=VideoStats;
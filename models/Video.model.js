const mongoose =require("mongoose");

const VideoSchema =new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel"
    }
},{
timestamp:true
})
 const Video = mongoose.model("Video",VideoSchema);
 module.exports=Video;
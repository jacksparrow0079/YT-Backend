const Video =require ("../models/Video.model");
const VideoStats = require("../models/VideoStats.model")

// contyroller to insert video amd video stats
const publishVideo=async(req,res)=>{
    try{
        const{title,description,channelId,category,tags}=req.body;

        // create video
        const video =new Video({
            title,description,channelId
        })
        await video.save();
        // create stats
        const stats=new VideoStats({
            category,tags,video_id: video._id
        })
        await stats.save();
        return res.status(201).json({message:"video and video stats inserted succesfully",
            video,stats
        })

    }catch(err){
        console.log(err);
    }
}

module.exports={publishVideo}
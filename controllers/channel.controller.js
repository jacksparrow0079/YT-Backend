const Channel = require("../models/Channel.model");
const User =require("../models/User.model")
const mongoose=require("mongoose")

const createChannel = async (req, res) => {
  try {
    const { ownerId, channelName, about } = req.body;

    const newChannel=new Channel({
        ownerId,
        channelName,
        about
    });
    await newChannel.save();

    return res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (err) {
    console.error("Error creating channel:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


const getAccountdetails =async(req,res)=>{
    try{
        const{userId}=req.body;
        const data=await User.aggregate([
            // stage
            {
            $match:{
                _id: new mongoose.Types.ObjectId(userId)
            }
            },
            {
                $lookup:{
                    from:"channels",
                    localField:"_id",
                    foreignField:"ownerId",
                    as:"details"
                }

            },
            {
                $unwind:{
                    path:"$details"
                }
            },
             {
                $project:{
                    username:1,
                    about:1,
                    channelName:"$details.channelName",
                    about:"$details.about"

                }
             },
        ])
        return res.status(200).json({message:"data fetched",data})

    }catch(err){
        console.log("err",err)
    }
};
// controller to get video stast response everything at one time 
const getAllDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "channels",
          localField: "_id",
          foreignField: "ownerId",
          as: "channel"
        }
      },
      {
         $lookup: {
          from: "videos",
          localField: "channel._id",
          foreignField: "channelId",
          as: "videos"
        }
      },
      {
         $lookup: {
          from: "videostats",
          localField: "video_id._id",
          foreignField: "video_Id",
          as: "stats"
        }
      },

    //   stage 5
   {
        // operaiton name
      $addFields: {
        // new field name - your choice
          videos: {
            // map operation - iterate
            $map: {
              // iterate on videos array
              input: "$videos",
              // videos : [{v1}, {v2}, {v3}, {v4}]
              // stats : [{s1}, {s2}, {s3}, {s4}]
              as: "video",

              /*
               {
                  ...video,

               }
              */
              in: {
                $mergeObjects: [
                  "$$video",
                  {
                    stats: {
                      $arrayElemAt: [
                        {
                          //  // stats : [{s1}, {s2}, {s3}, {s4}]
                          $filter: {
                            input: "$stats",
                            as: "stat",
                            cond: { $eq: ["$$stat.video_id", "$$video._id"] }
                          }
                        },
                        0
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      },

    
    ]);

    return res.status(200).json({
      message: "Details fetched successfully",
      data
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = { createChannel,getAccountdetails ,getAllDetails};

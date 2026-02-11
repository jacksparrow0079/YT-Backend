const mongoose=require("mongoose");

const ChannelSchema = new mongoose.Schema({
  ownerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  channelName:{
    type:String,
  },
  about:{
    type:String,
  },

},{
    timestamps:true
});
 const Channel=mongoose.model("Channel",ChannelSchema)
 module.exports=Channel;
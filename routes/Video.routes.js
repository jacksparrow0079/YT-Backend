const express=require("express");
const { publishVideo } = require("../controllers/video.controller");

const router= express.Router();

router.post("/publishVideo",publishVideo);

module.exports=router;
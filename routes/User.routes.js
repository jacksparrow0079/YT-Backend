const express=require("express");
const {createUser, getUsers}=require("../controllers/user.controller.js");


//router 
const router =express.Router();
// api's
router.post("/CreateUser",createUser)

router.get("/getUsers",getUsers);

module.exports=router;
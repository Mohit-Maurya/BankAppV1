import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);


// "/user/:userId" 

// GET
export const getUser = (req, res) => {
    User.findOne({userId : req.params.userId}, (err, result) => {
        if (err){
            //server error
            return res.status(500).send(err);
        }
        else if(result && result.status != "deleted"){
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });
};

// POST
export const verifyUser = (req, res) => {
    User.findOne({userId : req.params.userId}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result && result.status != "deleted"){
            if(result.password == req.body.password){
               return res.send("Authorized User");
            }
        } else {
            res.status(404);
            res.send("Unauthorised User");
        }
    });
};

// PUT
export const updateUser = (req, res) => {
   User.findOneAndUpdate({userId:req.params.userId},req.body,{new:true},(err,User)=>{
    if(err)
        return res.send(err);  
    res.status(200).send("Update User Successfully");    
 })
};

// DELETE (actually using PATCH)
export const deleteUser = (req, res) => {

    console.log(req.params.userId);
    User.updateOne(
        {userId: req.params.userId},
        {"status": "deleted"},
        (err, result) => {
            if (err){
                //server error
                res.status(401);
                res.send(err);
            }
            else {
                console.log("Updated status to deleted for userId: ", req.params.userId);
                res.sendStatus(200);
            }
        }
    );
}



// "/users"

// GET
export const getUsers = (req, res) => {
    User.find({}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result && result.status != "deleted"){
            res.send(result);
        }
        else {
            res.sendStatus(404);
        }
    });
};

// POST
export const addNewUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.userId = newUser.mobileNumber;
    newUser.status = "Pending";

    newUser.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
            console.log("New user added for approval: " + result);
            res.status(200).send(result);
        }
    });
};

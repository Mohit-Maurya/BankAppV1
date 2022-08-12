import mongoose from "mongoose";
import bcrypt from 'bcrypt';
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
export const verifyUser = async(req, res) => {
    User.findOne({userId : req.params.userId}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result && result.status != "deleted"){
            if(bcrypt.compare(req.body.password,result.password)){
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
   User.findOneAndUpdate({userId:req.params.userId},req.body,{new:true},(err, result)=>{
    if(err) throw err;
    res.status(200).send("Update User Successfully")    
 })};



// DELETE (actually using PATCH)
export const deleteUser = (req, res) => {

    // TODO: change status for account to deleted --- Mohit
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
// TODO: encrypt password --- Sweety
export const addNewUser = async (req, res) => {
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newUser.password,salt)
    newUser.password = hashedPassword
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

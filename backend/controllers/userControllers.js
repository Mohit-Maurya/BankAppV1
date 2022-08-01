import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);


// "/user/:userId" 

// GET
export const getUser = (req, res) => {
    User.findOne({userId : req.params.userId}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
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
        else if(result){
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
    const updateUser = new User(req.body);
    updateUser.userId = req.params.userId;
    updateUser.status = "Approved";

    User.deleteOne({userId : req.params.userId}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        } 
        else if(result.deletedCount){
            console.log("Updating user: ", typeof(result.deletedCount));
        }
        else {
            res.status(404);
            res.send("User with userId: " + userId + ". Not found.");
        }
        
    });

    updateUser.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
            console.log("Updated user: ", result);
            res.send(result);
        } 
        else {
            res.status(404);
            res.send("Unauthorised User");
        }
    }); 
};



// "/users"

// GET
export const getUsers = (req, res) => {
    User.find({}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
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
            res.send(result);
        } 
        else {
            res.sendStatus(404);
        }
    });
};

import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const getUser = (req, res) => {
    User.findOne({userId : req.params.userId}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
            res.send(result);
        }
        res.sendStatus(404);
    });
};

export const verifyUser = (req, res) => {
    User.findOne({userId : req.params.userId}, (err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
            if(result.password == req.body.password){
                res.send("Authorized User");
            }
        }
        res.status(404);
        res.send("Unauthorised User");
    });
};

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
        res.sendStatus(404);
    });
};

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
        // res.sendStatus(404);
    });
};

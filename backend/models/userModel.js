import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    userId: {
        type: String
    },
    name: {
        type:String,
        required:true
    },
    pan: {
        type:String,
        required:true
    },
    aadhaarNumber: {
        type:String,
        required:true
    },
    mobileNumber: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    permanentAddress: {
        type:String,
        required:true
    },
    temporaryAddress: {
        type:String
    },
    status: {
        type:String
    },
    password: {
        type:String
    },
    accounts: { 
        type : Array ,
         "default" : [] 
    }

}, 
{ collection : 'users' }
)
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BankBranchSchema = new Schema({
    ifsc: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    }

}, { collection: 'bankBranches' })
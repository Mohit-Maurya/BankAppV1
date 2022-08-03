import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AccountSchema = new Schema({
    accountNumber: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    branch: {
        ifsc: {
            type: String,
            required: true
        },
        branchName: {
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
    },
    balance: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    beneficiaries: {
        type: Array,
        "default": []
    },
    transactions: {
        type: Array,
        "default": []
    }
}, { collection: 'accounts' })
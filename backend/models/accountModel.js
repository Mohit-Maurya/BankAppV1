import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AccountSchema = new Schema({
    accountHolderId: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    branch: {
        branchId: {
            type: String,
            required: true
        },
        branchCity: {
            type: String,
            required: true
        },
        branchState: {
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
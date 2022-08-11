import { Double } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TransactionSchema = new Schema({
    transactionId: {
        type: String
    },
    action: {
        type: String, // (deposit / sent / received)
        required: true
    },
    depositSource: { // to be hardcoded in frontend
        type: String,
    },
    toAccountNo: {
        type: String
    },
    fromAccountNo: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transactionTime: {
        type: Date
    }
}, {_id: false});

export const AccountSchema = new Schema({
    accountNumber: {
        type: String
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
        type: Number,
        required: true
    },
    status: {
        type: String
    },
    beneficiaries: {
        type: Array,
        "default": []
    },
    transactions: [TransactionSchema]
}, { collection: 'accounts' })
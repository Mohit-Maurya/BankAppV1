import mongoose from "mongoose";
import { AccountSchema, TransactionSchema } from "../models/accountModel";

const Account = mongoose.model("Account", AccountSchema);


// "/accounts"

// POST 
export const addNewAccount = (req, res) => {
    const newAccount = new Account(req.body);
    newAccount.status = "active";

    //Create new account number: Algorithm
    // TODO: add userID last 4 digits in account number -- Mohit
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const ifsc = newAccount.branch.ifsc;
    const userIdPortion = newAccount.userId;
    newAccount.accountNumber = 
        hours 
        + minutes 
        + seconds 
        + ifsc.substring(ifsc.length - 4) 
        + userIdPortion.substring(userIdPortion.length - 3);

    console.log("new account number generated: ", newAccount.accountNumber);

    newAccount.save((err, result) => {
        if (err) throw err;
        console.log("New account added: ", newAccount);
        return res.send("New account added successfully");
    });
}


// "/accounts/:userId"

// GET
export const getUserAccounts = (req, res) => {
    Account.find({userId: req.params.userId}, (err, result) => {
        if (err) throw err;
        return res.send(result);
    });
}


// "/account/:accountNumber"

// GET
export const getAccount = (req, res) => {
    Account.findOne({accountNumber: req.params.accountNumber}, (err, result) => {
        if (err) throw err;
        return res.send(result);
    });
}

// PUT: (insert transaction object in account and update balance)
export const transaction = (req, res) => {
    
    // console.log(req.body)
    // creating transactionId
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const accountNumber = req.body.accountNumber;
    const amount = req.body.newTransaction.amount;
    const transactionId = hours + minutes + seconds + accountNumber + amount + randomIntFromInterval(11, 99);

    req.body.newTransaction.transactionTime = date;
    req.body.newTransaction.transactionId = transactionId;
    console.log(req.body)
    console.log("--------------------------------------------------")
    Account.updateOne(
        {accountNumber: req.body.accountNumber},
        { $push: { transactions:{...req.body.newTransaction} } },
        {new:true},
        (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send("TransactionId: " + transactionId);
        }
    );
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
import { Logger } from "mongodb";
import mongoose from "mongoose";
import { findOne } from "mongoose/lib/model";
import { AccountSchema, TransactionSchema } from "../models/accountModel";

const Account = mongoose.model("Account", AccountSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);


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

// PUT
export const transaction = async (req, res) => {
    console.log("req.body: \n" + req.body);
    const newTransaction = new Transaction(req.body.newTransaction);
    // creating transactionId
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const accountNumber = req.body.accountNumber;
    const amount = newTransaction.amount;
    const transactionId = hours + minutes + seconds + accountNumber + amount + randomIntFromInterval(11, 99);

    req.body.newTransaction.transactionTime = date;
    req.body.newTransaction.transactionId = transactionId;

    const action = newTransaction.action;

    if(action == "sent") {
        const receiverAccount = await Account.findOne({accountNumber: newTransaction.toAccountNo}).exec();
        // setting receiver balance
        receiverAccount.balance += amount;
        // creating receiver transaction object
        const receiverNewTransaction = new Transaction();
        receiverNewTransaction.transactionId = transactionId;
        receiverNewTransaction.action = "received";
        receiverNewTransaction.fromAccountNo = accountNumber;
        receiverNewTransaction.amount = amount;
        receiverNewTransaction.balance = receiverAccount.balance;
        receiverNewTransaction.transactionTime = date;
        //pushing to existing transactions array
        receiverAccount.transactions.push(receiverNewTransaction);

        Account.updateOne(
            {accountNumber: newTransaction.toAccountNo},
            receiverAccount,
            {new:true},
            (err, result) => {
                if(err) throw err;
                console.log(result);
            }
        );
    }
    Account.findOneAndUpdate(
        {accountNumber: req.body.accountNumber},
        // account,
        { $push: {transactions: {...req.body.newTransaction}}, 
          $set: {balance: newTransaction.balance}},
        {new:true},
        (err, result) => {
            if(err) throw err;
            res.send("TransactionId: " + transactionId);
        }
    );
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
import mongoose from "mongoose";
import { findOne } from "mongoose/lib/model";
import { AccountSchema, TransactionSchema } from "../models/accountModel";
import { UserSchema } from "../models/userModel";

const Account = mongoose.model("Account", AccountSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);
const User = mongoose.model("User", UserSchema);


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

    User.findOneAndUpdate(
        {userId: newAccount.userId},
        {$push: {accounts: newAccount.accountNumber}},
        (err, result) => {
            if (err) throw err;
        }
    );
    newAccount.save((err, result) => {
        if (err) throw err;
        console.log("New account added: ", newAccount);
        return res.send("New account added successfully");
    });
}


// "/accounts/:userId"

// GET
export const getUserAccounts = (req, res) => {
    Account.find({$and: [{userId: req.params.userId}, {status: {$ne: "deleted"}}]}, (err, result) => {
        if (err) {
            throw err;
        }
        else if(result){
            return res.send(result);
        } 
        else {
            return res.sendStatus(404);
        }
    });
}

//DELETE (actually using PATCH)
export const deleteUserAccounts = (req, res) => {
    Account.updateMany(
        {userId: req.params.userId},
        {status: "deleted"},
        (err, result) => {
            if(err) throw err;
        }
    );
}


// "/account/:accountNumber"

// GET
export const getAccount = (req, res) => {
    Account.findOne({accountNumber: req.params.accountNumber}, (err, result) => {
        if (err) throw err;
        if(!(result && result.status != "deleted")) return res.send("Invalid account number");
        return res.send(result);
    });
}

// DELETE (actually using PATCH)
export const deleteAccount = (req, res) => {
    Account.updateOne(
        {accountNumber: req.params.accountNumber},
        {status: "deleted"},
        (err, result) => {
            if(err) throw err;
            if(!result.modifiedCount) return res.send("Unable to delete given account.");
            console.log("Updated status to deleted for accountNumber: ", req.params.accountNumber);
            return res.send("Successfully deleted");
        }
    );
}


//"/accounts/transactions"
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
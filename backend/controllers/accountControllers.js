import mongoose from "mongoose";
import { AccountSchema } from "../models/accountModel";

const Account = mongoose.model("Account", AccountSchema);


// "/accounts"

// POST 
export const addNewAccount = (req, res) => {
    const newAccount = new Account(req.body);
    newAccount.status = "active";

    //Create new account number
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const ifsc = newAccount.branch.ifsc;
    newAccount.accountNumber = hours + minutes + seconds + ifsc.substring(ifsc.length - 4);
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

import mongoose from "mongoose";
import { AccountSchema } from "../models/accountModel";

const Account = mongoose.model("Account", AccountSchema);


// "/accounts"

// POST 
// :TODO
export const addNewAccount = (req, res) => {
    const newAccount = new Account(req.body);
}


// "/accounts/:userId"

// GET
export const getUserAccounts = (req, res) => {
    Account.find({userId: req.params.userId}, (err, result) => {
        if (err) throw err;
        return res.send(result);
    });
}

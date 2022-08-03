import mongoose from "mongoose";
import { BankBranchSchema } from "../models/bankBranchModel";

const BankBranch = mongoose.model("BankBranch", BankBranchSchema);


// "/bank-branch"
export const getBranches = (req, res) => {
    BankBranch.find({}, (err, result) => {
        if(err) {
            throw err;
        } else {
            return res.send(result);
        }
    });
};

// "/bank-branch/locations"

//GET 
// getting called on user side, hence only certain information is being sent
export const getBankLocations = (req, res) => {
    BankBranch.find({}, (err, result) => {
        if (err) {
            throw err;
        } else {
            const locations = [];
            let branchName;
            let address;
            result.forEach(element => {
                branchName = element.branchName;
                address = element.address;
                locations.push({ branchName, address});
            });
            return res.send(locations);
        }
    });
};
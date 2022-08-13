import {
    getUser,
    verifyUser,
    updateUser,
    deleteUser,
    getUsers,
    addNewUser
} from "../controllers/userControllers";

import {
    addNewAccount,
    getUserAccounts,
    getAccount,
    transaction,
    deleteAccount
} from "../controllers/accountControllers";

import {
    getBranches,
    getBankLocations
} from "../controllers/bankBranchControllers";
import { Transaction } from "mongodb";


const routes = (app) => {

    //---------users----------
    app.route("/users")
    .get(getUsers)
    .post(addNewUser)

    app.route("/user/:userId")
    .get(getUser)
    .post(verifyUser)
    .put(updateUser)
    .delete(deleteUser)


    //--------accounts--------
    app.route("/accounts")
    .post(addNewAccount)

    // accountHolderIs == userId
    app.route("/accounts/:userId")
    .get(getUserAccounts)
    // .delete(deleteUserAccounts)

    app.route("/account/:accountNumber")
    .get(getAccount)
    .delete(deleteAccount)

    app.route("/accounts/transactions")
    .put(transaction)
    

    //-------bank-branches------
    app.route("/bank-branch")
    .get(getBranches)

    app.route("/bank-branch/locations")
    .get(getBankLocations)
    

}

export default routes;
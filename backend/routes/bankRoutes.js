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
    getUserAccounts
} from "../controllers/accountControllers";

import {
    getBranches,
    getBankLocations
} from "../controllers/bankBranchControllers";


const routes = (app) => {
    app.route("/users")
    .get(getUsers)
    .post(addNewUser)

    app.route("/user/:userId")
    .get(getUser)
    .post(verifyUser)
    .put(updateUser)
    .delete(deleteUser)

    // app.route("/admin/:employeeId")
    // .get(getAdmin)

    app.route("/accounts")
    .post(addNewAccount)

    // accountHolderIs == userId
    app.route("/accounts/:userId")
    .get(getUserAccounts)



    app.route("/bank-branch")
    .get(getBranches)

    app.route("/bank-branch/locations")
    .get(getBankLocations)
    

}

export default routes;
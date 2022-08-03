import {
    getUser,
    verifyUser,
    updateUser,
    deleteUser,
    getUsers,
    addNewUser
} from "../controllers/userControllers";


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

}

export default routes;
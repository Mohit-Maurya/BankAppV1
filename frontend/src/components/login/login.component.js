import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {log_in} from '../../features/user'
import Footer from "../navigation/footer.component";
// import Navigation from "../navigation/nav.component";

function Login() {
  const styleInput = {
    backgroundColor: "rgb(237, 241, 242)",
    width: "100%",
  };

  const [login, setLogin] = useState({ userid: "", password: "", error: "" });
  const user = useSelector((state)=>state.user.value)
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const submitUserLogin = (event) => {
    event.preventDefault();
    console.log(login)
    axios
      .post("http://localhost:8080/user/" + login.userid, login)
      .then((res) => {
        if (res.data === "Authorized User")
          {
            console.log("login user: ",login.userid)
            dispatch(log_in({ userid: login.userid,loggedin:true }))
            navigate("/accounts", { state: { userid: login.userid } });
          }
      })
      .catch((err) => {
        if (err.response.data === "Unauthorised User")
          setLogin((prevState) => ({
            ...prevState,
            error: "Invalid credentials",
          }));
        console.log(err);
      });

      console.log(user.userid)
  };

  return (
    <div className="d-flex flex-row">
      <div className="card mt-5 ms-5" style={{ width: "45vw" }}>
        <h5 className="card-header">User Login</h5>
        <div className="card-body">
          <label>UserId</label>
          <input
            type="text"
            id="userid"
            className="form-control rounded-0"
            style={styleInput}
            onChange={(e) =>
              setLogin((prevState) => ({
                ...prevState,
                userid: e.target.value,
              }))
            }
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            id="userpassword"
            className="form-control rounded-0"
            style={styleInput}
            onChange={(e) =>
              setLogin((prevState) => {
                return { ...prevState, password: e.target.value };
              })
            }
          />
          <br />
          <p>
            <span style={{ color: "red" }}>{login.error}</span>
          </p>
          <br />
          <Link to="/registration" className="float-start mt-2">
            New User ?
          </Link>
          <button
            className="btn btn-primary float-end"
            onClick={submitUserLogin}
          >
            Login
          </button>
        </div>
      </div>
      <div className="card mt-5 ms-5" style={{ width: "45vw" }}>
        <h5 className="card-header">Admin Login</h5>
        <div className="card-body">
          <label>Email</label>
          <input
            type="email"
            id="email"
            className="form-control rounded-0"
            style={styleInput}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            id="adminpassword"
            className="form-control rounded-0"
            style={styleInput}
          />
          <br />
          <button className="btn btn-primary float-end">Login</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

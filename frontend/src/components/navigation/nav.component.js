import React from "react";
import { useSelector ,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {log_out} from "../../features/user"


function Navigation() {
  const headerStyles = {
    backgroundColor: "#2d3c64",
    textColor: "#fff",
  };

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.value)
  console.log(user)



  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyles}>  
      <div className="container-fluid">

        <div className="parent collapse navbar-collapse" id="navbarSupportedContent">
          
          <div className="leftChild"> 
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                !user.loggedin &&
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      Login
                    </a>
                  </li>
              }

            {
                !user.loggedin &&
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/registration"
                    >
                      Registration
                    </a>
                </li>
            }

              {
                user.loggedin &&
                    <li className="nav-item">
                      <button className="nav-link active"  aria-current="page" onClick={()=>{navigate("/profile", { state: { userid: user.userid } });}}
                      style={{backgroundColor:"transparent",border:"none"}}>
                          Profile
                      </button>
                    </li>             
              }

              {
                user.loggedin &&
                    <li className="nav-item">
                      <button className="nav-link active"  aria-current="page" onClick={()=>{navigate("/accounts", { state: { userid: user.userid } });}}
                      style={{backgroundColor:"transparent",border:"none"}}>
                          Accounts
                      </button>
                    </li>             
              }

              {
                user.loggedin &&
                    <li className="nav-item">
                      <button className="nav-link active"  aria-current="page" onClick={()=>{dispatch(log_out());console.log(user);navigate("/");}}
                      style={{backgroundColor:"transparent",border:"none"}}>
                          LogOut
                      </button>
                    </li>             
              }

            </ul>
          </div>
          <div className="rightChild">
            <h2 className="navbar-nav" style={{color: "#fff"}}>404 Bank</h2>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';

function Login() {
    const [login, setLogin] = useState({ userid: "", password: "" ,error:''})
    let navigate = useNavigate();

    const submitUserLogin = (event) => {
        event.preventDefault();
        console.log(login.userid, login.password);
        // let headers= {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*"
        // }
        axios.post('http://localhost:8080/user/'+login.userid,login)
            .then((res)=>{
                console.log(res);
                if(res.data==="Authorized User")
                    navigate('/profile')    
            })
            .catch((err)=>{
                if(err.response.data==="Unauthorised User")
                        setLogin((prevState)=>({...prevState,error:"Invalid credentials"}))
                console.log(err)
            })
    }

    return (
        <div className='d-flex flex-row'>
            <div className="card mt-5 ms-5" style={{ width: '45vw' }}>
                <h5 className="card-header">User Login</h5>
                <div className="card-body">
                    <label >UserId</label>
                    <input type='text' id='userid' className='form-control rounded-0' style={{ width: '75%' }} onChange={(e) => setLogin((prevState) => ({ ...prevState, userid: e.target.value }))} /><br />
                    <label >Password</label>
                    <input type='password' id='userpassword' className='form-control rounded-0' style={{ width: '75%' }} onChange={(e) => setLogin(prevState => { return { ...prevState, password: e.target.value } })} /><br />
                    <p><span style={{color:'red'}}>{login.error}</span></p><br/>
                    <Link to="/registration" className='float-start mt-2'>New User ?</Link>
                    <button className="btn btn-primary float-end" onClick={submitUserLogin}>Login</button>
                </div>
            </div>
            <div className="card mt-5 ms-5" style={{ width: '45vw' }}>
                <h5 className="card-header">Admin Login</h5>
                <div className="card-body">
                    <label >Email</label>
                    <input type='email' id='email' className='form-control rounded-0' style={{ width: '75%' }} /><br />
                    <label >Password</label>
                    <input type='password' id='adminpassword' className='form-control rounded-0' style={{ width: '75%' }} /><br />
                    <button className="btn btn-primary float-end">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
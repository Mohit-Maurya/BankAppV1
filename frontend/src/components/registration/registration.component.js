import React,{ useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Registration() {
    const [data,setData] = useState({name:'',pan:'',email:'',password:'',temporaryAddress:'',
                                aadhaarNumber:'',mobileNumber:'',permanentAddress:''})
    // const [msg,setMsg]=useState('')                            
    let navigate = useNavigate();

    const onSignUp = (event)=>{
        event.preventDefault();

        axios.post("http://localhost:8080/users",data)
                    .then((res)=>{
                        if(res.status===200)
                             navigate('/')   
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
    }

    return (
        <div className="card mx-auto mt-5" style={{ width: '50vw' }}>
            <h5 className="card-header">Registration</h5>
            <div className="card-body">
                <div className="col-6 form-group mb-3">
                    <label>Name </label>
                    <input type="text" className="form-control" id="name" onChange={(e) => setData((prevState) => ({ ...prevState, name: e.target.value }))}/>
                </div>
                <div className='row'>
                    <div className="col-6 form-group mb-3">
                        <label>PanCard Number </label>
                        <input type="text" className="form-control" id="pancard" onChange={(e) => setData((prevState) => ({ ...prevState, pan: e.target.value }))} />
                    </div>
                    <div className="col-6 form-group mb-3">
                        <label>Aadhaar Number</label>
                        <input type="text" className="form-control" id="aadhaar"  onChange={(e) => setData((prevState) => ({ ...prevState, aadhaarNumber: e.target.value }))}/>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-6 form-group mb-3">
                        <label>Mobile Number </label>
                        <input type="text" className="form-control" id="mobile"  onChange={(e) => setData((prevState) => ({ ...prevState, mobileNumber: e.target.value }))}/>
                    </div>
                    <div className="col-6 form-group mb-3">
                        <label>Email</label>
                        <input type="text" className="form-control" id="email" onChange={(e) => setData((prevState) => ({ ...prevState, email: e.target.value }))} />
                    </div>
                </div>
                <div className="col-11 form-group mb-3">
                    <label>Permanent Address </label>
                    <input type="text" className="form-control" id="permanentAddress"  onChange={(e) => setData((prevState) => ({ ...prevState, permanentAddress: e.target.value }))}/>
                </div>
                <div className="col-11 form-group mb-3">
                    <label>Temporary Address </label>
                    <input type="text" className="form-control" id="temporaryAddress" onChange={(e) => setData((prevState) => ({ ...prevState, temporaryAddress: e.target.value }))} />
                </div>
                <div className="col-6 form-group mb-3">
                    <label>Password </label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setData((prevState) => ({ ...prevState, password: e.target.value }))} />
                </div><br />
                {/* <p><span style={{ color: 'red' }}>{login.error}</span></p> */}
                <button className="btn btn-primary float-end" onClick={onSignUp}>Sign Up</button>
            </div>
        </div>
    )
}

export default Registration;
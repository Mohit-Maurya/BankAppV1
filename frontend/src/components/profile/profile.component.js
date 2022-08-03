import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';

function Profile() {

    const [data, setData] = useState({
        name: '', pan: '', email: '', temporaryAddress: '', aadhaarNumber: '',
        mobileNumber: '', permanentAddress: ''
    })

    const [update, setUpdate] = useState(false)

    const getUser = async () => {
        await axios.get("http://localhost:8080/user/" + (1122).toString())
            .then((res) => {
                console.log(res)
                setData({
                    name: res.data.name, pan: res.data.pan, email: res.data.email,
                    temporaryAddress: res.data.temporaryAddress, aadhaarNumber: res.data.aadhaarNumber,
                    mobileNumber: res.data.mobileNumber, permanentAddress: res.data.permanentAddress
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateProfile = (event)=>{
        event.preventDefault();
        console.log(data)
    }

    const cancelUpdate = async (event)=>{ 
        if (window.confirm("Changes will not be saved") === true) {
            window.location.reload(false); 
          } 
        event.preventDefault();
    }
   
    
    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className="card mx-auto mt-5" style={{ width: '50vw' }}>
            <div className="card-header">
                <h5 className="float-start">Profile</h5>
               {update? <button onClick={cancelUpdate} className='float-end' style={{borderColor:'transparent',backgroundColor:'transparent'}}>
                                    <IoCloseCircleOutline size='2rem' color='red'/></button> :
                        <button className='btn btn-primary float-end' onClick={() => {setUpdate(true);console.log(data)}}>Update</button>
                }
            </div>
            <div className="card-body">
                <div className="col-6 form-group mb-3">
                    <label>Name </label>
                    <input type="text" className="form-control" id="name" defaultValue={data.name} onChange={(e) => setData((prevState) => ({ ...prevState, name: e.target.value }))} disabled={!update} />
                </div>
                <div className='row'>
                    <div className="col-6 form-group mb-3">
                        <label>PanCard Number </label>
                        <input type="text" className="form-control" id="pancard" defaultValue={data.pan} onChange={(e) => setData((prevState) => ({ ...prevState, pan: e.target.value }))} disabled={!update} />
                    </div>
                    <div className="col-6 form-group mb-3">
                        <label>Aadhaar Number</label>
                        <input type="text" className="form-control" id="aadhaar" defaultValue={data.aadhaarNumber} onChange={(e) => setData((prevState) => ({ ...prevState, aadhaarNumber: e.target.value }))} disabled={!update} />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-6 form-group mb-3">
                        <label>Mobile Number </label>
                        <input type="text" className="form-control" id="mobile" defaultValue={data.mobileNumber} onChange={(e) => setData((prevState) => ({ ...prevState, mobileNumber: e.target.value }))} disabled={!update} />
                    </div>
                    <div className="col-6 form-group mb-3">
                        <label>Email</label>
                        <input type="text" className="form-control" id="email" defaultValue={data.email} onChange={(e) => setData((prevState) => ({ ...prevState, email: e.target.value }))} disabled={!update} />
                    </div>
                </div>
                <div className="col-11 form-group mb-3">
                    <label>Permanent Address </label>
                    <input type="text" className="form-control" id="permanentAddress" defaultValue={data.permanentAddress} onChange={(e) => setData((prevState) => ({ ...prevState, permanentAddress: e.target.value }))} disabled={!update} />
                </div>
                <div className="col-11 form-group mb-3">
                    <label>Temporary Address </label>
                    <input type="text" className="form-control" id="temporaryAddress" defaultValue={data.temporaryAddress} onChange={(e) => setData((prevState) => ({ ...prevState, temporaryAddress: e.target.value }))} disabled={!update} />
                </div>
                <br />
                {/* <p><span style={{ color: 'red' }}>{login.error}</span></p> */}
                {update && <button className="btn btn-primary float-end" onClick={updateProfile} >Save</button>}
            </div>
        </div>

    )
}

export default Profile;
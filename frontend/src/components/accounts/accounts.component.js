import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import "./accounts.component.css"
import axios from "axios";

function Accounts() {

    const navigate = useNavigate()
    const { state } = useLocation()
    const { userid } = state
    const [accounts, setAccounts] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [branches, setBranches] = useState([])
    const [branchNames, setBranchNames] = useState([])
    const [selectedBranch, setSelectedBranch] = useState({
        state: '',
        city: '',
        branchName: '',
        ifsc:''
    })
    const [selectedAccountType, setSelectedAccounttype] = useState('')
    const accountTypes = ["Savings", "Salary", "Fixed Deposit"]

    let statelist = states.map((state,i) => <option id={state}>{state}</option>)
    let citieslist = cities.map((city,i) => <option id={city}>{city}</option>)
    let branchNameslist = branchNames.map((branch,i) => <option id={branch.branchName} value={i}>{branch.branchName}</option>)
    let accountTypesList = accountTypes.map((type) => <option id={type}>{type}</option>)
    let accountsList = accounts.map((a,i) => {
        return (
            <div className="card card-account m-3"  key={i} onClick={()=>{ navigate('/accounts/account',{state:{accountNumber:a.accountNumber}}) }}>
                <div className="card-body"  key={i}>
                    <div className="row"> 
                        <div className="col-7">
                            <h5>{a.accountNumber}</h5>
                            <p><b>Balance </b>  {a.balance}</p>
                        </div>
                        <div className="col-3">
                            <p> {a.branch.branchName}</p><br/> 
                            <p>   {a.branch.state} {a.branch.city}</p> 
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    useEffect(() => {
        axios.get(`http://localhost:8080/accounts/${userid}`)
            .then((res) => {
                setAccounts(res.data)
            })
            .catch((err) => console.log(err))

    }, [])

    const onClickCreateAccount = async (event) => {
        event.preventDefault();
        await axios.get("http://localhost:8080/bank-branch/locations")
            .then((res) => {
                setBranches(res.data)
                setStates([...new Set(res.data.map((d) => (d.state)))])
                console.log(res)
            })
            .catch((err) =>
                console.log(err)
            )
    }

    const stateSelected = async (event) => {
        setSelectedBranch({ state: event.target.value, city: '', branchName: '' })
        let citiesOfState = []
        branches.forEach((b)=>{
            if (b.state === event.target.value)
                citiesOfState.push(b.city)
        })
        setCities([...new Set(citiesOfState)])
    }

    const citySelected = async (event) => {
        setSelectedBranch((prevState) => ({ ...prevState, city: event.target.value, branchName: '',ifsc:'' }))
        let branchesOfCity=[]
        branches.forEach((b)=>{
            if (b.state === selectedBranch.state && b.city === event.target.value)
                branchesOfCity.push({branchName:b.branchName,ifsc:b.ifsc})
        })
        setBranchNames([...new Set(branchesOfCity)])
    }

    const branchNameSelected = async (event) =>{
         setSelectedBranch((prevState)=>({...prevState,branchName:branchNames[event.target.value].branchName,ifsc:branchNames[event.target.value].ifsc}))
    }

    const onClose = async (event) =>{
        event.preventDefault();
        setStates([])
        setCities([])
        setBranchNames([])
        setSelectedAccounttype('')
        setSelectedBranch({state:'',city:'', branchName: '',ifsc:''})
    }

    const onSubmitDetails = async(event) =>{
        event.preventDefault();
        axios.post("http://localhost:8080/accounts",{branch:{...selectedBranch},userId:userid,accountType:selectedAccountType,balance:0})
                            .then((res)=>{                                                               
                                    axios.get(`http://localhost:8080/accounts/${userid}`)
                                    .then((res) => {
                                        setAccounts(res.data)
                                        console.log(res.data)
                                        setStates([])
                                        setCities([])
                                        setBranchNames([])
                                        setSelectedAccounttype('')
                                        setSelectedBranch({state:'',city:'', branchName: '',ifsc:''})
                                    })
                                    .catch((err) => console.log(err))
                            })
                            .catch((err)=> console.log(err))
    
    }

    return (
        <div className="p-5">
            <div className="mx-auto mb-5" style={{ width: '75vw' }}>
                Accounts
                <button type="button" onClick={onClickCreateAccount} className="btn btn-primary float-end p-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create new Account
                </button>
                {accountsList}
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Account</h5>
                            <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col">
                                <div className="row">
                                    <div className="col-6 form-group mb-3 ms-auto">
                                        <label> Select State </label><br />
                                        <select id="state" onChange={stateSelected}>
                                            <option id={0} value="">-- Select --</option>
                                            {statelist}
                                        </select>
                                    </div>
                                    <div className="col-6 form-group mb-3 ms-auto">
                                        <label>Select City </label><br />
                                        <select id="city" onChange={citySelected}>
                                            <option id={0} value="">-- Select --</option>
                                            {citieslist}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 form-group mb-3 ms-auto">
                                        <label >Select Branch </label><br />
                                        <select id="branchName" onChange={branchNameSelected}>
                                        <option id={0} value="">-- Select --</option>
                                            {branchNameslist}
                                        </select>
                                    </div>
                                    <div className="col-6 form-group mb-3 ms-auto">
                                        <label >Account Type</label><br />
                                        <select id="accountType" onChange={(e) => setSelectedAccounttype(e.target.value)}>
                                            <option id={0} value="">-- Select --</option> 
                                            {accountTypesList}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}   data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onSubmitDetails} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Accounts;
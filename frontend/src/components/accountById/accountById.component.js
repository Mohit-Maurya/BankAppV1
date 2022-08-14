import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountById() {
    const { state } = useLocation()
    const { accountNumber,userid } = state
    let navigate = useNavigate();

    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [show, setShow] = useState(false)
    const [sentErr,setSentErr] = useState({account:"",amount:"",samount:''})
    const [account, setAccount] = useState({ accountNumber: '', balance: '', accountType: '' })
    const [branch, setBranch] = useState({ branchName: '', city: '', state: '', ifsc: '' })
    const [sentAcc, setSentAcc] = useState()
    const [transaction, setTransaction] = useState({ action: '', depositSource: '', toAccountNo: '', fromAccountNo: '', amount: '', balance: '' })
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/account/" + accountNumber)
            .then((res) => {
                setAccount({
                    accountNumber: res.data.accountNumber,
                    balance: res.data.balance, accountType: res.data.accountType
                })
                setBranch({
                    branchName: res.data.branch.branchName, city: res.data.branch.city, ifsc: res.data.branch.ifsc,
                    state: res.data.branch.state
                })
                setTransactions(res.data.transactions)
                console.log(res)
            })
            .catch((err) => console.log(err))
    }, [account.balance])

    const onChangeDepoAmount = async (e) => {
        if(e.target.value <=0 )
            setSentErr((prevState)=>({...prevState,amount:"Amount is a required field and must be a positive number"}))
        else{
            setSentErr((prevState)=>({...prevState,amount:""}))
            setTransaction({ action: 'Deposit', depositSource: 'Paytm', toAccountNo: '', fromAccountNo: '', amount: parseFloat(e.target.value), balance: account.balance + parseFloat(e.target.value) })
        }    
    }

    const onChangeSendAmount = async (e) => {
        if(e.target.value <=0 )
            setSentErr((prevState)=>({...prevState,samount:"Amount must be a positive number"}))
        else if(e.target.value > account.balance)
            setSentErr((prevState)=>({...prevState,samount:"Amount must be less than balance"}))
        else    
        {
            setSentErr((prevState)=>({...prevState,samount:""}))
            setTransaction({ action: 'sent', depositSource: '', toAccountNo: sentAcc, fromAccountNo: '', amount: parseFloat(e.target.value), balance: account.balance - parseFloat(e.target.value) })
        }
    }

    const onChangeAccountNumber = async (e) => {
        console.log(e,sentAcc)
        if(sentAcc === accountNumber)
            setSentErr((prevState)=>({...prevState,account:"Cannot transfer to the same account"}))
        else if(!sentAcc)
            setSentErr((prevState)=>({...prevState,account:"Account number is a required field"}))
        else{
                axios.get("http://localhost:8080/account/" + sentAcc)
                .then((res) => {  
                    // console.log("inside verify account axios",res)
                    if(res.data === "Invalid account number")
                    setSentErr((prevState)=>({...prevState,account:"Invalid account number"}))
                    else{
                        setSentAcc(e.target.value)
                        setSentErr((prevState)=>({...prevState,account:""}))
                    }  
                })
                .catch((err)=>console.log(err))         
        }

    }

    const sendAmount = async (event) => {
        event.preventDefault()
        console.log(transactions)
        axios.put("http://localhost:8080/accounts/transactions", { accountNumber: account.accountNumber, transactions: [...transactions], newTransaction: transaction })
            .then((res) => {
                console.log(res)
                setMsg(res.data)
                setAccount((prevState)=>({...prevState,balance:transaction.balance}))
                setShow(true)
                setTimeout(() => { setShow(false);setMsg("");}, 1500)
            })
            .catch((err) => {
                console.log(err)
                setErr(err)
                setShow(true)
                setTimeout(() => { setShow(false);setErr("") }, 1500)
            })
    }


    const deleteAccount = async(event) =>{

        if (window.confirm("Are your sure you want to close the account?") === true) 
        {
            axios.delete("http://localhost:8080/account/" + accountNumber)
            .then((res)=>{
                setMsg(accountNumber+" deleted successfully")
                setShow(true)
                setTimeout(() => { setShow(false);setMsg(""); navigate('/accounts',{state:{userid:userid}})}, 1500)
            })
        }
    }

    return (
        <div>
            {show &&
                (
                    msg !=="" ?
                     <div className="toast-body" style={{ backgroundColor: 'green' }}>
                        <h5 style={{ color: 'white' }}>{msg} successfully ....</h5>
                     </div> :
                     <div className="toast-body" style={{ backgroundColor: 'red' }}>
                      <h5 style={{ color: 'white' }}>{err}</h5>
                     </div>

                )
               
            }
            <div className="card mx-auto mt-5" style={{ width: '90vw' }} >
                <div className="card-body">
                    <div className='col'>
                        <div className='row mb-5'>
                            <h4>Account Number : {account.accountNumber}</h4>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-6'>
                                <b>Branch Name : </b> {branch.branchName}
                            </div>
                            <div className='col-6'>
                                <b>Balance :</b> {account.balance}
                            </div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <b>IFSC : </b>{branch.ifsc}
                            </div>
                            <div className='col-6'>
                                <b>Account Type : </b> {account.accountType}
                            </div>
                        </div>
                        <div className='row mt-5 mb-5'>
                            <div className='col-6'>
                                <div className="card">
                                    <div className="card-body mb-3">
                                        <div className="col-9 mb-3">
                                            <label className="form-label"><b>Deposit Amount</b></label>
                                            <input type="text" className="form-control" id="depositAmount" onChange={onChangeDepoAmount} />
                                            <p><span style={{ color: 'red' }}>{sentErr.amount}</span></p>
                                        </div>
                                        <div className="col-12" >
                                            <button className='btn btn-primary float-end' type='submit' onClick={sendAmount}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="card">
                                    <div className="card-body mb-3">
                                        <div className='row mb-3'>
                                            <div className="col-6">
                                                <label className="form-label"><b>To</b></label>
                                                <input type="text" className="form-control" id="toAccountNumber" placeholder='Account number' onBlur={onChangeAccountNumber} onChange={(e)=>setSentAcc(e.target.value)} />
                                                <p><span style={{ color: 'red' }}>{sentErr.account}</span></p>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label"><b>Amount</b></label>
                                                <input type="text" className="form-control" id="sendAmount" onChange={onChangeSendAmount} />
                                                <p><span style={{ color: 'red' }}>{sentErr.samount}</span></p>
                                            </div>
                                        </div>
                                        <div className="col-12" >
                                            <button className='btn btn-primary float-end' type='submit' onClick={sendAmount}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mb-3'>
                            <button type='submit' className='btn btn-danger float-end' onClick={deleteAccount}>Close Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountById;
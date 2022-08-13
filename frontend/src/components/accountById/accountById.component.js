import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function AccountById() {
    const { state } = useLocation()
    const { accountNumber } = state
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [show, setShow] = useState(false)
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
    }, [])

    const onChangeDepoAmount = async (e) => {
        setTransaction({ action: 'Deposit', depositSource: 'Paytm', toAccountNo: '', fromAccountNo: '', amount: parseFloat(e.target.value), balance: account.balance + parseFloat(e.target.value) })
    }

    const onChangeSendAmount = async (e) => {
        setTransaction({ action: 'sent', depositSource: '', toAccountNo: sentAcc, fromAccountNo: '', amount: parseFloat(e.target.value), balance: account.balance - parseFloat(e.target.value) })
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
                setTimeout(() => { setShow(false) }, 1500)
            })
            .catch((err) => {
                console.log(err)
                setErr(err)
                setShow(true)
                setTimeout(() => { setShow(false) }, 1500)
            })
    }

    return (
        <div>
            {show &&

                <div className="toast-body" style={{ backgroundColor: 'green' }}>
                    <h5 style={{ color: 'white' }}>{msg} completed successfully ....</h5>
                </div>
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
                                                <input type="text" className="form-control" id="toAccountNumber" placeholder='Account number' onChange={(e) => setSentAcc(e.target.value)} />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label"><b>Amount</b></label>
                                                <input type="text" className="form-control" id="sendAmount" onChange={onChangeSendAmount} />
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
                            <button type='submit' className='btn btn-danger float-end'>Close Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountById;
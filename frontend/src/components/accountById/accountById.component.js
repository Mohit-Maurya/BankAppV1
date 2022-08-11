import React from 'react';
import {useLocation} from 'react-router-dom';

function AccountById() {
    const { state } = useLocation()
    const { account } = state

    return (
        <div>
            <div className="card mx-auto mt-5" style={{ width: '90vw' }}>
                <div className="card-body">
                    <div className='col'>
                        <div className='row mb-5'>
                            <h4>Account Number : {account.accountNumber}</h4>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-6'>
                                <b>Branch Name : </b> {account.branch.branchName}
                            </div>
                            <div className='col-6'>
                                <b>Balance :</b> {account.balance}
                            </div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <b>IFSC : </b>{account.branch.ifsc} 
                            </div>
                            <div className='col-6'>
                                <b>Account Type : </b> {account.accountType}
                            </div>
                        </div>
                        <div className='row mt-5 mb-5'>
                            <div className='col-6'>
                                <div className="card">
                                    <div class="card-body mb-3">
                                        <div className="col-9 mb-3">
                                            <label className="form-label">Deposit Amount</label>
                                            <input type="text" className="form-control" id="depositAmount" />
                                        </div>
                                        <div className="col-12" >
                                            <button className='btn btn-primary float-end' type='submit'>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="card">
                                    <div className="card-body mb-3">
                                        <div className='row mb-3'>
                                            <div className="col-6">
                                                <label className="form-label">To</label>
                                                <input type="text" className="form-control" id="toAccountNumber" placeholder='Account number' />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label">Amount</label>
                                                <input type="text" className="form-control" id="sendAmount" />
                                            </div>
                                        </div>
                                        <div className="col-12" >
                                            <button className='btn btn-primary float-end' type='submit'>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mb-3'>
                            <button type='submit' className='btn btn-danger float-end'>Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountById;
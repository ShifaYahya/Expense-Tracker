import React, { useState } from 'react';
import { useAddTransaction } from '../../../hooks/useAddTransaction';
import useGetTransactions from '../../../hooks/useGetTransactions'
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import profile from '../../../assets/images/profile.png'
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase-config';
import { useNavigate } from 'react-router-dom';


const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense")
  const {transactions, transactionTotal} = useGetTransactions() //destructuring what you need from the hooks
  const {name, profilePhoto} = useGetUserInfo()//destrucuring what we need from the hook
  const navigate = useNavigate()


  const {balance, income, expenses} = transactionTotal; //further desructuring
   const signUserOut = async()=>{
    try {
      await signOut(auth)
      localStorage.clear();
      navigate("/") //clear localstorage after sign out

    } catch (error) {
      console.log(error)
    }
    
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({
        description,
        transactionAmount,     // if same name
        transactionType,  
      });
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
    setDescription("")
    setTransactionAmount(0) //clearing out the inputs after submit
  };

  return (
    <>
   
    <div className='flex justify-center m-7 padding-3 text-[rgb(0,0,0)] flex-col '>
      <div className='mx-auto '>
        <div className="">
        {profilePhoto ? <div className='float-up float-right flex flex-col items-center'>< img alt="profile image" className="rounded-full mb-3" src={profilePhoto}></img> <button className='text-white bg-[rgba(171,0,0,0.86)] rounded-md w-[80px] hover:opacity-80 text-center' onClick = {signUserOut}>Sign Out</button></div> : <div className=" flex flex-col items-center float-right"> <img className=" w-[210px] h-[170px]" src={profile} ></img> <button className='text-white bg-[rgba(185,56,36,0.86)] rounded-md w-[80px] hover:opacity-80 transition-all ease-in-out duration-300 text-center' onClick = {signUserOut}>Sign Out</button></div>
        
         }
          <h1 className='text-[30px] font-bold font-sans text-[rgb(0,0,0)] mb-9'> {name}'s Expense Tracker</h1>
         
          <div>
            <h3 className='text-[20px] text-[rgb(0,0,0)] font-bold'>Your Balance:</h3>
            {balance >=0 ? <h2 className=''>${balance}</h2>: <h2>-${balance*-1}</h2> }
           
            
          </div>

          <div>
            <div>
              <h4 className='text-[20px] text-[rgb(0,0,0)] font-bold'>Income:</h4>
              <p>${income}</p>
            </div>
            <div>
              <h4 className='text-[20px] text-[rgb(0,0,0)] font-bold'>Expenses:</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <input className='border-[rgba(255,255,255,.2)] focus:outline-none h-8 rounded-sm bg-[rgba(255,255,255,.5)]  mt-5 p-3 mr-5' type='text' placeholder='Description' required onChange={(e)=> setDescription(e.target.value) } value={description}></input>
            <input className='border-[rgba(255,255,255,.2)] focus:outline-none h-8 rounded-sm bg-[rgba(255,255,255,.5)]  mt-5 p-3 mr-5' value={transactionAmount}type='number' placeholder='Amount' required onChange={(e)=> setTransactionAmount(e.target.value)}></input>
            <input  type='radio' id="expense" value="expense" checked={transactionType==="expense"} onChange={(e)=> setTransactionType(e.target.value)}/>
            
            <label className="text-[16px] mr-3 font-bold" htmlFor='expense'>Expense</label>
            <input type='radio' id="income" value="income" checked={transactionType==="income"} onChange={(e)=> setTransactionType(e.target.value)}/>
            <label className="text-[16px] mr-3 font-bold" htmlFor='income'>Income</label>

            <button className="text-white bg-[rgba(0,79,164,0.86)] rounded-md px-2 py-1 hover:opacity-80 transition-all duration-300 ease-in-out"type='submit'>Add Transaction</button>
          </form>
        </div>
        
      </div>

      <div>
      
      <div className='flex flex-col border p-8 max-w-4xl justify-start mx-auto items-center overflow-y-auto max-h-[250px] my-5 bg-[rgba(255,255,255,.2)]'>
      <h3 className='font-bold text-center m-4 text-[20px] '>Transactions</h3>
        <ul >
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } = transaction;
            return (
              <li className="flex flex-col justify-start" key={transaction.id}>
                <h4 className='font-bold m-4'><span className='text-[15px] m-1'>•</span>{description}</h4>
                
                <p>${transactionAmount} • <label style={{color: transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></p>
              </li>
            );
          })}
        </ul>
        </div>
      </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
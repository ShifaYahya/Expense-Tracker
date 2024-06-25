import {addDoc, serverTimestamp, collection} from 'firebase/firestore'
import {db} from "../config/firebase-config"
import { useGetUserInfo } from './useGetUserInfo'
export const useAddTransaction = ()=>{
  const transactionCollectionRef = collection(db, "transactions") //collection name as second parameter after db
  const {userId} = useGetUserInfo();
    const addTransaction = async({
        description,
        transactionAmount,
        transactionType,
    })=>{
     await addDoc(transactionCollectionRef, {
        userId,
        description,
        transactionAmount,
        transactionType,
        createdAt: serverTimestamp(),
     })
       //ref to the collection as first parameter then second parameter what you want to add like object etc
    }
    return {addTransaction}
}
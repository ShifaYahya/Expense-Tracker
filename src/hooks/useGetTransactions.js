
import { useState, useEffect } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState(
    {balance: 0.0, income:0.0, expenses:0.0}
  )
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses =0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });

           if(data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
           } else {
            totalIncome += Number(data.transactionAmount);
           }
        });
        setTransactions(docs);

        let balance  = totalIncome - totalExpenses;
        setTransactionTotal({
          balance, expenses:totalExpenses, income:totalIncome,
        })
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactions();
    // Cleanup the subscription when the component unmounts
    
  }, []); // Add userId to the dependency array to re-run the effect when userId changes

  return { transactions, transactionTotal }; //returning the states
};

export default useGetTransactions;
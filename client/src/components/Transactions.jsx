import React, {useContext} from "react";
import {TransactionContext} from '../context/TransactionContext';
import dummyData from "../utils/dummyData";
import {shortAddress} from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-2 flex flex-4
      2xl:min-w-[300px]
      2xl:max-w-[350px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://mumbai.polygonscan.com/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortAddress(addressFrom)}</p>
          </a>
          <a href={`https://mumbai.polygonscan.com/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} MATIC</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};


const Transactions = () => {
  const {currentAccount} = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
  
        <div className="flex flex-wrap justify-center items-center mt-5">
          {dummyData.reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions
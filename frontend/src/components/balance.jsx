import { useState } from "react";
import axios from "axios";

export const Balance = ({token}) => {
    const [balance,setBalance]= useState(null)
    return (
        <div className="px-8 py-4 text-lg font-bold flex gap-4 text-slate-900 flex justify-between">
            <div className="flex gap-5">
                <div>
                Balance
                </div>
                <div className="w-20">
                <button className="w-full bg-slate-500 hover:bg-slate-400 rounded text-white text-sm font-semibold h-8" onClick={async () => {
                    const response = await axios.get("https://payments-master-1.onrender.com/api/v1/account/balance", {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("clicked")
                    setBalance(response.data.balance);
                }}>Show</button>
                </div>
            </div>
            <div>
                {balance !== null && <p>Your balance is: Rs {balance.toFixed(2)}</p>}
            </div>
        </div>
    )
}
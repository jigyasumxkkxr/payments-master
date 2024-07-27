import { Heading } from "./heading"
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const capitalizedName = name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();
    const [amount, setAmount] = useState(0);
    const navigate=useNavigate()
    const [error, setError] = useState(null);


    return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="h-fit w-1/4 bg-white rounded-lg shadow-lg shadow-gray-300 flex flex-col gap-20 pb-10">
                <div>
                    <Heading label={"Send Money"} />
                </div>
                <div className="flex flex-col gap-2 mx-9">
                    <div className="flex gap-2 items-center">
                        <div className="bg-green-500 text-white h-10 w-10 rounded-full flex justify-center items-center font-normal">
                            {name[0].toUpperCase()}
                        </div>
                        <div className="text-xl font-bold">
                            {capitalizedName}
                        </div>
                    </div>
                    <div className="text-md font-semibold">
                        Amount (in Rs)
                    </div>
                    <div>
                        <input onChange={(e) => {
                            setAmount(e.target.value);
                        }} type="text" placeholder="Enter Amount" id="amount" className="w-full h-8 border border-slate-300 rounded px-2 text-slate-300   focus:border-green-400 focus:outline-none dark:text-green-400" />
                    </div>
                    <div className="flex justify-center items-center ">
                        <button onClick={async () => {
                        try {
                            const response = await axios.post("https://payments-master-1.onrender.com/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            navigate("/dashboard")
                        }catch(error){
                            if (error.response.status === 400) {
                                setError(error.response.data.message)
                            }
                    }}} className="w-full bg-green-500 hover:bg-green-400 rounded text-white text-sm font-semibold h-8">Invite Transfer</button>
                    </div>
                    {error && (
                        <div className="text-red-500 flex justify-center items-center mb-12 pt-1">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
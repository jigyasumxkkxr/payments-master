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
    const [loading,setLoading] = useState(false)


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
                        <button disabled={loading} onClick={async () => {
                            setLoading(true)
                        try {
                            const response = await axios.post("https://payments-master-1.onrender.com/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            navigate("/review?name=" + name + "&id=" + id)
                        }catch(error){
                            if (error.response.status === 400) {
                                setError(error.response.data.message)
                            }
                    }finally {
                        setLoading(false)
                    }}} className="w-full bg-green-500 hover:bg-green-400 rounded text-white text-sm font-semibold h-8">{loading ? <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>  : "Invite Transfer"}</button>
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
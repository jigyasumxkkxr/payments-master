import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = ({placeholder}) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setCurrentUserId(storedUserId);
        axios.get("https://payments-master-1.onrender.com/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                const filteredUsers = response.data.user.filter(user => user._id !== storedUserId);
                setUsers(filteredUsers);
            })
    }, [filter])


    return (
        <div className="px-8 py-4 flex flex-col gap-4">
            <div className="text-md font-bold ">
                Users
            </div>
            <div className="px-2">
                <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder={placeholder} className="w-full h-8 border border-slate-300 rounded px-2 text-slate-300   focus:border-slate-600 focus:outline-none dark:text-slate-700" />
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </div>
    )
}

function User ({user}) {
    const navigate=useNavigate()
    const firstName = user.firstName
    const capitalizedFirstName = firstName?.charAt(0).toUpperCase() + firstName?.slice(1).toLowerCase()
    const lastName = user.lastName
    const capitalizedLastName = lastName?.charAt(0).toUpperCase() + lastName?.slice(1).toLowerCase()
    return (
        <div className="flex justify-between items-center px-2 py-2">
            <div className="flex gap-6 text-slate-800 items-center font-semibold">
                <div className="bg-slate-300 h-10 w-10 rounded-full flex justify-center items-center font-bold">
                    {capitalizedFirstName[0]}
                </div>
                <div>
                    {capitalizedFirstName} {capitalizedLastName}
                </div>
            </div>
            <div >
                <button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} className="bg-slate-900 hover:bg-slate-800 text-slate-100 w-full h-10 rounded-lg text-md font-semibold px-3">Send Money</button>
            </div>
        </div>
    )
}
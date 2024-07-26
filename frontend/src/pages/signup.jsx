import { useState } from "react"
import { Button } from "../components/button"
import { ButtonWarning } from "../components/button-warning"
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { InputBoxPassword } from "../components/inputboxpassword"
import { Subheading } from "../components/subheading"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup = () => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const navigate=useNavigate()
    const [error, setError] = useState(null);

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-slate-300">
            <div className="h-fit w-1/4  bg-gray-100 rounded-2xl shadow-lg shadow-slate-500 flex-col items-center justify-center">
                <Heading label={"Sign up"} />
                <Subheading label={"Enter your information to create an account"} />
                <InputBox onChange={ e => {
                    setFirstName(e.target.value)
                }} placeholder={"John"} label={"First Name"} />
                <InputBox onChange={ e => {
                    setLastName(e.target.value)
                }} placeholder={"Doe"} label={"Last Name"} />
                <InputBox onChange={ e => {
                    setUserName(e.target.value)
                }} placeholder={"john.doe@gmail.com"} label={"Eamil"} />
                <InputBoxPassword onChange={ e => {
                    setPassword(e.target.value)
                }} placeholder={""} label={"Password"} />
                <Button onClick={async () => {
                    try{
                        const response = await axios.post("https://payments-master-1.onrender.com/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("name",firstName)
                        localStorage.setItem("userId",response.data.userID)
                        navigate("/dashboard")
                    }catch(error) {
                        if (error.response) {
                            setError(error.response.data.message)
                        }
                    }
                }} label={"Sign up"} />
                <ButtonWarning label={"Already have an account?"} linkLabel={"Sign In"} to={"/signin"} />
                {error && (
                        <div className="text-red-500 flex justify-center items-center mb-12 pt-1">
                        {error}
                        </div>
                    )}
            </div>
        </div>
    )
}
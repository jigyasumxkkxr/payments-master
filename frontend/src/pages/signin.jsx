import { useState } from "react"
import { Button } from "../components/button"
import { ButtonWarning } from "../components/button-warning"
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { InputBoxPassword } from "../components/inputboxpassword"
import { Subheading } from "../components/subheading"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Signin = () => {
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const navigate=useNavigate()
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(false)

    async function handleClick () {
        setLoading(true)
            try {
                const response = await axios.post("https://payments-master-1.onrender.com/api/v1/user/signin",{
                    username,
                    password
                })
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("name",response.data.name)
                localStorage.setItem("userId",response.data.userID)
                navigate("/dashboard")
            } catch(error){
                if (error.response) {
                    setError(error.response.data.message)
                }
            } finally {
                setLoading(false); // Set loading to false when API call finishes
              }
        }

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-slate-300">
            <div className="h-fit w-1/4 bg-gray-100 rounded-2xl shadow-lg shadow-slate-500 flex-col items-center justify-center">
                <Heading label={"Sign in"} />
                <Subheading label={"Enter your credentials to access your account"} />
                <InputBox onChange={ e => {
                    setUserName(e.target.value)
                }} placeholder={"john.doe@gmail.com"} label={"Eamil"} />
                <InputBoxPassword onChange={ e => {
                    setPassword(e.target.value)
                }} placeholder={""} label={"Password"} />
                <Button onClick={handleClick} disabled={loading} label={loading ? "loading..." : "Signin"} />
                <ButtonWarning label={"Don't have an account?"} linkLabel={"Sign Up"} to={"/signup"} />
                {error && (
                        <div className="text-red-500 flex justify-center items-center mb-12 pt-1">
                        {error}
                        </div>
                    )}
            </div>
        </div>
    )
}
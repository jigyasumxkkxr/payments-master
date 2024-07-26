import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Dashboard } from "./pages/dashboard"
import { Send } from "./pages/send"
import { Landing } from "./pages/landing"

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

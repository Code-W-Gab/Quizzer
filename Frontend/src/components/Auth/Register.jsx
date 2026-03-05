import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { register } from "../../services/userService"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Credentials cannot be empty!")
      return
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address!")
      return
    }

    register(name, email, password)
      .then(res => {
        toast.success("User created successfully!")
        setName("")
        setEmail("")
        setPassword("")
        navigate("/")
        console.log(res)
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message || "User already exists")
        }
      })
  }
  return(
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 w-90 rounded-md">
        <h1 className="text-center text-xl font-bold mb-4">Register</h1>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                    focus:border-green-600"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            type="text"
            placeholder="Full Name"
            id="fullname"
          />
          <label 
            htmlFor="fullname"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600  transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Name
          </label>
        </div>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                    focus:border-green-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            type="text"
            placeholder="Email"
            id="email"
          />
          <label 
            htmlFor="email"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600  transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Email
          </label>
        </div>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                    focus:border-green-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
            type="text"
            placeholder="Password"
            id="pass"
          />
          <label 
            htmlFor="pass"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600  transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Password
          </label>
        </div>
        <div>
          <button className="bg-amber-300 w-full rounded-md py-1.5 mb-2" onClick={handleRegister}>Create</button>
          <p className="text-center">Already have an account? <Link to={"/Auth/Login"} className="underline">Login</Link></p>
        </div>
      </div>
    </main>
  )
}
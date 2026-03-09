import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { register } from "../../services/userService"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
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

    setLoading(true)  

    register(name, email, password)
      .then(res => {
        toast.success("User created successfully!")
        setName("")
        setEmail("")
        setPassword("")
        navigate("/")
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message || "User already exists")
        }
        setLoading(false) 
      })
      .finally(() => {
        // Optional: This runs after success or error
        setTimeout(() => setLoading(false), 500)
      })
  }
  return(
    <main 
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/bg-img.jpg)' }}
    > 
      {/* Desktop to table size login */}
      <div className="hidden md:flex rounded-tl-lg rounded-tb-lg bg-blue-500 h-100">
        <div className="p-6 text-center w-130 mt-20 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to ChesQuiz!</h1>
          <p className="text-lg">Create, share, and take quizzes anytime, anywhere.</p>
        </div>
        <div className="flex items-center justify-center w-100 bg-white rounded-br-lg rounded-tr-lg">
          <div className="p-6 w-90">
            <h1 className="text-center text-xl font-bold mb-4">Register</h1>
            <div className="relative mb-6">
              <input 
                className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                        focus:border-blue-600"
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
                          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Name
              </label>
            </div>
            <div className="relative mb-6">
              <input 
                className="cursor-pointer border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                        focus:border-blue-600 " 
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
                          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Email
              </label>
            </div>
            <div className="relative mb-6">
              <input 
                className="cursor-pointer border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                        focus:border-blue-600 " 
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
                          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Password
              </label>
            </div>
            <div>
              <button className="bg-blue-600 cursor-pointer text-white w-full rounded-md py-1.5 mb-2" onClick={handleRegister}>Create</button>
              <p className="text-center text-sm">Already have an account? <Link to={"/Auth/Login"} className="underline hover:text-blue-500">Login</Link></p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Login */}
      <div className="md:hidden">
        <div className="bg-white p-6 w-90 rounded-md">
          <h1 className="text-center text-xl font-bold mb-4 text-blue-500 ">Welcome to ChesQuiz</h1>
          <h1 className="text-center text-lg font-semibold mb-4">Register</h1>
          <div className="relative mb-6">
            <input 
              className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                      focus:border-blue-600"
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
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Name
            </label>
          </div>
          <div className="relative mb-6">
            <input 
              className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                      focus:border-blue-600 " 
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
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>
          <div className="relative mb-6">
            <input 
              className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                      focus:border-blue-600 " 
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
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Password
            </label>
          </div>
          <div>
            <button className="bg-blue-500 w-full rounded-md py-1.5 mb-2 text-white" onClick={handleRegister}>Create</button>
            <p className="text-center">Don't have an account? <Link to={"/Auth/Login"} className="underline hover:text-blue-500">Login</Link></p>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-gray-700 font-semibold">Logging in...</p>
          </div>
        </div>
      )}
    </main>
  )
}
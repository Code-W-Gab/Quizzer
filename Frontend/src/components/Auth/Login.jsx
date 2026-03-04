import { Link } from "react-router-dom";

export default function Login() {
  return(
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 w-90 rounded-md">
        <h1 className="text-center text-xl font-bold mb-4">Login</h1>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600  text-sm focus:outline-none peer placeholder-transparent
                    focus:border-green-600 " 
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
                    focus:border-green-600 " 
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
          <button className="bg-amber-300 w-full rounded-md py-1.5 mb-2">Login</button>
          <p className="text-center">Don't have an account? <Link to={"/Auth/Registration"} className="underline">Register</Link></p>
        </div>
      </div>
    </main>
  )
}
import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { IoEyeOutline,IoEyeOffOutline  } from "react-icons/io5";


const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [emailErr,setEmailErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');

    const [isHidden,setIsHidden] = useState(true);

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const data = await axios.post(`${baseUrl()}/userlogin`, { email,password });
            alert(data.data.mssg);
            navigate(data.data.redirect);
            localStorage.setItem('customer', `${data.data.customerDetails.firstName} ${data.data.customerDetails.lastName}`);
            localStorage.setItem('customerId', data.data.customerDetails._id);
            localStorage.setItem('token', data.data.token);
        } catch(err) {
            if(err.response.data.mssg.includes('password')) {
                setPasswordErr(err.response.data.mssg);
                setTimeout(() => {
                    setPasswordErr('')
                },2000)
            } else {
                setEmailErr(err.response.data.mssg);
                setTimeout(() => {
                    setEmailErr('')
                },2000)
            }
            
        }
    }

    return (
        <div className="relative h-screen flex items-center justify-center md:bg-green-50 overflow-hidden pb-36 md:pb-0">
            {/* <div className="top-0 fixed w-full flex justify-center bg-green-700 h-32 rounded-b-full">
                <img className="z-50 absolute mt-12 w-32" src="/images/WiseTruck_Logo.png" alt="WiseTruck Logo" />
            </div> */}

            <form className="w-full md:w-[40%] overflow-hidden py-0 md:py-5 md:border relative border-gray-900 md:rounded-md px-14 z-50 bg-white" onSubmit={handleLogin}>
                <h1 className="font-normal text-4xl text-green-700">Welcome!</h1>
                <p className="text-sm font-medium text-green-700">Clear the way! - make room for a greener tomorrow</p>
                <p className="text-sm">Sign in to your account</p>

                <div className="relative flex flex-col gap-2 mt-5">
                    <input className="w-full border-gray-300 border p-2 outline-none" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
                    <span className="text-red-500 text-xs">{emailErr}</span>
                    <div className="flex items-center border-gray-300 border p-2">
                        <input className="w-full h-full outline-none" type={isHidden ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
                        <p role="button" onClick={() => setIsHidden(!isHidden)}>{ !isHidden ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                    </div>
                    <span className="text-red-500 text-xs">{passwordErr}</span>
                    <Link className="text-sm text-right" to='/forgot/password'>Forgot Password?</Link>
                    <button className="bg-green-700 text-lg font-normal text-white border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Login</button>

                    <p className="text-center text-sm mt-6 z-50">Not on WiseTruck yet? <Link className="underline" to='/signup'>Signup</Link></p>
                </div>
            </form>

            <img className="absolute bottom-0 -right-12" src="/images/WiseTruck_Logo.png" alt="Logo" />

        </div>
        
    )
}
export default Login;
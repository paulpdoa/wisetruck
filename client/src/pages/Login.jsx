import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [emailErr,setEmailErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');

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
                },1000)
            } else {
                setEmailErr(err.response.data.mssg);
                setTimeout(() => {
                    setEmailErr('')
                },1000)
            }
            
        }
    }

    return (
        <div className="relative h-screen flex items-center justify-center">
            <div className="top-0 left-0 absolute w-full flex justify-center">
                <img className="w-full absolute" src="/images/Rectangle_2.png" alt="background" />
                <img className="z-50 absolute mt-20 w-24" src="/images/icon_person.png" alt="icon person" />
            </div>

            <form className="w-full px-14" onSubmit={handleLogin}>
                <h1 className="font-normal text-4xl">Welcome!</h1>
                <p className="text-sm font-medium">Clear the way! - make room for a greener tomorrow</p>
                <p className="text-sm">Sign in to your account</p>

                <div className="relative flex flex-col gap-2 mt-5">
                    <input className="w-full border-gray-300 border p-2 outline-none" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
                    <span className="text-red-500 text-xs">{emailErr}</span>
                    <input className="w-full border-gray-300 border p-2 outline-none" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
                    <span className="text-red-500 text-xs">{passwordErr}</span>
                    <Link className="text-sm text-right" to='/forgot/password'>Forgot Password?</Link>
                    <button className="bg-green-200 text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Login</button>

                    <p className="text-center text-sm mt-6">Not on WiseTruck yet? <Link className="underline" to='/signup'>Signup</Link></p>
                </div>
            </form>

        </div>
        
    )
}
export default Login;
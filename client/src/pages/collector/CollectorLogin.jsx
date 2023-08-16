import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';

const CollectorLogin = () => {

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const [userNameErr,setUserNameErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const data = await axios.post(`${baseUrl()}/collectorLogin`, { userName,password });
            alert(data.data.mssg);
            navigate(data.data.redirect);
            localStorage.setItem('collector', `${data.data.collectorDetails.userName}`);
            localStorage.setItem('collectorId', data.data.collectorDetails._id);
            localStorage.setItem('collectorToken', data.data.token);
        } catch(err) {
            if(err.response.data.mssg.includes('password')) {
                setPasswordErr(err.response.data.mssg);
                setTimeout(() => {
                    setPasswordErr('')
                },1000)
            } else {
                setUserNameErr(err.response.data.mssg);
                setTimeout(() => {
                    setUserNameErr('')
                },1000)
            }
            
        }
    }

    return (
        <div className="relative h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img className="w-1/2" src="/images/WiseTruck_Logo.png" alt="admin logo" />
            </div>

            <h1 className="mt-5 font-semibold text-4xl">WiseTruck</h1>

            <form className="w-full md:w-1/2 px-14 mt-10" onSubmit={handleLogin}>
                <h1 className="font-normal text-2xl">Welcome Collector!</h1>
                <p className="text-sm font-medium">Clear the way! - make room for a greener tomorrow</p>
                <p className="text-sm">Sign in to your account</p>

                <div className="relative flex flex-col gap-2 mt-5">
                    <input className="w-full border-gray-300 border p-2 outline-none" type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username:" />
                    <span className="text-red-500 text-xs">{userNameErr}</span>
                    <input className="w-full border-gray-300 border p-2 outline-none" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password:" />
                    <span className="text-red-500 text-xs">{passwordErr}</span>
                    {/* <Link className="text-sm text-right" to='/forgot/password'>Forgot Password?</Link> */}
                    <button className="bg-green-200 text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Login</button>

                    <p className="text-center text-sm mt-6">Don't have account yet? <Link className="underline" to='/collector/signup'>Register</Link></p>
                </div>
            </form>

        </div>
        
    )
}
export default CollectorLogin;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ForgotPassword = () => {

    const [email,setEmail] = useState('');
    const [emailErr,setEmailErr] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate();

    const searchEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await axios.post(`${baseUrl()}/user/forgot/password`,{ email });
            setIsLoading(false);
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            setIsLoading(false);
            setEmailErr(err.response.data.mssg);
            setTimeout(() => {
                setEmailErr('');
            },2000)
        }
    }

    return (
        <div className="h-screen relative flex items-center justify-center pb-36 overflow-hidden bg-green-50">
            <form className="w-full md:w-1/3 px-14 md:bg-white md:p-5 md:rounded-lg md:border md:border-gray-800 md:shadow-lg" onSubmit={searchEmail}>
                <h1 className="font-bold text-green-700 text-2xl md:mt-10">Recover your account</h1>

                <div className="relative flex flex-col gap-2 mt-5">
                    { isLoading && <p className="text-xs text-green-700 flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" /> Please wait, a message is being sent to your email.</p> }
                    <input className="w-full border-gray-300 border p-2 outline-none" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
                    { emailErr !== '' && <p className="text-xs text-red-500 flex items-center gap-2">{emailErr}</p> }
                    <button className="bg-green-700 text-white text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Send Code</button>
                </div>

                <div className="hidden md:flex justify-end">
                    <img className="w-1/2" src="/images/WiseTruck_Logo.png" alt="Logo" /> 
                </div>
            </form>
            <img className="w-1/2 block md:hidden absolute bottom-0 -right-10" src="/images/WiseTruck_Logo.png" alt="Logo" /> 
        </div>
    )
}

export default ForgotPassword;
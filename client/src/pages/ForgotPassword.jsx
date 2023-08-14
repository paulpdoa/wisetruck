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
        <div className="relative h-screen flex items-center justify-center">
            <div className="top-0 left-0 absolute w-full flex justify-center">
                <img className="w-full absolute" src="/images/Rectangle_2.png" alt="background" />
                <img className="z-50 absolute mt-14 w-44" src="/images/eye.png" alt="eye" />
            </div>

            <form className="w-full px-14" onSubmit={searchEmail}>
                <h1 className="font-normal text-2xl">Recover your account</h1>

                <div className="relative flex flex-col gap-2 mt-5">
                    
                    { isLoading && <p className="text-xs text-green-500 flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" /> Please wait, a message is being sent to your email.</p> }
                    <input className="w-full border-gray-300 border p-2 outline-none" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
                    { emailErr !== '' && <p className="text-xs text-red-500 flex items-center gap-2">{emailErr}</p> }
                    <button className="bg-green-200 text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Send Code</button>
                </div>
            </form>

        </div>
    )
}

export default ForgotPassword;
import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const Verification = () => {

    const { id } = useParams();
    const [code,setCode] = useState('');
    const [codeErr,setCodeErr] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // get code of user first
            const data = await axios.post(`${baseUrl()}/user/verify/code`,{ id,code });
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            setCodeErr(err.response.data.mssg);
            setTimeout(() => {
                setCodeErr('');
            },1000)
        }
    } 

    return (
        <div className="relative h-screen flex items-center bg-green-50 justify-center overflow-hidden pb-36">
            <form className="w-full md:relative md:w-1/2 md:bg-white p-14 md:rounded-lg md:border md:overflow-hidden md:border-gray-800 md:shadow-lg" onSubmit={handleSubmit}>
                <h1 className="font-bold text-green-700 text-2xl z-50">Verification Message</h1>
                <p className="text-sm font-medium z-50">An email message with a verification code that has been sent to email</p>

                <div className="relative flex flex-col gap-2 mt-5 z-50">
                    <input className="w-full border-gray-300 border p-2 outline-none z-50" type="number" onChange={(e) => setCode(e.target.value)} placeholder="Verification Code" />
                    <span className="text-red-500 text-xs">{codeErr}</span>
                    
                    <button className="bg-green-700 text-white text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Submit</button>

                </div>         
            </form>
            <img className="absolute bottom-0 -right-12" src="/images/WiseTruck_Logo.png" alt="Logo" />
        </div>
    )
}

export default Verification;
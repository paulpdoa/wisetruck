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
        <div className="relative h-screen flex items-center justify-center">
            <div className="top-0 left-0 absolute w-full flex justify-center">
                <img className="w-full absolute" src="/images/Rectangle_2.png" alt="background" />
                <img className="z-50 absolute mt-20 w-24" src="/images/icon_person.png" alt="icon person" />
            </div>

            <form className="w-full px-14" onSubmit={handleSubmit}>
                <h1 className="font-normal text-2xl">Verification Message</h1>
                <p className="text-sm font-medium">An email message with a verification code that has been sent to email</p>

                <div className="relative flex flex-col gap-2 mt-5">
                    <input className="w-full border-gray-300 border p-2 outline-none" type="number" onChange={(e) => setCode(e.target.value)} placeholder="Verification Code" />
                    <span className="text-red-500 text-xs">{codeErr}</span>
                    
                    <button className="bg-green-200 text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Submit</button>

                </div>
            </form>

        </div>
    )
}

export default Verification;
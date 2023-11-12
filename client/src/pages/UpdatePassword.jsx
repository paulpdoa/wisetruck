import { useState } from 'react';
import axios from 'axios'; 
import { baseUrl } from '../baseUrl';
import { useParams } from 'react-router-dom';
import SuccessMssg from '../components/SuccessMssg';

const UpdatePassword = () => {

    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [message,setMessage] = useState('');
    const [redirect,setRedirect] = useState('');
    const [isUpdated,setIsUpdated] = useState(false);

    const [passwordErr,setPasswordErr] = useState('');

    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.patch(`${baseUrl()}/user/update/password`,{ id,password,confirmPassword });
            setIsUpdated(true);
            setMessage(data.data.mssg);
            setRedirect(data.data.redirect);
        } catch(err) {
            setPasswordErr(err.response.data.mssg);
            setTimeout(() => {
                setPasswordErr('');
            })
            alert(err.response.data.mssg);
        }
    }

    return (
        <div className="relative h-screen flex items-center justify-center pb-36">
            <form className="w-full px-14" onSubmit={handleSubmit}>
                <h1 className="font-bold text-green-700 text-2xl">Create new password</h1>

                <div className="relative flex flex-col gap-2 mt-5">
                    <span className="text-xs text-right text-gray-500">Minimum of 8 characters</span>
                    <input className="w-full border-gray-300 border p-2 outline-none" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
                    <span className="text-red-500 text-xs">{passwordErr}</span>

                    <input className="w-full border-gray-300 border p-2 outline-none" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                    
                    <button className="bg-green-700 text-white text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Submit</button>
                </div>
            </form>
            <img className="absolute bottom-0 -right-12" src="/images/WiseTruck_Logo.png" alt="Logo" />
            { isUpdated && <SuccessMssg message={message} redirect={redirect} closeMessage={setIsUpdated} /> }
        </div>
    )
}

export default UpdatePassword;
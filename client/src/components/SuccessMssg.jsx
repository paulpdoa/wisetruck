import { useNavigate } from 'react-router-dom';

const SuccessMssg = ({ message,redirect,closeMessage }) => {
   
    const navigate = useNavigate();

    return (
        <div className="h-full w-full absolute bg-black z-50 bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-200 w-8/12 flex flex-col items-center p-4 text-center">
                <h1 className="text-lg text-gray-800">{message}</h1>
                <button className="text-lg text-gray-800 p-2 bg-gray-300 rounded-full font-semibold" onClick={() => {
                    navigate(redirect)
                    closeMessage(false)
                }}>Okay</button>
            </div>
        </div>
    )
}

export default SuccessMssg;
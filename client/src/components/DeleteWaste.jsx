import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const DeleteMssg = ({ mssg,closeDelete,wasteId }) => {

    const navigate = useNavigate();

    const deleteWaste = async () => {
        try {
            const data = await axios.delete(`${baseUrl()}/wastes/${wasteId}`);
            alert(data.data.mssg);
            navigate(data.data.redirect);
            closeDelete(true);
        } catch(err) {
            console.log(err);
        }
    }

    return (    
        <div className="h-screen w-full left-0 flex items-center justify-center bg-opacity-50 absolute top-0 bg-black">
            <div className="border border-gray-900 rounded-md flex items-center flex-col p-2 bg-white">
                <p>{mssg}</p>
                <div className="flex gap-2 items-center">
                    <button onClick={deleteWaste} className="bg-green-500 text-gray-200 p-2">Yes</button>
                    <button onClick={() =>closeDelete(false)} className="bg-red-500 text-gray-200 p-2">No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteMssg;
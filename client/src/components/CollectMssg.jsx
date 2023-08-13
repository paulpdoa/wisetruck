import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useState } from 'react'; 

const CollectMssg = ({mssg,closeBox,detail}) => {

    const [isLoading,setIsLoading] = useState(false);

    const startCollection = async () => {
        setIsLoading(true);
        try {
            const data = await axios.patch(`${baseUrl()}/schedules/${detail._id}`,{ isCollecting: true });
            setIsLoading(false);
            alert(data.data.mssg);
            closeBox(false);
            window.location.reload();
        } catch(err) {
            alert(err.response.data.mssg);
            closeBox(false);
        }
    }

    return (
        <div className="h-full fixed left-0 top-0 w-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-2 text-center h-auto flex flex-col items-center justify-center gap-2">
                { isLoading && <p className="animate-pulse text-lg text-green-500 font-medium">Sending notification to users in this barangay, please wait</p> }
                { !isLoading && <p className="font-medium">{mssg}</p> }

                <div className="w-full flex items-center gap-4 justify-center">
                    { !isLoading && 
                    <>
                        <button className="bg-gray-200 font-medium text-sm rounded-md p-2" onClick={() => closeBox(false)}>No thanks</button> 
                        <button onClick={startCollection} className="bg-gray-200 font-medium text-sm rounded-md p-2">Ok</button>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CollectMssg;
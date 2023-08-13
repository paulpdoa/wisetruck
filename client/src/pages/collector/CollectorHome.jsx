import { RECORDS } from '../../json/refbrgy.json';
import { FaGreaterThan } from 'react-icons/fa';
import { useState } from 'react';
import CollectMssg from '../../components/CollectMssg';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';
import axios from 'axios';

const CollectorHome = () => {

    const [barangayDone,setBarangayDone] = useState({});
    const [loading,setLoading] = useState(false);

    const [detail,setDetail] = useState({});
    const [mssg,setMssg] = useState('');
    const [openMssg,setOpenMssg] = useState(false);
    const [done,setDone] = useState(false);
    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const dateToday = `${monthList[new Date().getMonth()]} ${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}, ${new Date().getFullYear()}`;
   
    const date = `${new Date().getFullYear()}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`;
   
    const { records: schedules, isLoading } = fetchApiHook(`${baseUrl()}/schedules`);
    // const provinceCode = '0421';
    // const cityCode = '042117';
    const userName = localStorage.getItem('collector');

    // const barangays = RECORDS.filter((barangay => barangay.provCode === provinceCode && barangay.citymunCode === cityCode));

    const collectGarbage = (brgy,idx) => {
        if(idx !== 0) {
            alert('You cannot collect in this barangay yet, collect in first barangay');
        } else {
            setOpenMssg(true);
            setDetail(brgy);
            setMssg('Are you going to collect now at ' + brgy.barangay);
        }
    }

    const doneCollection = (brgy) => {
        setDone(true);
        setBarangayDone(brgy);
    }

    const updateSchedule = async () => {
        setLoading(true)
        try {
            const data = await axios.patch(`${baseUrl()}/updateschedule/${barangayDone._id}`,{ isCollected: true });
            setLoading(false);
            alert(data.data.mssg);
            setDone(false);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }
    // Filter schedule based on date today
    return (
        <div className="h-full p-5">
            <h1 className="font-medium">Welcome {userName}!</h1>
            <p className="text-sm">It's time to collect trash today</p>
            { isLoading && <h1 className="animate-pulse text-gray-500 font-medium text-xl mt-5">Loading please wait...</h1> }
            <h2 className="mt-5 font-medium text-gray-500 text-xl">{dateToday}</h2>
            { schedules?.filter(schedule => !schedule.isCollected && schedule.collectionDate === date).length < 1 && <h1 className="animate-pulse text-gray-500 font-medium text-xl mt-5">No schedule for today</h1> }
            { schedules?.filter(schedule => schedule.collectionDate === date).map((schedule,idx) => (
                <div key={idx} className="bg-gray-200 rounded-lg w-full h-auto p-2 mt-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full border-dashed border-2 border-gray-900 ${schedule.isCollecting && !schedule.isCollected ? 'bg-green-500 animate-pulse' : !schedule.isCollecting && !schedule.isCollected ? 'bg-gray-500' :'bg-green-400'}`}></div>
                            <div>
                                <h2 className="text-lg font-medium">{schedule.barangay}</h2>
                                <p className="text-base text-gray-400">Pickup Garbage</p>
                            </div>
                        </div>
                        { schedule.isCollected && schedule.isCollecting ? 
                        <p className="font-medium text-green-500">Done collecting</p>
                        :
                        <div className="flex flex-col gap-1">
                            { schedule.isCollecting ? <p className="bg-white text-base p-2 rounded-full font-medium animate-pulse">Collecting</p> : <button onClick={() => collectGarbage(schedule,idx)} className="bg-white text-base p-2 rounded-full font-medium">Collect</button> }
                            <button onClick={() => doneCollection(schedule)} className="bg-white text-base p-2 rounded-full font-medium">Done</button>
                        </div>
                        }
                    </div>
                    { schedules[idx + 1]?.barangay !== undefined && 
                    <div className="flex justify-around items-center mt-3">
                        <p className="text-lg">Departure</p>
                        <p className="flex items-center font-bold">--------<FaGreaterThan /></p>
                        <button className="bg-white text-sm p-2 rounded-full font-medium">{ schedules[idx + 1]?.barangay }</button>
                    </div> 
                    }
                </div>
            )) }
            { openMssg && <CollectMssg mssg={mssg} closeBox={setOpenMssg} detail={detail} /> }
            {/* If done collecting */}
            { done && 
            <div className="h-full fixed left-0 top-0 w-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-2 text-center h-24 flex flex-col items-center justify-center gap-2">
                    { loading && <p className="animate-pulse text-lg text-green-500 font-medium">Sending notification to users in this barangay, please wait</p> }
                    { !loading && <p className="font-medium">Are you done collecting in {barangayDone.barangay}</p> }
                    
                    <div className="w-full flex items-center gap-4 justify-center">
                        { !loading &&
                        <>
                            <button className="bg-gray-200 font-medium text-sm rounded-md p-2" onClick={() => setDone(false)}>No thanks</button>
                            <button onClick={updateSchedule} className="bg-gray-200 font-medium text-sm rounded-md p-2">Yes</button>
                        </>
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default CollectorHome;
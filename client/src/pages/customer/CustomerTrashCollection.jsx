import { fetchApiHook } from "../../hooks/fetchApiHook";
import { baseUrl } from "../../baseUrl";
import { useState } from 'react';
import { barangayMaps } from '../../service/barangayMaps';

const CustomerTrashCollection = () => {

    const { records: schedules,isLoading } = fetchApiHook(`${baseUrl()}/schedules`);
    const [barangay,setBarangay] = useState({});
    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const dateToday = `${monthList[new Date().getMonth()]} ${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}, ${new Date().getFullYear()}`;
    const date = `${new Date().getFullYear()}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`;

    const todayCollections = schedules?.filter(schedule => schedule.collectionDate === date);
    const ongoingCollections = todayCollections?.filter(schedule => !schedule.isCollected);

    const selectBarangayCollected = (brgy) => {
        setBarangay(brgy.barangay);
        const openMap = barangayMaps.filter(barangay => barangay.barangay === brgy.barangay).map(barangay => barangay.map);
        window.open(openMap[0],'_blank','rel=noopener noreferrer');
    }

    return (
        <div className="w-full h-auto">
            <div className="bg-green-200 p-5">
                <h1 className="font-semibold text-gray-500 text-center text-lg">COLLECTION STATUS</h1>
            </div>
            <h1 className="p-5 text-gray-500 font-medium text-xl">{dateToday}</h1>
            { todayCollections.length < 1 && <h1 className="p-5 text-gray-500 text-center text-lg">No collections for today</h1> }
            <div className="flex items-center justify-center gap-5 mt-4">
                { todayCollections?.slice(0,4)?.map((barangay,idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex gap-4 items-center">
                                <div onClick={() => selectBarangayCollected(barangay)} className={`${barangay.isCollecting && !barangay.isCollected ? 'bg-green-400 animate-pulse' : barangay.isCollecting && barangay.isCollected ? 'bg-green-400' : 'bg-gray-500'} h-10 w-10 rounded-full border-dashed border-2 border-gray-900`}></div>
                                {/* { todayCollections[idx + 1]?.barangay !== undefined && <p>----</p> }     */}
                            </div> 
                            <h2 className="text-sm text-gray-500">{barangay.barangay}</h2>
                        </div>
                    </div>
                )) }
            </div>

            <div className="flex flex-col justify-center mt-10 gap-5 items-center">
                { todayCollections?.filter(schedule => schedule.barangay === barangay).map((schedule,idx) => (
                    <>
                    {/*  */}
                    <div className="p-2 relative gap-5 flex items-center w-1/2">
                        <div className={`${schedule?.isCollecting && !schedule.isCollected ? 'bg-red-500 animate-pulse' : !schedule?.isCollecting ? 'bg-transparent' : 'bg-green-400'} border-dashed border border-gray-900 h-5 w-5 rounded-full`}></div>
                        <div>
                            <h2>Ongoing</h2>
                            <p className="text-gray-500 text-sm">{schedule?.barangay}</p>
                        </div>
                    </div>
                    <div className="p-2 relative gap-5 flex items-center w-1/2">
                        <div className={`${schedule?.isCollecting && !schedule.isCollected ? 'bg-red-500 animate-pulse' : !schedule?.isCollecting ? 'bg-transparent' : 'bg-green-400'} border-dashed border border-gray-900 h-5 w-5 rounded-full`}></div>
                        <div>
                            <h2>Collecting</h2>
                            <p className="text-gray-500 text-sm">{schedule?.barangay}</p>
                        </div>
                    </div>
                    <div className="p-2 relative gap-5 flex items-center w-1/2">
                        <div className={`${schedule?.isCollected && !schedule.isCollected ? 'bg-red-500 animate-pulse' : !schedule?.isCollected ? 'bg-transparent' : 'bg-green-400'} border-dashed border border-gray-900 h-5 w-5 rounded-full`}></div>
                        <div>
                            <h2>Collected</h2>
                            <p className="text-gray-500 text-sm">{schedule?.barangay}</p>
                        </div>
                    </div>
                    <div className="p-2 relative gap-5 flex items-center w-1/2">
                        <div className={`${schedule?.isCollected && !schedule.isCollected ? 'bg-red-500 animate-pulse' : !schedule?.isCollected ? 'bg-transparent' : 'bg-green-400'} border-dashed border border-gray-900 h-5 w-5 rounded-full`}></div>
                        <div>
                            <h2>Next Bound</h2>
                            <p className="text-gray-500 text-sm">Going to next bound</p>
                        </div>
                    </div>
                    </>
                )) }
            </div>
        </div>
    )
}

export default CustomerTrashCollection;
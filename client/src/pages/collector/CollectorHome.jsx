import { RECORDS } from '../../json/refbrgy.json';
import { FaGreaterThan } from 'react-icons/fa';
import { useState } from 'react';
import CollectMssg from '../../components/CollectMssg';

const CollectorHome = () => {

    const [detail,setDetail] = useState({});
    const [mssg,setMssg] = useState('');
    const [openMssg,setOpenMssg] = useState(false);

    const provinceCode = '0421';
    const cityCode = '042117';
    const userName = localStorage.getItem('collector');

    const barangays = RECORDS.filter((barangay => barangay.provCode === provinceCode && barangay.citymunCode === cityCode));

    const collectGarbage = (brgy) => {
        setOpenMssg(true);
        setDetail(brgy);
        setMssg('Are you going to collect now at ' + brgy.brgyDesc);
    }
    
    return (
        <div className="h-full p-5">
            <h1 className="font-medium">Welcome {userName}!</h1>
            <p className="text-sm">It's time to collect trash today</p>
            { barangays?.map((brgy,idx) => (
                <div key={idx} className="bg-gray-200 rounded-lg w-full h-auto p-2 mt-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full border-dashed border-2 border-gray-900 bg-green-500"></div>
                            <div>
                                <h2 className="text-lg font-medium">{brgy.brgyDesc}</h2>
                                <p className="text-base text-gray-400">Pickup Garbage</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <button onClick={() => collectGarbage(brgy)} className="bg-white text-base p-2 rounded-full font-medium">Collect</button>
                            <button className="bg-white text-base p-2 rounded-full font-medium">Done</button>
                        </div>
                    </div>
                    { barangays[idx + 1]?.brgyDesc !== undefined && 
                    <div className="flex justify-around items-center mt-3">
                        <p className="text-lg">Departure</p>
                        <p className="flex items-center font-bold">--------<FaGreaterThan /></p>
                        <button className="bg-white text-sm p-2 rounded-full font-medium">{ barangays[idx + 1]?.brgyDesc }</button>
                    </div> 
                    }
                </div>
            )) }
            { openMssg && <CollectMssg mssg={mssg} closeBox={setOpenMssg} /> }
        </div>
    )
}

export default CollectorHome;
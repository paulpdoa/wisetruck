import { useState } from 'react';
import { RECORDS } from '../../json/refbrgy.json';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';

const AdminCollection = () => {

    // const [start,setStart] = useState(0);
    // const [end,setEnd] = useState(4);

    const [barangay,setBarangay] = useState('');
    const [status,setStatus] = useState();
    const { records: schedules, isLoading } = fetchApiHook(`${baseUrl()}/schedules`);
    const provinceCode = '0421';
    const cityCode = '042117';

    const barangays = RECORDS;
    const brgyRosario = barangays.filter((barangay => barangay.provCode === provinceCode && barangay.citymunCode === cityCode));

    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const date = `${new Date().getFullYear()}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`;
    const dateToday = `${monthList[new Date().getMonth()]} ${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}, ${new Date().getFullYear()}`;
    // const collectionsToday = schedules?.filter(schedule => schedule.collectionDate === date && !schedule.isCollected);


    // const nextPage = () => {
    //     setStart(start + 4);
    //     setEnd(end + brgyRosario.length);
    //     console.log(Math.ceil(5 / brgyRosario.length));
    // }

    return (
        <div className="p-10">
            <div className="flex w-full justify-between">
                <div>
                    <select onChange={(e) => setBarangay(e.target.value)} className="p-2 w-full outline-none border border-gray-500">
                        <option hidden>Choose Barangay</option>
                        { brgyRosario.map((brgy,idx) => (
                            <option key={idx} value={brgy.brgyDesc}>{brgy.brgyDesc}</option>
                        )) }
                    </select>
                    <h1 className="mt-5 font-medium text-gray-500 text-xl">{dateToday}</h1>
                </div>

                <div className="flex flex-col">
                    <select onChange={(e) => setStatus(e.target.value)} className="p-2 w-full outline-none border border-gray-500">
                        <option hidden>Choose status</option>
                        <option value={true}>Collected</option>
                        <option value={false}>Not Collected</option>
                    </select>
                </div>
            </div>
            <div className="mt-5 w-full h-80 overflow-auto">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <th>Barangay</th>
                            <th>Collection Date</th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                        { schedules?.filter(schedule => {
                            if(barangay === '' && status === undefined) {
                                return schedule
                            }

                            if(status === String(schedule.isCollected) && barangay === '') {
                                return schedule
                            }

                            if((status === String(schedule.isCollected) && barangay === schedule.barangay)) {
                                return schedule
                            } 
                            
                            
                            
                        }).sort((a,b) => b.collectionDate.split('-').join('') - a.collectionDate.split('-').join('')).map((schedule,idx) => (
                            <tr className="border border-black" key={idx}>
                                <td>{schedule.barangay}</td>
                                <td>{monthList[schedule.collectionDate.split('-')[2] - 1]} {schedule.collectionDate.split('-')[1]}, {schedule.collectionDate.split('-')[0]}</td>
                                {schedule.isCollected ? <td className="text-green-500 font-medium">Collected</td> : <td className="text-red-500 font-medium">Not Collected</td>}
                            </tr>
                        )) }
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    )
}

export default AdminCollection;
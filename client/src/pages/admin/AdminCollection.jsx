import { useState } from 'react';
import { RECORDS } from '../../json/refbrgy.json';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';

const AdminCollection = () => {

    // const [start,setStart] = useState(0);
    // const [end,setEnd] = useState(4);

    const [barangay,setBarangay] = useState('');
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
            <select onChange={(e) => setBarangay(e.target.value)} className="p-2 md:w-1/4 w-full outline-none border border-gray-500">
                <option hidden>Choose Barangay</option>
                { brgyRosario.map((brgy,idx) => (
                    <option key={idx} value={brgy.brgyDesc}>{brgy.brgyDesc}</option>
                )) }
            </select>
            <h1 className="mt-5 font-medium text-gray-500 text-xl">{dateToday}</h1>
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
                            if(barangay === '') {
                                return schedule
                            }
                            if(barangay === schedule.barangay) {
                                return schedule
                            } 
                            // if(schedule.collectionDate === date) {
                            //     return schedule
                            // }
                        }).map((schedule,idx) => (
                            <tr className="border border-black" key={idx}>
                                <td>{schedule.barangay}</td>
                                {schedule.barangay === 'Ligtong I' && console.log(schedule.collectionDate)}
                                <td>{monthList[schedule.collectionDate.split('-')[2] - 1]} {schedule.collectionDate.split('-')[1]}, {schedule.collectionDate.split('-')[0]}</td>
                                {schedule.isCollected ? <td className="text-green-500 font-medium">Collected</td> : <td className="text-green-500 font-medium">Not Collected</td>}
                                {/* <td className="flex items-center justify-center gap-2 border-none">
                                    <button onClick={() => updateNews(record)} className="text-green-500"><FiEdit /></button>
                                    <button onClick={() => deleteNews(record._id,record.firstName)} className="text-red-500"><BsTrash /></button>
                                </td> */}
                            </tr>
                        )) }
                        
                    </tbody>
                </table>
                
            </div>
            {/* <button onClick={nextPage}>Next</button> */}
        </div>
    )
}

export default AdminCollection;
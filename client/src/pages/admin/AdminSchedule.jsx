import { useState } from 'react';
import { RECORDS } from '../../json/refbrgy.json';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { useNavigate } from 'react-router-dom';

const AdminSchedule = () => {

    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const [barangay,setBarangay] = useState('');
    const [date,setDate] = useState(new Date());

    // MM - DD - YY
    const dateInputFormat = `${date.getFullYear()}${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}`;
    const dateToday = `${new Date().getFullYear()}${new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`}${new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth()}`;
    
    const provinceCode = '0421';
    const cityCode = '042117';

    const barangays = RECORDS;
    const brgyRosario = barangays.filter((barangay => barangay.provCode === provinceCode && barangay.citymunCode === cityCode));

    const navigate = useNavigate();

    const generateSchedule = async () => {
        try {
            if(Number(dateInputFormat) < Number(dateToday) || barangay === '') {
                if(Number(dateInputFormat) < Number(dateToday)) {
                    alert('Selected date cannot be less than today');
                } else {
                    alert('Please select barangay');
                }
            } else {
                const data = await axios.post(`${baseUrl()}/schedules`,{ barangay,dateInputFormat });
                alert(data.data.mssg);
                navigate(data.data.redirect);
            }
        } catch(err) {
            alert(err.response.data.mssg);
        }
    }

    return (
        <div className="p-10 flex flex-col gap-4">
            <select onChange={(e) => setBarangay(e.target.value)} className="p-2 md:w-1/4 w-full outline-none border border-gray-500" required>
                <option hidden>Choose Barangay</option>
                { brgyRosario.map((brgy,idx) => (
                    <option key={idx} value={brgy.brgyDesc}>{brgy.brgyDesc}</option>
                )) }
            </select>

            <Calendar onChange={e => setDate(e)} value={date} />

            <button onClick={generateSchedule} className="bg-green-300 p-2 md:w-1/4 w-auto text-gray-700 rounded-md">Generate</button>
        </div>
    )
}

export default AdminSchedule
import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DateFormatter from './DateFormatter';
import Pagination from './Pagination';
import axios from 'axios';

const ListCollectors = ({ searchItem }) => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/collectors`);

    const navigate = useNavigate();

    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const lists = records.slice(firstIndex,lastIndex);
    const numberPage = Math.ceil(records.length / recordsPerPage);
    const numbers = [...Array(numberPage + 1).keys()].slice(1);

    const deleteCollector = async (id) => {
        try {
            const data = await axios.delete(`${baseUrl()}/collector/${id}`);
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="mt-5 md:h-[31rem] h-[700px]">
            { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
             records.length < 1 && <p className="text-xl font-medium animate-pulse">No collectors yet</p> }
            <table className="w-full">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Date Registered</th>
                        <th>Action</th>
                    </tr>
                    { (searchItem !== '' ? records : lists).map((record,idx) => (
                        <tr className="border border-black" key={idx}>
                            <td>{record.firstName} {record.lastName}</td>
                            <td><DateFormatter date={record.createdAt} /></td>
                            <td className="flex gap-2 border-none">
                                <button onClick={() => deleteCollector(record._id)} className="text-red-500 underline">Deactivate</button>
                                <Link to={`/admin/collector/change/password/${record._id}`} className="text-red-500 underline">Change Password</Link>
                            </td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            <Pagination numbers={numbers} setCurrentPage={setCurrentPage} currentPage={currentPage} numberPage={numberPage} />
        </div>
    )
}

export default ListCollectors;
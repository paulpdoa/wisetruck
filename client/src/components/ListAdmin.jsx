import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DateFormatter from './DateFormatter';
import Pagination from './Pagination';
import axios from 'axios';

const ListAdmin = ({ searchItem }) => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/admin`);

    const navigate = useNavigate();

    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const lists = records.slice(firstIndex,lastIndex);
    const numberPage = Math.ceil(records.length / recordsPerPage);
    const numbers = [...Array(numberPage + 1).keys()].slice(1);

    // const deactivateCollector = async (id) => {
    //     try {
    //         const data = await axios.patch(`${baseUrl()}/collector/${id}`);
    //         alert(data.data.mssg);
    //         navigate(data.data.redirect);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    // const activateCollector = async (id) => {
    //     try {
    //         const data = await axios.patch(`${baseUrl()}/collector/activate/${id}`);
    //         alert(data.data.mssg);
    //         navigate(data.data.redirect);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    return (
        <div className="mt-5 md:h-[31rem] h-[700px]">
            { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
             records.length < 1 && <p className="text-xl font-medium animate-pulse">No admins yet</p> }
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
                            <td><Link to={`/admin/change/password/${record._id}`} className="text-red-500 underline">Change Password</Link></td>
                            {/* <td className="flex gap-2 border-none">
                                { record?.isActivated ? <button onClick={() => deactivateCollector(record._id)} className="text-red-500 underline">Deactivate</button> :
                                <button onClick={() => activateCollector(record._id)} className="text-green-500 underline">Activate</button> }
                                <Link to={`/admin/collector/change/password/${record._id}`} className="text-red-500 underline">Change Password</Link>
                            </td> */}
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            <Pagination numbers={numbers} setCurrentPage={setCurrentPage} currentPage={currentPage} numberPage={numberPage} />
        </div>
    )
}

export default ListAdmin;
import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DateFormatter from './DateFormatter';
import Pagination from './Pagination';
import axios from 'axios';

const ListUsers = ({ searchItem }) => {
    
    const { records,isLoading } = fetchApiHook(`${baseUrl()}/users`);

    const [users,setUsers] = useState([]);

    const navigate = useNavigate();

    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const lists = records.slice(firstIndex,lastIndex);
    const numberPage = Math.ceil(records.length / recordsPerPage);
    const numbers = [...Array(numberPage + 1).keys()].slice(1);

    const deactivateUser = async (id) => {
        try {
            const data = await axios.patch(`${baseUrl()}/user/${id}`);
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    const activateUser = async (id) => {
        try {
            const data = await axios.patch(`${baseUrl()}/user/activate/${id}`);
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }
    

    return (
        <div className="mt-5 md:h-[31rem] h-[700px]">
            { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
             records.filter(record => record.isApproved).length < 1 && <p className="text-xl font-medium animate-pulse">No active users yet</p> }
            <table className="w-full">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Date Registered</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    { (searchItem !== '' ? records : lists).filter(record => record.isApproved && `${record.firstName} ${record.lastName}`.toLowerCase().includes(searchItem)).map((record,idx) => (
                        <tr className="border border-black" key={idx}>
                            <td><Link className="text-black underline" to={`/admin/user/${record._id}`}>{record.firstName} {record.lastName}</Link></td>
                            <td><DateFormatter date={record.createdAt} /></td>
                            <td className={`${record.isApproved ? 'text-green-500' : 'text-red-500'}`}>{record.isApproved ? 'Active' : 'Inactive'}</td>
                            <td>
                            { record?.isActivated ? <button onClick={() => deactivateUser(record._id)} className="text-red-500 underline">Deactivate</button> :
                             <button onClick={() => activateUser(record._id)} className="text-green-500 underline">Activate</button> }
                            </td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            <Pagination numbers={numbers} setCurrentPage={setCurrentPage} currentPage={currentPage} numberPage={numberPage} />
        </div>
    )
}

export default ListUsers;
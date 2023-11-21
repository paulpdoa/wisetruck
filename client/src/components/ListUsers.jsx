import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
// import { BsTrash } from 'react-icons/bs';
// import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import DateFormatter from './DateFormatter';
import Pagination from './Pagination';

const ListUsers = ({ searchItem }) => {
    
    const { records,isLoading } = fetchApiHook(`${baseUrl()}/users`);

    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const lists = records.slice(firstIndex,lastIndex);
    const numberPage = Math.ceil(records.length / recordsPerPage);
    const numbers = [...Array(numberPage + 1).keys()].slice(1);

    return (
        <div className="mt-5 md:h-[31rem] h-[700px] relative">
            { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
             lists.filter(record => record.isApproved).length < 1 && <p className="text-xl font-medium animate-pulse">No active users yet</p> }
            <table className="w-full">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Date Registered</th>
                        <th>Status</th>
                    </tr>
                    { lists.filter(record => record.isApproved && record.firstName.toLowerCase().includes(searchItem)).map((record,idx) => (
                        <tr className="border border-black" key={idx}>
                            <td>{record.firstName} {record.lastName}</td>
                            <td><DateFormatter date={record.createdAt} /></td>
                            <td className={`${record.isApproved ? 'text-green-500' : 'text-red-500'}`}>{record.isApproved ? 'Active' : 'Inactive'}</td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            <Pagination numbers={numbers} setCurrentPage={setCurrentPage} currentPage={currentPage} numberPage={numberPage} />
        </div>
    )
}

export default ListUsers;
import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { useState } from 'react';
import DateFormatter from './DateFormatter';
import RejectUser from './RejectUser';
import UpdateUser from './UpdateUser';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const ApproveUsers = ({ searchItem }) => {
    const { records,isLoading } = fetchApiHook(`${baseUrl()}/new/users`);
    const [openReject,setOpenReject] = useState(false);
    const [openApprove,setOpenApprove] = useState(false);
    const [usersId,setUsersId] = useState('');
    const [usersDetail,setUsersDetail] = useState([]);
    const [mssg,setMssg] = useState('');

    //Table Pagination
    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const lists = records.slice(firstIndex,lastIndex);
    const numberPage = Math.ceil(records.length / recordsPerPage);
    const numbers = [...Array(numberPage + 1).keys()].slice(1);


    const rejectUser = (id,name) => {
        setMssg(`Are you sure you want to reject ${name}`);
        setUsersId(id);
        setOpenReject(true);
    }

    const approveUser = (detail) => {
        setUsersDetail(detail);
        setOpenApprove(true);
        setMssg(`Are you sure you want to approve ${detail.firstName}`);
    }

    return (
        <div className="mt-5 md:h-[31rem] h-[700px]">
            { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
             lists.filter(record => !record.isApproved).length < 1 && <p className="text-xl font-medium animate-pulse">No users for approval</p> }
            <table className="w-full">
                <tbody>
                    
                    <tr>
                        <th>Name</th>
                        <th>Date Registered</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    { lists.filter(record => !record.isApproved && record.firstName.toLowerCase().includes(searchItem)).map((record,idx) => (
                        <tr className="border border-black" key={idx}>
                            <td><Link className="text-black underline" to={`/admin/user/${record._id}`}>{record.firstName} {record.lastName}</Link></td>
                            <td><DateFormatter date={record.createdAt} /></td>
                            <td className={`${record.isApproved ? 'text-green-500' : 'text-red-500'}`}>{record.isApproved ? 'Active' : 'Inactive'}</td>
                            <td className="flex items-center justify-center gap-2 border-none">
                                <button onClick={() => approveUser(record)} className="bg-green-500 text-gray-100 p-2 rounded-md">Approve</button>
                                <button onClick={() => rejectUser(record._id,record.firstName)} className="bg-red-500 text-gray-100 p-2 rounded-md">Reject</button>
                            </td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            <Pagination numbers={numbers} setCurrentPage={setCurrentPage} currentPage={currentPage} numberPage={numberPage} />
            { openReject && <RejectUser closeReject={setOpenReject} userId={usersId} mssg={mssg} /> }
            { openApprove && <UpdateUser closeApprove={setOpenApprove} userId={usersDetail} mssg={mssg} /> }
        </div>
    )
}

export default ApproveUsers;
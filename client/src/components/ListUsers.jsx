import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import DateFormatter from './DateFormatter';

const ListUsers = () => {
    const { records,isLoading } = fetchApiHook(`${baseUrl()}/users`);
    const [openDelete,setOpenDelete] = useState(false);
    const [openUpdate,setOpenUpdate] = useState(false);
    const [usersId,setUsersId] = useState('');
    const [usersDetail,setUsersDetail] = useState([]);
    const [mssg,setMssg] = useState('');

    // const deleteNews = (id,name) => {
    //     setMssg(`Are you sure you want to delete ${name}`);
    //     setUsersId(id);
    //     setOpenDelete(true);
    // }

    // const updateNews = (detail) => {
    //     setUsersDetail(detail);
    //     setOpenUpdate(true);
    // }

    return (
        <div className="mt-5 h-80 overflow-auto">
            <table className="w-full">
                <tbody>
                    { isLoading && 'Loading please wait...' }
                    <tr>
                        <th>Name</th>
                        <th>Date Registered</th>
                        <th>Status</th>
                        {/* <th>Action</th> */}
                    </tr>
                    { records.filter(record => record.isApproved).map((record,idx) => (
                        <tr className="border border-black" key={idx}>
                            <td>{record.firstName} {record.lastName}</td>
                            <td><DateFormatter date={record.createdAt} /></td>
                            <td className={`${record.isApproved ? 'text-green-500' : 'text-red-500'}`}>{record.isApproved ? 'Active' : 'Inactive'}</td>
                            {/* <td className="flex items-center justify-center gap-2 border-none">
                                <button onClick={() => updateNews(record)} className="text-green-500"><FiEdit /></button>
                                <button onClick={() => deleteNews(record._id,record.firstName)} className="text-red-500"><BsTrash /></button>
                            </td> */}
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            {/* { openDelete && <DeleteNews closeDelete={setOpenDelete} newsId={newsId} mssg={mssg} /> } */}
            {/* { openUpdate && <UpdateNews closeUpdate={setOpenUpdate} newsId={newsDetail} /> } */}
        </div>
    )
}

export default ListUsers;
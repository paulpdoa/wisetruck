import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import DeleteWaste from './DeleteWaste';
import { useState } from 'react';
import UpdateWaste from './UpdateWaste';

const ListWaste = () => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/wastes`);
    const [openDelete,setOpenDelete] = useState(false);
    const [openUpdate,setOpenUpdate] = useState(false);
    const [wasteId,setWasteId] = useState('');
    const [wasteDetail,setWasteDetail] = useState([]);
    const [mssg,setMssg] = useState('');

    const deleteWaste = (id,name) => {
        setMssg(`Are you sure you want to delete ${name}`);
        setWasteId(id);
        setOpenDelete(true);
    }

    const updateWaste = (detail) => {
        setWasteDetail(detail);
        setOpenUpdate(true);
    }

    return (
        <div className="mt-5 h-80 overflow-auto">
            { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
             records.length < 1 && <p className="text-xl font-medium animate-pulse">No waste added yet</p> }
            <table className="w-full">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Waste Type</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    { records.map((record,idx) => (
                        <tr className="border border-black" key={idx}>
                            <td>{record.name}</td>
                            <td>{record.typeOfWaste}</td>
                            <td>{record.description}</td>
                            <td className="flex items-center justify-center gap-2 border-none">
                                <button onClick={() => updateWaste(record)} className="text-green-500"><FiEdit /></button>
                                <button onClick={() => deleteWaste(record._id,record.name)} className="text-red-500"><BsTrash /></button>
                            </td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            { openDelete && <DeleteWaste closeDelete={setOpenDelete} wasteId={wasteId} mssg={mssg} /> }
            { openUpdate && <UpdateWaste closeUpdate={setOpenUpdate} wasteId={wasteDetail} /> }
        </div>
    )
}

export default ListWaste;
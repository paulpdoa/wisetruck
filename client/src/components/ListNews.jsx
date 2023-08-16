import { baseUrl } from '../baseUrl';
import { fetchApiHook } from '../hooks/fetchApiHook';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import DeleteNews from './DeleteNews';
import UpdateNews from './UpdateNews';

const ListNews = () => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/news`);
    const [openDelete,setOpenDelete] = useState(false);
    const [openUpdate,setOpenUpdate] = useState(false);
    const [newsId,setNewsId] = useState('');
    const [newsDetail,setNewsDetail] = useState([]);
    const [mssg,setMssg] = useState('');

    const deleteNews = (id,name) => {
        setMssg(`Are you sure you want to delete ${name}`);
        setNewsId(id);
        setOpenDelete(true);
    }

    const updateNews = (detail) => {
        setNewsDetail(detail);
        setOpenUpdate(true);
    }

    return (
        <div className="mt-5 h-80 overflow-auto">
           { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
             records.length < 1 && <p className="text-xl font-medium animate-pulse">No news yet</p> }
            <table className="w-full">
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    { records?.map((record,idx) => (
                        records.length > 0 && 
                        <tr className="border border-black" key={idx}>
                            <td>{record.title}</td>
                            <td>{record.description}</td>
                            <td className="flex items-center justify-center gap-2 border-none">
                                <button onClick={() => updateNews(record)} className="text-green-500"><FiEdit /></button>
                                <button onClick={() => deleteNews(record._id,record.title)} className="text-red-500"><BsTrash /></button>
                            </td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
            { openDelete && <DeleteNews closeDelete={setOpenDelete} newsId={newsId} mssg={mssg} /> }
            { openUpdate && <UpdateNews closeUpdate={setOpenUpdate} newsId={newsDetail} /> }
        </div>
    )
}

export default ListNews;
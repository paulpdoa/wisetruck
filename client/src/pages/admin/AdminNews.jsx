import { useState } from 'react';
import AddNews from '../../components/AddNews';
import ListNews from '../../components/ListNews';
import { baseUrl } from '../../baseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

const AdminNews = () => {

    const [addNews,setAddNews] = useState(false);
    const [activeBtn,setActiveBtn] = useState('List News');
    const [description,setDescription] = useState('');

    const [updateField,setUpdateField] = useState(false);

    const { records: announcement } = fetchApiHook(`${baseUrl()}/announcements`);

    const navigate = useNavigate()

    const submitAnnouncement = async (e) => {
        e.preventDefault();

        try {
            if(description === '') {
                alert('Please enter a description for your announcement');
            } else {
                const data = await axios.post(`${baseUrl()}/announcements`,{ description });
                alert(data.data.mssg);
                navigate(data.data.redirect);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const updateAnnouncement = async (id) => {
        setUpdateField(!updateField)
        
        try {
            const data = await axios.put(`${baseUrl()}/announcements/${id}`,{ description });
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    const deleteAnnouncement = async (id) => {
        
        try {
            const data = await axios.delete(`${baseUrl()}/announcements/${id}`);
            alert(data.data.mssg);
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="p-10 relative">
            <div className="flex items-center justify-center">
                <button onClick={() => setActiveBtn('List News')} className={`p-2 border border-gray-500 transition ${activeBtn === 'List News' ? 'bg-gray-700 text-gray-200' : ''}`}>List News</button>
                <button onClick={() => setActiveBtn('Add News')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Add News' ? 'bg-gray-700 text-gray-200' : ''}`}>Add News</button>
            </div>
            
            { activeBtn === 'Add News' &&
            <>
            <div className="mt-10 flex flex-col md:flex-row items-center gap-5 justify-around">
                <div className="w-full flex flex-col justify-start h-24">
                    <h2 className="text-xl text-gray-500 font-medium">News</h2>
                    <button onClick={() => setAddNews(true)} className="w-full h-full border border-gray-500 p-2 font-semibold text-xl rounded-md">+</button>
                </div>
                <div className="w-full flex flex-col justify-start h-24"> 
                    <h2 className="text-xl text-gray-500 font-medium">Announcements</h2>
                    <div className="flex flex-col gap-2">
                        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Announcement description" className="border h-full p-2 text-sm border-gray-500 outline-none rounded-md w-full"></textarea>
                        <button className="bg-green-200 text-sm p-2 rounded-md w-1/2 self-end font-semibold" onClick={submitAnnouncement}>Submit</button>
                    </div>
                </div>
            </div>

            <div className="mt-14 border border-gray-800 p-2 rounded-md md:w-1/2 w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-gray-500 font-medium">Announcement Posted</h2>
                    { announcement !== null &&
                    <div className="flex justify-between items-center gap-3">
                        <button onClick={() => updateAnnouncement(announcement._id)} className="text-green-500"><FiEdit /></button>
                        <button onClick={() => deleteAnnouncement(announcement._id)} className="text-red-500"><BsTrash /></button>
                    </div>
                    }
                </div>
                { updateField ? 
                <div className="mt-2">
                    <input className="p-2 border border-gray-500 w-full" type="text" value={announcement.description} onChange={(e) => setDescription(e.target.value)} />
                    <button className="bg-green-200 font-medium text-gray-800 p-2 rounded-md mt-2">Submit</button>
                </div>
                : announcement === null ? <p className="animate-pulse text-gray-500">No announcement yet</p> : <p>- {announcement?.description}</p> }
            </div>
            { addNews && <AddNews closeNews={setAddNews}/>}
            </>
            }
            { activeBtn === 'List News' && <ListNews /> }
        </div>
    )
}

export default AdminNews;
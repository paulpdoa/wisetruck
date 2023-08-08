import { useState } from 'react';
import AddNews from '../../components/AddNews';
import ListNews from '../../components/ListNews';

const AdminNews = () => {

    const [addNews,setAddNews] = useState(false);
    const [activeBtn,setActiveBtn] = useState('List News');

    return (
        <div className="p-10 relative">
            <div className="flex items-center justify-center">
                <button onClick={() => setActiveBtn('List News')} className={`p-2 border border-gray-500 transition ${activeBtn === 'List News' ? 'bg-gray-700 text-gray-200' : ''}`}>List News</button>
                <button onClick={() => setActiveBtn('Add News')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Add News' ? 'bg-gray-700 text-gray-200' : ''}`}>Add News</button>
            </div>
            
            { activeBtn === 'Add News' &&
            <>
            <div className="mt-10 flex items-center gap-5 justify-around">
                <div className="w-full flex flex-col justify-start h-24">
                    <h2 className="text-xl text-gray-500 font-medium">News</h2>
                    <button onClick={() => setAddNews(true)} className="w-full h-full border border-gray-500 p-2 font-semibold text-xl rounded-md">+</button>
                </div>
                <div className="w-full flex flex-col justify-start h-24"> 
                    <h2 className="text-xl text-gray-500 font-medium">Announcements</h2>
                    <textarea placeholder="Announcement description" className="border h-full p-2 text-sm border-gray-500 outline-none rounded-md w-full"></textarea>
                </div>
            </div>
            { addNews && <AddNews closeNews={setAddNews}/>}
            </>
            }
            { activeBtn === 'List News' && <ListNews /> }
        </div>
    )
}

export default AdminNews;
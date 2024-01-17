import { useState } from 'react';
import AdminSignup from './AdminSignup';
import { FaSearch } from "react-icons/fa";
import ListAdmin from '../../components/ListAdmin';

const AdminAdd = () => {
    const [activeBtn,setActiveBtn] = useState('List Admin');
    const [searchItem,setSearchItem] = useState('');

    return (
        <div className="p-10 relative">
            <div className="relative">
                <div className="flex items-center justify-center">
                    <button onClick={() => setActiveBtn('List Admin')} className={`p-2 border border-gray-500 transition ${activeBtn === 'List Admin' ? 'bg-gray-700 text-gray-200' : ''}`}>List Admin</button>
                    <button onClick={() => setActiveBtn('Add Admin')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Add Admin' ? 'bg-gray-700 text-gray-200' : ''}`}>Add Admin</button>
                </div>
                <div className="md:absolute flex gap-2 items-center bg-gray-100 right-0 top-0 md:w-1/3 mt-5 md:mt-0 rounded-2xl border border-gray-500">
                    <input onChange={(e) => setSearchItem(e.target.value)} className="outline-none bg-gray-100 rounded-2xl w-full p-2" type="text" />
                    <FaSearch className="bg-gray-100 mr-2" />
                </div>
            </div>
            { activeBtn === 'List Admin' && <ListAdmin searchItem={searchItem} /> }
            { activeBtn === 'Add Admin' && <AdminSignup /> }
        </div>
    )
}

export default AdminAdd;
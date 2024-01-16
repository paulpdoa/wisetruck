import { useState } from 'react';
import ListUsers from '../../components/ListUsers';
import ApproveUsers from '../../components/ApproveUsers';
import { FaSearch } from "react-icons/fa";

const AdminUsers = () => {
    const [activeBtn,setActiveBtn] = useState('List Users');
    const [searchItem,setSearchItem] = useState('');

    return (
        <div className="p-10 relative">
            <div className="relative">
                <div className="flex items-center justify-center">
                    <button onClick={() => setActiveBtn('List Users')} className={`p-2 border border-gray-500 transition ${activeBtn === 'List Users' ? 'bg-gray-700 text-gray-200' : ''}`}>List Users</button>
                    <button onClick={() => setActiveBtn('Approve Users')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Approve Users' ? 'bg-gray-700 text-gray-200' : ''}`}>Approve Users</button>
                </div>
                <div className="md:absolute flex gap-2 items-center bg-gray-100 right-0 top-0 md:w-1/3 mt-5 md:mt-0 rounded-2xl border border-gray-500">
                    <input onChange={(e) => setSearchItem(e.target.value)} className="outline-none bg-gray-100 rounded-2xl w-full p-2" type="text" />
                    <FaSearch className="bg-gray-100 mr-2" />
                </div>
            </div>
            { activeBtn === 'List Users' && <ListUsers searchItem={searchItem} /> }
            { activeBtn === 'Approve Users' && <ApproveUsers searchItem={searchItem} /> }
        </div>
    )
}

export default AdminUsers;
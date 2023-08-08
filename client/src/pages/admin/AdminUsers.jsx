import { useState } from 'react';
import ListUsers from '../../components/ListUsers';
import ApproveUsers from '../../components/ApproveUsers';

const AdminUsers = () => {
    const [activeBtn,setActiveBtn] = useState('List Users');

    return (
        <div className="p-10 relative">
            <div className="flex items-center justify-center">
                <button onClick={() => setActiveBtn('List Users')} className={`p-2 border border-gray-500 transition ${activeBtn === 'List Users' ? 'bg-gray-700 text-gray-200' : ''}`}>List Users</button>
                <button onClick={() => setActiveBtn('Approve Users')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Approve Users' ? 'bg-gray-700 text-gray-200' : ''}`}>Approve Users</button>
            </div>

            { activeBtn === 'List Users' && <ListUsers /> }
            { activeBtn === 'Approve Users' && <ApproveUsers /> }
        </div>
    )
}

export default AdminUsers;
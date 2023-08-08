import { useState } from 'react';
import ListWaste from '../../components/ListWaste';
import AddWaste from '../../components/AddWaste';

const AdminWaste = () => {

    const [activeBtn,setActiveBtn] = useState('List Waste');

    return (
        <div className="p-10 relative">
            <div className="flex items-center justify-center">
                <button onClick={() => setActiveBtn('List Waste')} className={`p-2 border border-gray-500 transition ${activeBtn === 'List Waste' ? 'bg-gray-700 text-gray-200' : ''}`}>List Waste</button>
                <button onClick={() => setActiveBtn('Add Waste')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Add Waste' ? 'bg-gray-700 text-gray-200' : ''}`}>Add Waste</button>
            </div>

            { activeBtn === 'List Waste' && <ListWaste />}
            { activeBtn === 'Add Waste' && <AddWaste /> }

        </div>
    )
}

export default AdminWaste;
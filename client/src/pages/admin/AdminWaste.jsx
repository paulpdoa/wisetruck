import { useState } from 'react';
import ListWaste from '../../components/ListWaste';
import AddWaste from '../../components/AddWaste';
import { FaSearch } from "react-icons/fa";

const AdminWaste = () => {

    const [activeBtn,setActiveBtn] = useState('List Waste');
    const [searchItem,setSearchItem] = useState('');

    return (
        <div className="p-10 relative">
            <div className="relative">
                <div className="flex items-center justify-center">
                    <button onClick={() => setActiveBtn('List Waste')} className={`p-2 border border-gray-500 transition ${activeBtn === 'List Waste' ? 'bg-gray-700 text-gray-200' : ''}`}>List Waste</button>
                    <button onClick={() => setActiveBtn('Add Waste')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Add Waste' ? 'bg-gray-700 text-gray-200' : ''}`}>Add Waste</button>
                </div>
                <div className="md:absolute flex gap-2 items-center bg-gray-100 right-0 top-0 md:w-1/3 mt-5 md:mt-0 rounded-2xl border border-gray-500">
                    <input onChange={(e) => setSearchItem(e.target.value)} className="outline-none bg-gray-100 rounded-2xl w-full p-2" type="text" />
                    <FaSearch className="bg-gray-100 mr-2" />
                </div>
            </div>

            { activeBtn === 'List Waste' && <ListWaste searchItem={searchItem} />}
            { activeBtn === 'Add Waste' && <AddWaste /> }

        </div>
    )
}

export default AdminWaste;
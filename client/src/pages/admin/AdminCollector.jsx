import { useState } from 'react';
import CollectorSignup from '../collector/CollectorSignup';
import { FaSearch } from "react-icons/fa";
import ListCollectors from '../../components/ListCollectors';

const AdminCollector = () => {

    const [activeBtn,setActiveBtn] = useState('Collector Lists');
    const [searchItem,setSearchItem] = useState('');

    return (
        <div className="p-10 relative">
            <div className="relative">
                <div className="flex items-center justify-center">
                    <button onClick={() => setActiveBtn('Collector Lists')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Collector Lists' ? 'bg-gray-700 text-gray-200' : ''}`}>Collector Lists</button>
                    <button onClick={() => setActiveBtn('Add Collector')} className={`p-2 border border-gray-500 transition ${activeBtn === 'Add Collector' ? 'bg-gray-700 text-gray-200' : ''}`}>Add Collector</button>
                </div>
                <div className="md:absolute flex gap-2 items-center bg-gray-100 right-0 top-0 md:w-1/3 mt-5 md:mt-0 rounded-2xl border border-gray-500">
                    <input onChange={(e) => setSearchItem(e.target.value)} className="outline-none bg-gray-100 rounded-2xl w-full p-2" type="text" />
                    <FaSearch className="bg-gray-100 mr-2" />
                </div>
            </div>
            
            { activeBtn === 'Collector Lists' && <ListCollectors searchItem={searchItem} /> }
            { activeBtn === 'Add Collector' && <CollectorSignup /> }
        </div>
    )
}

export default AdminCollector;
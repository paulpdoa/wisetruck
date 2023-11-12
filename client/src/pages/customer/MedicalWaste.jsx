import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';

const MedicalWaste = () => {
    const { records,isLoading } = fetchApiHook(`${baseUrl()}/wastes`);
    const wastes = records?.filter(record => record.typeOfWaste === 'Medical Waste');

    return (
        <div className="w-full h-auto flex flex-col items-center">
            <div className="bg-green-700 p-5 relative w-full">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-bold text-white text-center text-3xl">Medical Wastes</h1>
            </div>

            <div className={`grid ${wastes.length < 1 ? '' : 'grid-cols-2'} justify-items-center py-20 gap-8 w-11/12`}>
                { wastes.length < 1 && <h2 className="text-sm text-gray-500 animate-pulse">There are no wastes added yet</h2> }
                { isLoading && <h2 className="text-sm text-gray-500 animate-pulse">Loading please wait...</h2> }
                { wastes?.map((record,idx) => (
                    <Link to={`/wasteinfo/${record?._id}`} key={idx} className="flex flex-col items-center justify-center border rounded-md border-gray-700 p-2 w-full bg-white">
                        <h2 className="font-bold text-green-700">{record?.name[0].toUpperCase()}{record?.name.slice(1).toLowerCase()} </h2>
                    </Link>
                )) }
            </div>
        </div>
    )
}

export default MedicalWaste;
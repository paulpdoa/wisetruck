import { fetchApiHook } from "../../hooks/fetchApiHook";
import { baseUrl } from "../../baseUrl";
import { Link } from 'react-router-dom';

const OrganicWaste = () => {
    const { records,isLoading } = fetchApiHook(`${baseUrl()}/wastes`);

    return (
        <div className="w-full h-auto flex flex-col items-center">
            <div className="bg-green-200 p-5 w-full">
                <h1 className="font-semibold text-gray-500 text-center text-lg">ORGANIC WASTES</h1>
            </div>

            <div className="grid grid-cols-2 justify-items-center py-20 gap-8 w-11/12">
                { isLoading && <h2 className="text-sm text-gray-500 animate-pulse">Loading please wait...</h2> }
                { records?.filter(record => record.typeOfWaste === 'Organic Waste').map((record,idx) => (
                    <Link to={`/wasteinfo/${record._id}`} key={idx} className="flex flex-col items-center justify-center border border-gray-700 p-2 w-full">
                        <h2 className="font-semibold uppercase text-gray-500">{record.name}</h2>
                    </Link>
                )) }
        
            </div>

        </div>
    )
}

export default OrganicWaste;
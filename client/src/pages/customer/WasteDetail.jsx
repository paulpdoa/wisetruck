import { useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import { fetchApiHook } from '../../hooks/fetchApiHook';

const WasteDetail = () => {

    const { id } = useParams();
    const { records } = fetchApiHook(`${baseUrl()}/wastes/${id}`);

    return (
        <div className="w-full h-auto flex flex-col items-center pb-36">
            <div className="bg-green-700 p-5 relative w-full">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-bold text-white text-center text-3xl">{records?.name?.slice(0,1).toUpperCase()}{records?.name?.slice(1)}</h1>
            </div>

            <div className="bg-green-700 rounded-lg h-56 w-11/12 mt-5 flex items-center justify-center">
                <img className="object-cover w-32" src={`${baseUrl()}/images/${records?.photo}`} alt={records?.name} />
            </div>

            <div className="w-11/12 mt-5">
                <h2 className="font-semibold text-lg">Best Option</h2>
                <p>{records?.bestOption}</p>
            </div>

            <div className="w-11/12 mt-5">
                <h2 className="font-semibold text-lg">Descriptions</h2>
                <p>{records?.description}</p>
            </div>

            <div className="w-11/12 mt-5">
                <h2 className="font-semibold text-lg">Special Instructions</h2>
                <p>{records?.specialInstruction}</p>
            </div>

        </div>
    )
}

export default WasteDetail;
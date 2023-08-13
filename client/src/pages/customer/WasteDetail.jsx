import { useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import { fetchApiHook } from '../../hooks/fetchApiHook';

const WasteDetail = () => {

    const { id } = useParams();
    const { records } = fetchApiHook(`${baseUrl()}/wastes/${id}`);

    return (
        <div className="w-full h-auto flex flex-col items-center">
            <div className="bg-green-200 p-5 w-full">
                <h1 className="font-semibold text-gray-500 text-center text-lg uppercase">name ng item</h1>
            </div>

            <div className="bg-green-200 rounded-lg h-56 w-11/12 mt-5 flex items-center justify-center">
                <img src={`${baseUrl()}/images/${records?.photo}`} alt={records?.name} />
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
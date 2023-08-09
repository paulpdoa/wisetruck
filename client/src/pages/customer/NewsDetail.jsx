import { useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import { fetchApiHook } from '../../hooks/fetchApiHook';

const NewsDetail = () => {

    const { id } = useParams();
    const { records } = fetchApiHook(`${baseUrl()}/news/${id}`);

    return (
        <div className="w-full h-full">
            <div className="bg-green-200 p-5">
                <h1 className="font-semibold text-center text-lg">News Detail</h1>
            </div>
            <div className="mt-10">
                <div className="bg-green-200 border border-gray-500 p-5">
                    <div className="w-full h-56 border border-gray-500 overflow-auto flex items-center justify-center">
                        <img className="" src={`${baseUrl()}/images/${records.photo}`} alt={records.title} />
                    </div>

                    <h1 className="text-xl font-semibold mt-5">{records?.title}</h1>
                    <p>{records?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NewsDetail
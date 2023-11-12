import { useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import { fetchApiHook } from '../../hooks/fetchApiHook';

const NewsDetail = () => {

    const { id } = useParams();
    const { records } = fetchApiHook(`${baseUrl()}/news/${id}`);

    return (
        <div className="w-full h-full bg-green-50">
            <div className="bg-green-700 rounded-b-2xl p-5 relative w-full">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="text-center text-3xl font-bold text-white">News and Updates</h1>
            </div>
            <div className="mt-2">
                <div className="pb-36 px-10 bg-green-50">
                    <div className="w-full flex items-center justify-center rounded-2xl bg-green-700">
                        <img className="object-cover h-[313px] md:w-1/2 p-5" src={`${baseUrl()}/images/${records.photo}`} alt={records.title} />
                    </div>

                    <h1 className="text-xl font-bold text-green-700 mt-5">{records?.title}</h1>
                    <p className="text-green-700 font-semibold md:text-base text-xs">{records?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NewsDetail
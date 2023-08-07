import { TbSpeakerphone } from 'react-icons/tb';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';

const CustomerNews = () => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/news`);

    return (
        <div className="w-full h-auto py-10 pt-5">
            <div className="flex gap-2 items-center border-2 border-gray-400 m-3 justify-center p-3">
                <TbSpeakerphone className="text-4xl" />
                <h1 className="font-medium text-lg">There's no announcement yet</h1>
            </div>

            <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-3xl">News</h1>

                <div className="flex flex-col w-11/12 mt-5 gap-2">
                    { isLoading ? <h2 className="font-semibold text-2xl text-gray-400 animate-pulse">No news yet...</h2> : 
                    records?.map((record,idx) => (
                        <Link to={`/news/${record._id}`} className="border border-gray-400 p-2" key={idx}>
                            <h2 className="font-semibold text-xl">{record.title}</h2>
                            <p>{record.description}</p>
                        </Link>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomerNews;
import { TbSpeakerphone } from 'react-icons/tb';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';

const CustomerNews = () => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/news`);
    const { records: announcement, isLoading: loading } = fetchApiHook(`${baseUrl()}/announcements`);

    return (
        <div className="w-full h-full">
            <div className="bg-green-500 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-semibold text-center text-lg">News and Announcements</h1>
            </div>
            <div className="flex gap-2 items-center border-2 border-gray-400 m-3 justify-center p-3 bg-green-500">
                {/* <TbSpeakerphone className="text-4xl" /> */}
                <img className="w-10" src="/images/announcement_icon.png" alt="announcement icon" />
                { loading && <h1 className="font-medium text-lg text-gray-500 animate-pulse">Loading please wait</h1> }
                { announcement !== null ? <p className="font-medium text-lg">{announcement?.description}</p> : <h1 className="font-medium text-lg">There's no announcement yet</h1> }
            </div>

            <div className="flex flex-col gap-2 items-center py-5">
                <h1 className="font-semibold text-3xl">News</h1>

                <div className="flex flex-col w-11/12 mt-5 gap-2">
                    { records.length < 1 && <h2 className="font-semibold text-2xl text-gray-400 animate-pulse">There's no news yet...</h2> }
                    { isLoading ? <h2 className="font-semibold text-2xl text-gray-400 animate-pulse">Loading news...</h2> : 
                    records?.map((record,idx) => (
                        <Link to={`/news/${record?._id}`} className="border bg-green-500 border-gray-400 p-2" key={idx}>
                            <h2 className="font-semibold text-xl">{record?.title}</h2>
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
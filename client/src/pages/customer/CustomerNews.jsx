import { TbSpeakerphone } from 'react-icons/tb';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';

const CustomerNews = () => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/news`);
    const { records: announcement, isLoading: loading } = fetchApiHook(`${baseUrl()}/announcements`);

    return (
        <div className="w-full h-full">
            <div className="bg-green-700 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-bold text-center text-white md:text-2xl text-lg">News and Updates</h1>
            </div>
            {/* <div className="flex gap-2 items-center border-2 border-gray-400 m-3 justify-center p-3 bg-green-700">
                <img className="w-10" src="/images/announcement_icon.png" alt="announcement icon" />
                { loading && <h1 className="font-medium text-lg text-gray-500 animate-pulse">Loading please wait</h1> }
                { announcement !== null ? <p className="font-medium text-lg">{announcement?.description}</p> : <h1 className="font-medium text-lg">There's no announcement yet</h1> }
            </div> */}

            <div className="flex flex-col gap-2 items-center pb-36 bg-green-50">
                {/* <h1 className="font-semibold text-3xl">News</h1> */}
                <div className="flex flex-col w-11/12 mt-5 gap-2">
                    { records.length < 1 && <h2 className="font-semibold text-2xl text-gray-400 animate-pulse">There's no news yet...</h2> }
                    { isLoading ? <h2 className="font-semibold text-2xl text-gray-400 animate-pulse">Loading news...</h2> : 
                    records?.map((record,idx) => (
                        <div className="border bg-green-100 border-gray-400 p-2" key={idx}>
                            <img className="w-full h-[213px] object-cover" src={`${baseUrl()}/images/${record?.photo}`} alt={record?.title} />
                            <h2 className="font-bold text-xl text-green-700">{record?.title}</h2>
                            <button className="w-full flex justify-end">
                                <Link className="font-bold text-green-700" to={`/news/${record?._id}`}>See full story -&gt;</Link>
                            </button>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomerNews;
import { Link } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import { fetchApiHook } from '../../hooks/fetchApiHook';

const CustomerHome = () => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/news`);
    const latestNews = records[records?.length - 1];
    const user = localStorage.getItem('customer');

    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const date = `${new Date().getFullYear()}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`;
    const dateToday = `${monthList[new Date().getMonth()]} ${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}, ${new Date().getFullYear()}`;

    return (
        <div className="w-full h-screen">
            <div className="flex flex-col gap-5 py-20 pt-5">

                <div className="p-2 mx-2 rounded-md">
                    <h1 className="font-semibold">Hi { user }</h1>
                    <h2>Today is { dateToday }</h2>

                    {/* <div className="flex items-center justify-between mt-4">
                        <p>Plastic waste turned over</p>
                        <p className="font-semibold text-gray-700">30kg</p>
                    </div> */}
                </div>

                <Link to='/recyclecenters' className="relative bg-green-100 border border-gray-500 p-2 flex flex-col items-center justify-center mx-2 rounded-md">
                    <img className="absolute w-32 bg-white rounded-full bg-opacity-50" src="/images/Recycle-Centers-Pin-Location.png" alt="Pin" />
                    <img className="" src="/images/Philippine_Map.png" alt="Map" />
                    {/* <img src="/images/recycle-icon.png" alt="recycle icon" /> */}
                    <h1 className="font-semibold absolute bottom-10 bg-white bg-opacity-50 rounded-md p-2">Locate your nearest Recycle Centers</h1>
                </Link>
                <Link to='/collections' className="bg-green-100 border border-gray-500 p-2 flex flex-col items-start mx-2 rounded-md">
                    <h1>Barangay Collections</h1>
                    <h1 className="font-semibold">Check collections today</h1>
                </Link>

                <div className="bg-green-100 border border-gray-500 p-2 mx-2 rounded-md">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-gray-700">News and Announcements</h1>
                        <Link className="text-green-500 underline text-sm font-semibold" to='/news'>More</Link>
                    </div>
                    { latestNews !== undefined ?
                        <>
                        <div className="p-2 mt-2 w-full h-56 overflow-auto flex items-center justify-center">
                            { isLoading ? 'Please wait' : <img src={`${baseUrl()}/images/${latestNews?.photo}`} alt={latestNews?.title} /> }
                        </div>
                        { isLoading ? 'Please wait' : 
                        <div className="mt-2">
                            <h2 className="text-lg font-medium text-gray-700">{latestNews?.title}</h2>
                            <p className="text-gray-700">{latestNews?.description}</p>
                        </div>
                        }
                        </> :
                        <div>
                            <h2 className="animate-pulse text-gray-500">No announcement yet...</h2>
                        </div>
                    }
                </div>

                <Link to='/junkshops' className="bg-green-100 border relative border-gray-500 p-2 flex flex-col items-center justify-center mx-2 rounded-md">
                    <img className="absolute w-20" src="/images/Junkshop-Icon.png" alt="junkshop icon" />
                    <img className="absolute w-40" src="/images/Junkshop-Crosshair-Icon.png" alt="junkshop crosshair" />
                    <img className="opacity-40" src="/images/Junkshop-Homepage.jpg" alt="junkshop" />
                    <h1 className="font-semibold absolute bottom-10 bg-white bg-opacity-50 rounded-md p-2">Locate your nearest Recycle Centers</h1>
                </Link>

                <div className="bg-green-100 border border-gray-500 p-2 mx-2 rounded-md">
                    <div className="text-center">
                        <h1 className="font-semibold text-gray-900">Wisetruck Bin</h1>
                    </div>
                    <p className="text-gray-700 font-semibold text-sm">Know your bin!</p>
                    <div className="p-2 mt-2 w-full h-56 flex items-center overflow-auto justify-center">
                        <img className="w-full" src="/images/bin-colors.png" alt="bins" />
                    </div>
                    <div className="flex justify-end">
                        <Link to='/wasteinfo' className="underline text-sm text-green-500">Learn more</Link>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default CustomerHome;
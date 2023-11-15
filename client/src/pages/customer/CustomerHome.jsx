import { Link } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import { fetchApiHook } from '../../hooks/fetchApiHook';
import DateFormatter from '../../components/DateFormatter';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CustomerHome = () => {

    const { records,isLoading } = fetchApiHook(`${baseUrl()}/news`);
    const { records: announcement } = fetchApiHook(`${baseUrl()}/announcements`)
    
    const user = localStorage.getItem('customer');

    const wasteTypes = [
        {
            image: "/images/Biodegradable.png"
        },
        {
            image: "/images/Plastic.png"
        },
        {
            image: "/images/Recyclable.png"
        },
        {
            image: "/images/Hazardous.png"
        },
        {
            image: "/images/Non-Biodegradable.png"
        }
    ]

    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const date = `${new Date().getFullYear()}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`;
    const dateToday = `${monthList[new Date().getMonth()]} ${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}, ${new Date().getFullYear()}`;

    return (
        <div className="w-full h-screen">
            <div className="flex flex-col gap-5 py-20 pt-5 pb-36 bg-green-100">
                <div className="p-2 mx-2 rounded-md">
                    <h1 className="font-bold text-3xl text-green-700">Hi { user }</h1>
                    <h2 className="font-bold text-green-700">Today is { dateToday }</h2>
                </div>

                <div className="bg-green-700 flex items-center justify-between mx-2 rounded-md relative">
                    <div className="flex flex-col gap-2 p-5">
                        <h1 className="font-bold text-white text-xl w-2/3">Check waste collections today</h1>
                        <Link className="bg-white p-2 rounded-md w-1/2 text-green-700 font-bold text-center text-lg" to='/collections'>Tap Here</Link>
                    </div>
                    <img className="absolute md:right-5 right-0 bottom-0 md:w-auto w-1/2" src="/images/WiseTruck_Logo.png" alt="WiseTruck"  />
                </div>

                <div id="wisetruckmaps" className="relative p-2 flex flex-col items-center justify-center mx-2 rounded-md">
                    <h1 className="self-start text-3xl font-bold text-green-700">WiseTruck Maps</h1>

                    <div className="flex md:flex-row flex-col items-center justify-around gap-2 w-full h-full mt-4">
                        <div className="bg-green-700 rounded-md p-2 md:w-1/2 w-full">
                            <div className="p-2 relative flex flex-col items-center justify-center">
                                <img className="md:w-[562px] md:h-[368px] rounded-md opacity-90" src="/images/Junkshop-Homepage.jpg" alt="Junkshop" />
                                <div className="absolute flex flex-col items-center">
                                    <div className="flex items-center justify-center relative">
                                        <img className="absolute w-10" src="/images/Junkshop-Icon.png" alt="icon" />
                                        <img className="w-24" src="/images/Junkshop-Crosshair-Icon.png" alt="cross hair" />
                                    </div>
                                    <Link to='/junkshops' className="bg-white md:text-lg text-sm bg-opacity-50 text-green-700 w-fit font-bold p-2 rounded-md border border-gray-400">Locate your nearest Junkshops</Link>
                                </div>
                            </div>
                            <p className="text-white font-bold">Earn while conserving the environment by turning over recyclable wastes to your nearest exclusive junkshops</p>
                        </div>

                        <div className="bg-green-700 rounded-md p-2 md:w-1/2 w-full">
                            <div className="p-2 relative flex flex-col items-center justify-center">
                                <img className="md:w-[562px] md:h-[368px] rounded-md" src="/images/recycle_centers.png" alt="Recycle Centers" />
                                <div className="absolute flex flex-col items-center">
                                    <div className="flex items-center justify-center relative">
                                        <img className="absolute w-16" src="/images/Recycle-Centers-Pin-Location.png" alt="icon" />
                                        <img className="w-24" src="/images/globe.png" alt="globe" />
                                    </div>
                                    <Link to='/recyclecenters' className="bg-white  md:text-lg text-sm   bg-opacity-50 text-green-700 w-fit font-bold p-2 rounded-md border border-gray-400">Locate your nearest Recycle Centers</Link>
                                </div>
                            </div>
                            <p className="text-white font-bold">Participate by turning over your plastic wastes to your nearest Recycle Centers to lessen municipal generated waste </p>
                        </div>
                    </div>
                </div>
                

                <div id="news" className="p-2 mx-2 rounded-md">
                    <h1 className="font-bold text-green-700 text-3xl">News and Updates</h1>       
                    <div className="border-t-4 border-green-700 p-4 gap-4 mt-4 md:grid hidden md:grid-cols-3 grid-cols-1 justify-items-center">
                        { records?.slice(0,2).map(news => (
                            <Link to={`/news/${news._id}`} key={news._id} className="w-full">
                                <img className="w-full h-[213px] object-cover" src={`${baseUrl()}/images/${news.photo}`} alt="News Images" />
                                <h2 className="text-green-700 text-xs font-bold p-1">{news.title}</h2>
                                <p className="text-xs text-end"><DateFormatter style="text-green-700 font-bold" date={news.createdAt} /></p>
                            </Link>
                        )) }
                        <Link to='/news' className="w-full md:flex justify-center hidden bg-[url('/images/cleanup.png')] relative bg-cover bg-blend-lighten bg-white bg-opacity-50 h-[213px]">
                            <div className="text-center absolute h-[213px] w-full flex flex-col items-center justify-center">
                                <h2 className="text-green-700 text-6xl font-bold p-1">+</h2>
                                <p className="text-end text-2xl font-bold text-green-700">See more...</p>
                            </div>
                        </Link> 
                    </div>
                    <Carousel showThumbs={false} className="border-t-4 border-green-700 p-4 gap-4 mt-4 md:hidden grid md:grid-cols-3 grid-cols-1 justify-items-center">
                        { records?.slice(0,2).map(news => (
                            <Link to={`/news/${news._id}`} key={news._id} className="w-full">
                                <img className="w-full h-[213px] object-cover" src={`${baseUrl()}/images/${news.photo}`} alt="News Images" />
                                <h2 className="text-green-700 text-xs font-bold p-1">{news.title}</h2>
                                <p className="text-xs text-end"><DateFormatter style="text-green-700 font-bold" date={news.createdAt} /></p>
                            </Link>
                        )) }
                        <Link to='/news' className="w-full flex justify-center md:hidden relative  bg-[url('/images/cleanup.png')] bg-cover bg-blend-lighten bg-white bg-opacity-50 h-[213px]">
                            <div className="text-center absolute h-[213px] w-full flex flex-col items-center justify-center">
                                <h2 className="text-green-700 text-6xl font-bold p-1">+</h2>
                                <p className="text-end text-2xl font-bold text-green-700">See more...</p>
                            </div>
                        </Link>
                    </Carousel>
                </div>

                <div className="p-2 mx-2 rounded-md">
                    <h1 className="font-bold text-green-700 text-3xl">Announcements</h1>

                    <div className="p-2 w-full flex items-center justify-around rounded-md mt-5">
                        <div className="border-8 border-gray-900 h-56 relative rounded-2xl">
                            <p className="p-2 text-green-700 font-bold md:text-sm text-xs w-full">{announcement.description}</p>
                            <div className="w-14 h-14 overflow-hidden rotate-45 absolute bottom-5 -right-[34px]">
                                <div className="w-14 h-14 border-8 absolute border-gray-800 bg-green-100 border-l-0 border-b-0"></div>
                            </div>
                        </div>
                        <img className="md:w-auto w-32" src="/images/announcement-man.png" alt="Announcement Man" />
                    </div>
                </div>

                <div id="wasteinfo" className="p-2 mx-2 rounded-md">
                    <h1 className="font-bold text-green-700 text-3xl">WiseTruck Bin</h1>
                    
                    <div className="bg-green-700 rounded-md p-5">
                        <h2 className="text-2xl text-center text-white font-bold">Know your Bin</h2>

                        <div className="bg-green-200 flex flex-grow justify-around mt-5 p-2 rounded-md">
                            { wasteTypes.map((waste,id) => (
                                <img className="w-10 md:w-auto" key={id} src={waste.image} alt="Waste Images" />
                            )) }
                        </div>

                        <button className="w-full flex justify-end"><Link to='/wasteinfo' className="text-white font-semi   bold mt-2 underline">See more</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerHome;
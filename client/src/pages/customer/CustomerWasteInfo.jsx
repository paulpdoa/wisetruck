import { Link } from 'react-router-dom';

const CustomerWasteInfo = () => {
    return (
        <div className="w-full h-auto">
            <div className="bg-green-200 p-5">
                <h1 className="font-semibold text-gray-500 text-center text-lg">TYPES OF WASTE</h1>
            </div>

            <div className="grid grid-cols-2 justify-items-center py-20 gap-5">
                <div className="flex flex-col items-center justify-center">
                    <Link to='/wasteinfo/glasswaste' className="bg-green-500 rounded-full h-24 w-24 flex items-center justify-center">
                        <img src="/images/vase.png" alt="vase" />
                    </Link>
                    <h2 className="font-semibold">Glass Waste</h2>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Link to='/wasteinfo/plasticwaste' className="bg-green-500 rounded-full h-24 w-24 flex items-center justify-center">
                        <img src="/images/bottle.png" alt="bottle" />
                    </Link>
                    <h2 className="font-semibold">Plastic Waste</h2>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Link to='/wasteinfo/paperwaste' className="bg-green-500 rounded-full h-24 w-24 flex items-center justify-center">
                        <img src="/images/news_paper.png" alt="news paper" />
                    </Link>
                    <h2 className="font-semibold">Paper Waste</h2>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Link to='/wasteinfo/metalwaste' className="bg-green-500 rounded-full h-24 w-24 flex items-center justify-center">
                        <img src="/images/battery.png" alt="battery" />
                    </Link>
                    <h2 className="font-semibold">Metal Waste</h2>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Link to='/wasteinfo/organicwaste' className="bg-green-500 rounded-full h-24 w-24 flex items-center justify-center">
                        <img src="/images/banana.png" alt="banana" />
                    </Link>
                    <h2 className="font-semibold">Organic Waste</h2>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Link to='/wasteinfo/electronicwaste' className="bg-green-500 rounded-full h-24 w-24 flex items-center justify-center">
                        <img src="/images/battery_save.png" alt="battery" />
                    </Link>
                    <h2 className="font-semibold">Electronic Waste</h2>
                </div>
        
            </div>
        </div>
    )
}

export default CustomerWasteInfo;
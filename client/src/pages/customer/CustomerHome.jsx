import { Link } from 'react-router-dom';

const CustomerHome = () => {
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col gap-5 py-20 pt-5">
                <div className="bg-green-200 border border-gray-500 p-2 flex flex-col items-center justify-center mx-2 rounded-md">
                    <h1 className="font-semibold">Locate your nearest Recycle Centers</h1>
                </div>

                <div className="bg-green-200 border border-gray-500 p-2 mx-2 rounded-md">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-gray-700">News and Announcements</h1>
                        <Link className="text-green-500 underline text-sm font-semibold" to='/news'>More</Link>
                    </div>
                    <div className="bg-green-500 p-2 mt-2 w-full h-56">
                        <h1>Testing</h1>
                    </div>
                </div>

                <div className="bg-green-200 border border-gray-500 p-2 flex flex-col items-center justify-center mx-2 rounded-md">
                    <h1 className="font-semibold">Locate your nearest Junk shops</h1>
                </div>

                <div className="bg-green-200 border border-gray-500 p-2 mx-2 rounded-md">
                    <div className="text-center">
                        <h1 className="font-semibold text-gray-900">Wisetruck Bin</h1>
                    </div>
                    <p className="text-gray-700 font-semibold text-sm">Know your bin!</p>
                    <div className="bg-green-500 p-2 mt-2 w-full h-56">
                        <h1>Testing</h1>
                    </div>
                    <div className="flex justify-end">
                        <Link to='/wasteinfo' className="underline text-sm text-green-500">Learn more</Link>
                    </div>
                </div>

                <div className="bg-green-200 border border-gray-500 p-2 mx-2 rounded-md">
                    <h1 className="font-semibold">WiseTruck Impact</h1>
                    <h2>Month of June:(Dynamic month)</h2>

                    <div className="flex items-center justify-between mt-4">
                        <p>Plastic waste turned over</p>
                        <p className="font-semibold text-gray-700">30kg</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerHome;
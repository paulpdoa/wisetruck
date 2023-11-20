import { baseUrl } from "../../baseUrl";
import { fetchApiHook } from "../../hooks/fetchApiHook";
import { Link } from 'react-router-dom';

const AdminHome = () => {

    const { records: users } = fetchApiHook(`${baseUrl()}/users`);
    const { records: schedules } = fetchApiHook(`${baseUrl()}/schedules`);
    const activeUsers = users.filter(user => user.isApproved).length;

    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const date = `${new Date().getFullYear()}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`;
    const dateToday = `${monthList[new Date().getMonth()]} ${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}, ${new Date().getFullYear()}`;

    return (
        <div className="p-10">
            <h1 className="pb-4 text-lg text-gray-600 font-medium">{ dateToday }</h1>
            <div className="flex flex-col md:flex-row items-center gap-5 justify-around w-full">
                <div className="border border-gray-500 p-3 text-center w-full">
                    <h2 className="text-xl text-gray-700">Number of Members</h2>
                    <p className="text-green-500 font-semibold text-sm">{activeUsers}</p>
                </div>  
                <div className="border border-gray-500 p-3 text-center w-full">
                    <h2 className="text-xl text-gray-700">Number of collected trash today</h2>
                    <p className="text-green-500 font-semibold text-sm">{ schedules.filter(schedule => schedule.collectionDate === date && schedule.isCollected).length }</p>
                </div> 
            </div>

            <div className="md:w-full w-auto mt-10 border border-gray-500">
                <h2 className="text-xl text-gray-700 p-3 text-center font-semibold">Today's Schedule</h2>
                { schedules?.filter(schedule => schedule.collectionDate === date).slice(0,1).map(schedule => (
                    <div className="px-5 pb-5 flex justify-between items-center" key={schedule._id}>
                        <h2 className="font-medium">Collection today at { schedule.barangay }</h2>
                        <Link className="text-sm text-green-500 underline" to='/admin/collection'>More schedules today</Link>
                    </div>
                )) }
            </div>

            <div className="md:w-full w-auto mt-10">
                <h2 className="text-xl text-gray-700 border border-gray-500 p-3 text-center font-semibold">Upcoming Waste Collection</h2>
                <table className="md:w-full w-auto border-gray-500 border border-collapse">
                   <tbody className="border border-gray-500">
                        <tr className="border border-gray-500">
                            <td className="text-left md:text-xl text-sm text-gray-700 font-medium">List of Barangay</td>
                            <td className="text-left md:text-xl text-sm text-gray-700 font-medium">Date of Collection</td>
                            <td className="text-left md:text-xl text-sm text-gray-700 font-medium">Status</td> 
                        </tr>
                        { schedules?.filter(schedule => {
                            let collectionDate = schedule.collectionDate.split('-');
                            let collectionDateFormatted = Number(collectionDate[0]+''+collectionDate[2]+collectionDate[1]);
                            let currentDate = date.split('-');
                            let currentDateFormatted = Number(currentDate[0]+''+currentDate[2]+currentDate[1]);           
                            return collectionDateFormatted > currentDateFormatted                 
                        }).slice(0,4).map((schedule,idx) => (
                            <tr key={idx}>
                                <td>{schedule.barangay}</td>
                                <td>{monthList[schedule.collectionDate.split('-')[2] - 1]} {schedule.collectionDate.split('-')[1]}, {schedule.collectionDate.split('-')[0]}</td>
                                <td>{schedule.isCollected ? 'Collected' : 'Not Collected'}</td>
                            </tr>
                        )) }
                   </tbody> 
                </table>
            </div>

            <div className="w-full mt-10 border p-3 border-gray-500">
                <h2 className="text-lg text-gray-700 font-semibold">Newly Registered User</h2>

                { !users[users?.length - 1]?.isApproved ? 
                <div>
                    <p>Name: { users[users?.length - 1]?.firstName } { users[users?.length - 1]?.lastName }</p>
                    <p>Email: {users[users?.length - 1]?.email}</p>
                    <Link className="text-green-500 underline text-sm" to='/admin/users'>Go to users list</Link>
                </div>
                :
                <h3 className="animate-pulse font-medium text-gray-500">No new user has registered yet...</h3>
                }
            </div>

            {/* <div className="w-full mt-10">
                <h2 className="text-xl text-gray-700 border border-gray-500 p-3 text-center font-semibold">Previous Waste Collection</h2>
                <table className="w-full border-gray-500 border border-collapse">
                   <tbody className="border border-gray-500">
                        <tr className="border border-gray-500">
                            <td className="text-left text-xl text-gray-700 font-medium">List of Barangay</td>
                            <td className="text-left text-xl text-gray-700 font-medium">Date of Collection</td>
                            <td className="text-left text-xl text-gray-700 font-medium">Status</td> 
                        </tr>
                        <tr>
                            <td>Barangay 1</td>
                            <td>June 03, 2023</td>
                            <td>Collected</td> 
                        </tr>
                   </tbody> 
                </table>
            </div> */}

        </div>
    )
}

export default AdminHome;
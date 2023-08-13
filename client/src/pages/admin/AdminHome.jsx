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
            <div className="flex items-center gap-5 justify-around w-full">
                <div className="border border-gray-500 p-3 text-center w-full">
                    <h2 className="text-xl text-gray-700">Number of Members</h2>
                    <p className="text-green-500 font-semibold text-sm">{activeUsers}</p>
                </div>  
                <div className="border border-gray-500 p-3 text-center w-full">
                    <h2 className="text-xl text-gray-700">Number of accumulated plastics</h2>
                    <p className="text-green-500 font-semibold text-sm">30 kg</p>
                </div> 
            </div>

            <div className="w-full mt-10">
                <h2 className="text-xl text-gray-700 border border-gray-500 p-3 text-center font-semibold">Upcoming Waste Collection</h2>
                <table className="w-full border-gray-500 border border-collapse">
                   <tbody className="border border-gray-500">
                        <tr className="border border-gray-500">
                            <td className="text-left text-xl text-gray-700 font-medium">List of Barangay</td>
                            <td className="text-left text-xl text-gray-700 font-medium">Date of Collection</td>
                            <td className="text-left text-xl text-gray-700 font-medium">Status</td> 
                        </tr>
                        { schedules?.slice(0,4).filter(schedule => schedule.collectionDate === date).map((schedule,idx) => (
                            <tr>
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
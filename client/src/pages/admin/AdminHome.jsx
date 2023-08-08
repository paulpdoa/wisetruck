import { baseUrl } from "../../baseUrl";
import { fetchApiHook } from "../../hooks/fetchApiHook";

const AdminHome = () => {

    const { records: users } = fetchApiHook(`${baseUrl()}/users`);
    const activeUsers = users.filter(user => user.isApproved).length;


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
                        <tr>
                            <td>Barangay 1</td>
                            <td>June 03, 2023</td>
                            <td>Ongoing</td> 
                        </tr>
                   </tbody> 
                </table>
            </div>

            <div className="w-full mt-10">
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
            </div>

        </div>
    )
}

export default AdminHome;
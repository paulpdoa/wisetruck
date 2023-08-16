import { baseUrl } from "../../baseUrl";
import { fetchApiHook } from "../../hooks/fetchApiHook";

const AdminFeedback = () => {

    const { records: feedbacks, isLoading } = fetchApiHook(`${baseUrl()}/feedbacks`);

    return (
        <div className="p-10">
            <div className="flex flex-col gap-2">
                <h2 className="font-medium text-xl">User Feedback</h2>

                { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
                 feedbacks?.length < 1 && <p className="text-xl font-medium animate-pulse">No feedback from users yet</p> }
                <div className="overflow-auto mt-5">
                    <table className="w-full">
                        <tbody>
                            
                            <tr>
                                <th>Name</th>
                                <th>Feedback</th>
                            </tr>
                            { feedbacks?.map((record,idx) => (
                                record.user_id !== undefined && 
                                <tr className="border border-black" key={idx}>
                                    <td>{record.user_id?.firstName} {record.user_id?.lastName}</td>
                                    <td>{record.feedback}</td>
                                </tr>
                            )) }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminFeedback;
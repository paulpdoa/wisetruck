import { baseUrl } from "../../baseUrl";
import Pagination from "../../components/Pagination";
import { fetchApiHook } from "../../hooks/fetchApiHook";
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const AdminFeedback = () => {

    const { records: feedbacks, isLoading } = fetchApiHook(`${baseUrl()}/feedbacks`);

    const [searchItem,setSearchItem] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const lists = feedbacks.slice(firstIndex,lastIndex);
    const numberPage = Math.ceil(feedbacks.length / recordsPerPage);
    const numbers = [...Array(numberPage + 1).keys()].slice(1);

    return (
        <div className="p-10">
            <div className="relative flex flex-col gap-2">
                <div className="flex md:flex-row flex-col items-center justify-between">
                    <h2 className="font-medium text-xl">User Feedback</h2>
                    <div className="flex gap-2 items-center bg-gray-100 right-0 top-0 md:w-1/3 w-full mt-5 md:mt-0 rounded-2xl border border-gray-500">
                        <input onChange={(e) => setSearchItem(e.target.value)} className="outline-none bg-gray-100 rounded-2xl w-full p-2" type="text" />
                        <FaSearch className="bg-gray-100 mr-2" />
                    </div>
                </div>
                { isLoading ? <p className="text-xl font-medium animate-pulse">Loading please wait...</p> :
                 lists?.length < 1 && <p className="text-xl font-medium animate-pulse">No feedback from users yet</p> }
                <div className="mt-5 md:h-[31rem] h-[600px]">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Message</th>
                            </tr>
                            { (searchItem !== '' ? feedbacks : lists)?.sort((a,b) => Number(b.createdAt.split('T')[0].split('-').join('')) - Number(a.createdAt.split('T')[0].split('-').join(''))).filter(record => record.user_id.firstName.toLowerCase().includes(searchItem)).map((record,idx) => (
                                record.user_id !== undefined && 
                                <tr className="border border-black" key={idx}>
                                    <td>{record.user_id?.firstName} {record.user_id?.lastName}</td>
                                    <td>{record.feedback}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <Pagination numbers={numbers} setCurrentPage={setCurrentPage} currentPage={currentPage} numberPage={numberPage} />
                </div>
                
            </div>
            
        </div>
    )
}

export default AdminFeedback;
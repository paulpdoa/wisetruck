import { useState,useEffect } from 'react';

const Pagination = ({ numbers,setCurrentPage,currentPage,numberPage }) => {
   
    return (
        <div className="w-full flex gap-2 items-center mt-5 justify-end">
            <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} className="font-semibold">Previous</button>
            { numbers.map((num,idx) => (
                <button onClick={() => setCurrentPage(num)} className={`${currentPage === num ? 'bg-gray-400' : 'bg-gray-200'} border border-gray-800 p-2 w-10 h-10 text-sm font-bold`} key={idx}>{num}</button>
            )) }
            <button onClick={() => currentPage < numberPage && setCurrentPage(currentPage + 1)} className="font-semibold">Next</button>
        </div>
    )
}

export default Pagination;
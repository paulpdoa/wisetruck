import { useState,useEffect } from 'react';
import { TbSpeakerphone } from 'react-icons/tb';

const CustomerNews = () => {
    return (
        <div className="h-screen bg-gray-100 w-full">
            <div className="flex gap-2 items-center border-2 border-gray-400 m-3 justify-center p-3">
                <TbSpeakerphone className="text-4xl" />
                <h1 className="font-medium text-lg">There's no announcement yet</h1>
            </div>

            <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-3xl">News</h1>
            </div>
        </div>
    )
}

export default CustomerNews;
import { useState } from 'react';

const CustomerRecycleCenter = () => {

    const [openMap,setOpenMap] = useState(false);

    const openRecycleCenter = (brgy) => {
        console.log(brgy)
    }

    return (
        <div className="h-screen w-full">
           <div className="bg-green-200 p-5">
                <h1 className="font-semibold text-center text-lg">Rosario, Cavite Recycle Center</h1>
            </div>
            <div className="absolute flex items-center  justify-center h-screen top-0">
                <div className="relative">
                    <img src="/images/rosario_map.png" alt="Rosario Cavite" />

                    <img onClick={() => openRecycleCenter('Sapa III')} className="absolute top-24 left-12 w-8 object-contain bottom-0" src="/images/recycle-icon.png" alt="marker" />
                </div>
            </div>
            {/* <iframe className="w-full h-screen" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30913.563050617948!2d120.84114483421139!3d14.415897721828937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962cfb01290cc9%3A0x64968b6b014208a3!2sRosario%2C%20Cavite!5e0!3m2!1sen!2sph!4v1691404772055!5m2!1sen!2sph" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        </div>
    )
}

export default CustomerRecycleCenter;
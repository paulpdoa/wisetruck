import { useState } from 'react';

const CustomerRecycleCenter = () => {

    return (
        <div className="h-screen w-full">
            <div className="bg-green-700 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-bold text-center text-white md:text-2xl text-lg">Rosario, Cavite Recycle Center</h1>
            </div>
            {/* Working Google Maps with markers / will be used as backup */}
            {/* <iframe src="https://www.google.com/maps/d/u/0/embed?mid=19cOor4sIKOqIT25SjkumAtDr2DObtrQ&ehbc=2E312F" width="640" height="480"></iframe> */}
            {/* Working Atlist maps with markers */}
            {/* <iframe src="https://my.atlist.com/map/80646517-3994-498e-913c-68334abce1af?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="85%" frameborder="0" scrolling="no" allowfullscreen></iframe> */}
            {/* <iframe src="https://my.atlist.com/map/bf6b6cf7-bdad-4f7d-9117-1759b5b2c7c8?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="700px" frameborder="0" scrolling="no" allowfullscreen></iframe> */}
            {/* <iframe src="https://my.atlist.com/map/d81dd3d4-33e8-4e41-85d2-f3a6fbf00fab?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="700px" frameborder="0" scrolling="no" allowfullscreen></iframe> */}
            <iframe src="https://my.atlist.com/map/28c68416-e31e-4fd0-8028-427b29218452?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="700px" loading="lazy" frameborder="0" scrolling="no" allowfullscreen></iframe>
       </div>
    )
}

export default CustomerRecycleCenter;
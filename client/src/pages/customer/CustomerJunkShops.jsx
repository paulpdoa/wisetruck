const CustomerJunkShops = () => {
    return (
        <div className="h-screen w-full">
            <div className="bg-green-500 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-semibold text-gray-900 text-center text-lg">Rosario, Cavite Junk Shops</h1>
            </div>
            {/* Working Google Maps with markers / will be used as backup */}
            {/* <iframe src="https://www.google.com/maps/d/u/0/embed?mid=19cOor4sIKOqIT25SjkumAtDr2DObtrQ&ehbc=2E312F" width="100%" height="85%"></iframe> */}
            {/* Working Atlist maps with markers */}
            {/* <iframe src="https://my.atlist.com/map/ec46811b-0d32-4428-b442-41844df17821?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="85%" frameborder="0" scrolling="no" allowfullscreen></iframe>         */}
            {/* <iframe src="https://my.atlist.com/map/7c3d70a1-b36e-452d-a4a0-496b48efa66f?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="700px" frameborder="0" scrolling="no" allowfullscreen></iframe> */}
            {/* <iframe src="https://my.atlist.com/map/3212a212-de25-410b-be85-5c546ccf3cd2?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="700px" frameborder="0" scrolling="no" allowfullscreen></iframe> */}
            <iframe src="https://my.atlist.com/map/6efc3887-92ad-4de0-8d66-74cc26ade1e2?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="700px" frameborder="0" scrolling="no" allowfullscreen></iframe>
        </div>
    )
}

export default CustomerJunkShops;
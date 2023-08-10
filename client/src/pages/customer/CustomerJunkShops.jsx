const CustomerJunkShops = () => {
    return (
        <div className="h-screen w-full">
           <div className="bg-green-200 p-5">
                <h1 className="font-semibold text-center text-lg">Rosario, Cavite Recycle Center</h1>
            </div>
            {/* Working Google Maps with markers / will be used as backup */}
            {/* <iframe src="https://www.google.com/maps/d/u/0/embed?mid=19cOor4sIKOqIT25SjkumAtDr2DObtrQ&ehbc=2E312F" width="640" height="480"></iframe> */}
            {/* Working Atlist maps with markers */}
            <iframe src="https://my.atlist.com/map/ec46811b-0d32-4428-b442-41844df17821?share=true" allow="geolocation 'self' https://my.atlist.com" width="100%" height="85%" frameborder="0" scrolling="no" allowfullscreen></iframe>        </div>
    )
}

export default CustomerJunkShops;
const CustomerSupport = () => {
    return (
        <div className="w-full bg-green-50 pb-36">
           <div className="bg-green-700 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-bold text-center text-white md:text-2xl text-lg">Help and Support</h1>
            </div>

            <div className="p-5 text-justify flex justify-center mt-24">
                <div className="bg-white border border-gray-800 rounded-lg shadow-lg md:w-1/2 p-5 md:p-9">
                    <h2 className="font-semibold text-gray-800">Application</h2>
                    <ul className="p-2">
                        <li className="list-disc">
                            I am seeing the wrong calendar
                            <li className="list-inside">Are you seeing a calendar that does not reflect the actual collection rounds? Make sure you entered the correct address in your settings.</li>
                            <li className="list-inside">If the address is correct but you still see wrong information, please drop the line so we can take a closer look at it.</li>
                        </li>
                        <li className="list-disc">
                            Some information is wrong or missing.
                            <li className="list-inside">Woops, we’re sorry if an error has crept in or if there is information missing somewhere. Let us know what you found out so we can take a look at it as soon as possible.</li>
                        </li>
                        <li className="list-disc">
                            I am not seeing the recycling park I want.
                            <li className="list-inside"> Would you like to see a different default recycling park? You can easily browse either on junkshop map and recycling center map. If the recycling park you would like to see is not in the list, please contact us</li>
                        </li>
                    </ul>

                    <h2 className="font-semibold text-gray-800 pt-2 border-t-2 border-gray-800">Notifications</h2>
                    <ul className="p-2">
                        <li className="list-disc">
                            I am not receiving pick-up notifications
                            <li className="list-inside">Make sure you tapped the ‘Get Notified’ button in your schedule icons.</li>
                            <li className="list-inside">Please make sure the notifications of the WiseTruck app are allowed in the notification’s settings on your phone.</li>
                            <li className="list-inside">If all this is not helping drop us a line so we can take a closer look at it.</li>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CustomerSupport;
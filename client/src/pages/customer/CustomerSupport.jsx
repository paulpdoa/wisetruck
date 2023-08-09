const CustomerSupport = () => {
    return (
        <div className="h-screen w-full">
            <div className="bg-green-200 p-5">
                <h1 className="font-semibold text-center text-lg">Help and Support</h1>
            </div>

            <div className="p-5 text-justify">
            Application:

I am seeing the wrong calendar.
Are you seeing a calendar that does not reflect the actual collection rounds? Make sure you entered the correct address in your settings.
If the address is correct but you still see wrong information, please drop the line so we can take a closer look at it.

Some information is wrong or missing.
Woops, we’re sorry if an error has crept in or if there is information missing somewhere. Let us know what you found out so we can take a look at it as soon as possible.

I am not seeing the recycling park I want.
Would you like to see a different default recycling park? You can easily browse either on junkshop map and recycling center map. If the recycling park you would like to see is not in the list, please contact us
________________________________________________________________________________
Notifications: 

I am not receiving pick-up notifications
Make sure you tapped the ‘Get Notified’ button in your schedule icons.
Please make sure the notifications of the WiseTruck app are allowed in the notification’s settings on your phone.
If all this is not helping drop us a line so we can take a closer look at it.
            </div>
        </div>
    )
}

export default CustomerSupport;
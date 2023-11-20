const CustomerContact = () => {
    return (
        <div className="h-screen w-full">
            <div className="bg-green-700 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-bold text-center text-white md:text-2xl text-lg">Contact Us</h1>
            </div>

            <div className="p-5 flex justify-center mt-24">
                <div className="bg-white border border-gray-800 rounded-lg shadow-lg md:p-9 p-5 md:w-1/2">
                    <p>In case of any questions or inquiries, you may contact us immediately via through phone and email, we would be happy to answer your questions and set up a meeting with you.</p>
                    <p className="mt-5 font-medium">Phone: 09106736939</p>
                    <p className="font-medium">Email: wisetruckapp@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default CustomerContact;
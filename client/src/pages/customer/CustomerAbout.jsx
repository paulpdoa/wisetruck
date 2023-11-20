const CustomerAbout = () => {
    return (
        <div className="h-screen w-full">
            <div className="bg-green-700 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="font-bold text-center text-white md:text-2xl text-lg">About Us</h1>
            </div>


            <div className="p-5 text-justify flex justify-center mt-24">
                <div className="bg-white m-5 border border-gray-800 rounded-lg shadow-lg md:p-9 p-5 md:w-1/2">
                    <p className="font-semibold">This project was a product of Cavite State University CCAT Campus students with the aims to improve the outmoded way of waste collection of the Rosario, Cavite along with encouraging the community to become completely aware of the importance of waste management all through with the intervention of web-application platform with the help of Rosario’s Municipal on Ecosystems, Environment, and Natural Resources Office (MENRO). Our mission is to empower communities to conserve the environment by learning to sort waste, recycle correctly, and dispose waste properly.</p>                
                </div>
            </div>
        </div>
    )
}

export default CustomerAbout;
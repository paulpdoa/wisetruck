import { Link } from 'react-router-dom';

const CustomerWasteInfo = () => {

    const wasteTypes = [
        {
            title: 'Plastic Waste',
            description: 'Find out how out how can we give our plastic bottles and other packaging a new life',
            photo: '/images/bottle.png',
            path: '/wasteinfo/plasticwaste'
        },
        {
            title: 'Metal Waste',
            description: 'Why steel and aluminium can be recycled endlessly, without any loss of quality.',
            photo: '/images/metal.png',
            path: '/wasteinfo/metalwaste'
        },
        {
            title: 'Glass Waste',
            description: 'Saving energy thanks to recycling. Find out about the whole process from bottle bank to glass factory.',
            photo: '/images/glass.png',
            path: '/wasteinfo/glasswaste'
        },
        {
            title: 'Paper Waste',
            description: 'Learn to recycle paper and cardboards. This way we save natural raw materials',
            photo: '/images/news.png',
            path: '/wasteinfo/paperwaste'
        },
        {
            title: 'Organic Waste',
            description: 'Learn how to properly dispose of biodegradable wastes. This way we lessen air and water pollution, as well as soil contamination.',
            photo: '/images/organic.png',
            path: '/wasteinfo/organicwaste'
        },
        {
            title: 'Medical Waste',
            description: 'Improper disposal of medical waste puts people at risk of exposure to infectious materials.',
            photo: '/images/hospitalwaste.png',
            path: '/wasteinfo/medicalwaste'
        },
        {
            title: 'Electronic Waste',
            description: 'Poor management of e-waste can be unsafe to human and environment. Learn to sort out e-waste from house appliances or disposable devices and more.',
            photo: '/images/trash.png',
            path: '/wasteinfo/electronicwaste'
        }
    ]

    return (
        <div className="w-full h-auto bg-green-50">
            <div className="bg-green-700 p-5 relative">
                <img className="w-10 absolute top-2" src="/images/WiseTruck_Logo.png" alt="Wisetruck Logo" />
                <h1 className="text-center text-3xl font-bold text-white">Waste Types</h1>
            </div>

            <div className="grid grid-cols-2 justify-items-start py-20 gap-5 md:mx-10 mx-5 pb-36">
                { wasteTypes.map((waste,id) => (
                    <Link to={waste.path} key={id} className="grid grid-cols-6 w-full justify-items-center md:gap-5 gap-2 shadow-lg bg-white border border-gray-500 rounded-xl p-2">
                        <div className="bg-green-700 w-7 h-7 md:w-12 md:h-12 col-span-1 flex items-center justify-center rounded-full">
                            <img className="w-auto object-cover" src={waste.photo} alt="glass" />
                        </div>
                        <div className="text-green-700 col-span-5">
                            <h2 className="font-bold md:text-xl text-sm">{waste.title}</h2>
                            <p className="md:text-sm text-xs">{waste.description}</p>
                        </div>
                    </Link>
                )) }
            </div>
        </div>
    )
}

export default CustomerWasteInfo;
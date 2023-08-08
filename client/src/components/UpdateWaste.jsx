import { useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';

const UpdateWaste = ({ closeUpdate,wasteId }) => {

    const [wastePhoto,setWastePhoto] = useState(wasteId.photo);
    const [bestOption,setBestOption] = useState(wasteId.bestOption);
    const [description,setDescription] = useState(wasteId.description);
    const [specialInstruction,setSpecialInstruction] = useState(wasteId.specialInstruction);
    const [name,setName] = useState(wasteId.name);
    const [typeOfWaste,setTypeOfWaste] = useState(wasteId.typeOfWaste);

    const [wastes] = useState(["Glass Waste","Plastic Waste","Paper Waste","Metal Waste","Organice Waste","Electronic Waste"])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            //data.append('wastePhoto',wastePhoto);
            data.append('bestOption',bestOption);
            data.append('description',description);
            data.append('specialInstruction',specialInstruction);
            data.append('typeOfWaste',typeOfWaste);
            data.append('name',name);

            const waste = await axios.patch(`${baseUrl()}/wastes/${wasteId._id}`,data);
            alert(waste.data.mssg);
            navigate(waste.data.redirect);
        } catch(err) {  
            console.log(err);
        }
    }

    const getWastePhoto = (e) => {
        setWastePhoto(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    return (
        <div className="h-screen w-full left-0 flex items-center justify-center bg-opacity-50 absolute top-0 bg-black">
            <div className="border border-gray-900 rounded-md w-1/2 flex items-center flex-col p-2 bg-white">
                <form onSubmit={handleSubmit} className="border border-gray-900 w-full rounded-md flex flex-col gap-3 p-5 relative">
                    <p role="button" className="self-end text-red-500 text-xl" onClick={() => closeUpdate(false)}><AiOutlineCloseCircle /></p>
                    <div className="w-full border-gray-300 border p-2 outline-none relative flex justify-center">
                        {/* <span className={`${wastePhoto !== '' ? 'hidden' : 'flex'} items-center gap-2 text-gray-400`}><HiOutlineUpload />Upload waste photo</span>
                        <input className={`opacity-0 absolute h-full w-full top-0 left-0`} onChange={getWastePhoto} accept='image/*' type="file" name="wastePhoto" required/> */}
                        <img className="object-cover" src={`${baseUrl()}/images/${wastePhoto}`} alt={wastePhoto.name} />
                    </div>
                    <select className="p-2 border border-gray-500 rounded-md outline-none" value={typeOfWaste} onChange={(e) => setTypeOfWaste(e.target.value)} required>
                        <option hidden>Select type of waste</option>
                        { wastes.map((waste,idx) => (
                            <option key={idx} value={waste}>{waste}</option>
                        )) }
                    </select>
                    <div className="p-2 border border-gray-500 rounded-md">
                        <input className="p-2 outline-none text-sm w-full" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Waste name" />
                    </div>
                    <div className="p-2 border border-gray-500 rounded-md">
                        <input className="p-2 outline-none text-sm w-full" type="text" value={bestOption} onChange={(e) => setBestOption(e.target.value)} placeholder="Best Option" />
                    </div>
                    <div className="p-2 border border-gray-500 rounded-md">
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Waste description" className="w-full p-2 outline-none text-sm" required></textarea>
                    </div>
                    <div className="p-2 border border-gray-500 rounded-md">
                        <input className="p-2 outline-none text-sm w-full" type="text" onChange={(e) => setSpecialInstruction(e.target.value)} value={specialInstruction} placeholder="Waste special instructions" />
                    </div>
                    <button className="bg-green-200 w-1/2 self-center rounded-md font-medium">Submit</button>
                </form>  
            </div>
        </div>
    )
}

export default UpdateWaste;
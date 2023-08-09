import { useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';

const AddWaste = ({ closeUpdate,wasteId }) => {

    const [wastePhoto,setWastePhoto] = useState('');
    const [bestOption,setBestOption] = useState('');
    const [description,setDescription] = useState('');
    const [specialInstruction,setSpecialInstruction] = useState('');
    const [name,setName] = useState('');
    const [typeOfWaste,setTypeOfWaste] = useState('');

    const [wastes] = useState(["Glass Waste","Plastic Waste","Paper Waste","Metal Waste","Organice Waste","Electronic Waste"])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('wastePhoto',wastePhoto);
            data.append('bestOption',bestOption);
            data.append('description',description);
            data.append('specialInstruction',specialInstruction);
            data.append('typeOfWaste',typeOfWaste);
            data.append('name',name);

            const waste = await axios.post(`${baseUrl()}/wastes`,data);
            alert(waste.data.mssg);
            navigate(waste.data.redirect);
        } catch(err) {  
            console.log(err);
        }
    }

    const getWastePhoto = (e) => {
        setWastePhoto(e.target.files[0]);
    }

    return (
        <div className="mt-10 flex items-center gap-5 justify-around">
            <div className="border border-gray-900 rounded-md w-1/2 flex items-center flex-col p-2 bg-white">
                <form onSubmit={handleSubmit} className="w-full rounded-md flex flex-col gap-3 p-5 relative">
                    <div className="w-full border-gray-300 border h-8 outline-none relative flex justify-center">
                        <span className={`${wastePhoto !== '' ? 'hidden' : 'flex'} items-center gap-2 text-gray-400`}><HiOutlineUpload />Upload waste photo</span>
                        <input className={`${wastePhoto!== '' ? 'opacity-100' : ''} opacity-0 absolute h-full w-full top-0 left-0`} onChange={getWastePhoto} accept='image/*' type="file" name="wastePhoto" required/>
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

export default AddWaste;
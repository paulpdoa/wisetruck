import { useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';

const UpdateNews = ({ closeUpdate,newsId }) => {

    const [newsPhoto,setNewsPhoto] = useState(newsId.photo);
    const [description,setDescription] = useState(newsId.description);
    const [title,setTitle] = useState(newsId.title);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const news = await axios.patch(`${baseUrl()}/news/${newsId._id}`,{ title,description });
            alert(news.data.mssg);
            navigate(news.data.redirect);
        } catch(err) {  
            console.log(err);
        }
    }

    return (
        <div className="h-screen w-full left-0 flex items-center justify-center bg-opacity-50 absolute top-0 bg-black">
            <div className="border border-gray-900 rounded-md w-1/2 flex items-center flex-col p-2 bg-white">
                <form onSubmit={handleSubmit} className="border border-gray-900 w-full rounded-md flex flex-col gap-3 p-5 relative">
                    <p role="button" className="self-end text-red-500 text-xl" onClick={() => closeUpdate(false)}><AiOutlineCloseCircle /></p>
                    <div className="w-full border-gray-300 border p-2 outline-none relative flex justify-center">
                        {/* <span className={`${wastePhoto !== '' ? 'hidden' : 'flex'} items-center gap-2 text-gray-400`}><HiOutlineUpload />Upload waste photo</span>
                        <input className={`opacity-0 absolute h-full w-full top-0 left-0`} onChange={getWastePhoto} accept='image/*' type="file" name="wastePhoto" required/> */}
                        <img className="object-cover w-32" src={`${baseUrl()}/images/${newsPhoto}`} alt={newsPhoto.title} />
                    </div>
                    
                    <div className="p-2 border border-gray-500 rounded-md">
                        <input className="p-2 outline-none text-sm w-full" type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Waste title" />
                    </div>
                    
                    <div className="p-2 border border-gray-500 rounded-md">
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Waste description" className="w-full p-2 outline-none text-sm" required></textarea>
                    </div>
                   
                    <button className="bg-green-200 w-1/2 self-center rounded-md font-medium">Submit</button>
                </form>  
            </div>
        </div>
    )
}

export default UpdateNews;
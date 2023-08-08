import { useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';

const AddNews = ({ closeNews }) => {

    const [newsPhoto,setNewsPhoto] = useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const navigate = useNavigate();


    const getNewsPhoto = (e) => {
        setNewsPhoto(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('newsPhoto',newsPhoto);
            data.append('title',title);
            data.append('description',description);

          if(description !== '' && newsPhoto !== '') {
            const news = await axios.post(`${baseUrl()}/news`,data);
            alert(news.data.mssg);
            navigate(news.data.redirect);
          }
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <div className="h-screen w-full flex items-center justify-center bg-opacity-50 absolute top-0 bg-white">
            <form onSubmit={handleSubmit} className="border border-gray-900 w-1/2 rounded-md flex flex-col gap-3 p-5 relative bg-white">
                <button className="self-end text-red-500 text-xl" onClick={() => closeNews(false)}><AiOutlineCloseCircle /></button>
                <div className="w-full border-gray-300 border p-2 outline-none relative">
                    <span className={`${newsPhoto !== '' ? 'hidden' : 'flex'} items-center gap-2 text-gray-400`}><HiOutlineUpload />Upload news photo</span>
                    <input className={`${newsPhoto !== '' ? 'opacity-100' : 'opacity-0 absolute h-full w-full'} top-0 left-0`} onChange={getNewsPhoto} accept='image/*' type="file" name="newsPhoto" />
                </div>
                <div className="p-2 border border-gray-500 rounded-md">
                    <input className="p-2 outline-none text-sm" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </div>
                <div className="p-2 border border-gray-500 rounded-md">
                    <textarea onChange={(e) => setDescription(e.target.value)} placeholder="News description" className="w-full p-2 outline-none text-sm" required></textarea>
                </div>   
                <button className="bg-green-200 w-1/2 self-center rounded-md font-medium">Submit</button>
            </form>  
        </div>
    )
}

export default AddNews;
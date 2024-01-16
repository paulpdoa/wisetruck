import { useState } from 'react';
import axios from 'axios';
import provinces from '../../json/refprovince.json';
import barangays from '../../json/refbrgy.json';
import cities from '../../json/refcitymun.json';

import { baseUrl } from '../../baseUrl';
import SuccessMssg from '../../components/SuccessMssg';

import { IoEyeOutline,IoEyeOffOutline  } from "react-icons/io5";

const AdminSignup = () => {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');    
    const [province,setProvince] = useState('Cavite');
    const [city,setCity] = useState('');
    const [barangay,setBarangay] = useState('');
    
    const [provCode,setProvCode] = useState('0421');  
    const [cityCode,setCityCode] = useState('');

    const [message,setMessage] = useState('');
    const [redirect,setRedirect] = useState('');
    const [isRegistered,setIsRegistered] = useState(false);

    const [isHiddenPass,setIsHiddenPass] = useState(true);
    const [isHiddenConfirmPass,setIsHiddenConfirmPass] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       try {         
            const postAdmin = await axios.post(`${baseUrl()}/admin`, { firstName,lastName,userName,password,confirmPassword,province,city,barangay });
            setIsRegistered(!isRegistered);
            setMessage(postAdmin.data.mssg);
            setRedirect(postAdmin.data.redirect);

       } catch(err) {
            console.log(err);
            alert(err.response.data.mssg);
       }
        
    }


    const selectProvince = (provName) => {

        let provinceNameFormat = '';        
        const provinceCode = provinces.RECORDS.filter(province => province.provCode === provName).map(province => province.provCode);
        setProvCode(provinceCode[0]);
       
        const provinceName = provinces.RECORDS.filter(province => province.provCode === provName)[0].provDesc;
        for(let i = 1; i < provinceName.length; i++) {
            provinceNameFormat += provinceName[i].toLowerCase();
        }
        setProvince(provinceName[0] + provinceNameFormat);
      }
    
      const selectCity = (cityName) => {
        let firstUpper = cityName[0];
    
        for(let i = 1; i < cityName.length; i++) {
            firstUpper += cityName[i].toLowerCase();
        }
          setCity(firstUpper);
          const cityCode = cities.RECORDS.filter(city => city.citymunDesc === cityName && city.provCode === provCode).map(city => city.citymunCode);
          setCityCode(cityCode[0]);
      }

      

    return (
        <div className="relative flex items-center justify-center">
        
            
            <form className="w-full md:w-1/2 px-14" onSubmit={handleSubmit}>
                <h1 className="font-semibold text-xl md:text-2xl mt-5">Register Admin Here!</h1>

                <div className="flex flex-col gap-2 mt-5">
                    <input onChange={(e) => setFirstName(e.target.value)} value={firstName} className="w-full border-gray-300 border p-2 outline-none" type="text" placeholder="Firstname:" />
                    <input onChange={(e) => setLastName(e.target.value)} value={lastName} className="w-full border-gray-300 border p-2 outline-none" type="text" placeholder="Lastname:" />
                    <input onChange={(e) => setUserName(e.target.value)} value={userName} className="w-full border-gray-300 border p-2 outline-none" type="text" placeholder="Username:" />
                    
                    <div className="flex items-center p-2 border border-gray-300 bg-white">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full h-full outline-none" type={isHiddenPass ? "password" : "text"} placeholder="Password:" />
                        <p role="button" onClick={() => setIsHiddenPass(!isHiddenPass)}>{ !isHiddenPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                    </div>
                    <div className="flex items-center p-2 border border-gray-300 bg-white">
                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="w-full h-full outline-none" type={isHiddenConfirmPass ? "password" : "text"} placeholder="Confirm Password:" /> 
                        <p role="button" onClick={() => setIsHiddenConfirmPass(!isHiddenConfirmPass)}>{ !isHiddenConfirmPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                    </div>
                    
                    {/* <select onChange={(e) => selectProvince(e.target.value)} className="w-full border-gray-300 border p-2 outline-none" required>
                        <option hidden>Select Province first</option>
                        { provinces.RECORDS.sort((a,b) =>{
                                if (a.provDesc < b.provDesc) {
                                return -1;
                                }
                                if (a.provDesc > b.provDesc) {
                                return 1;
                                }
                                return 0;
                        }).map((province) => (
                            <option key={province.id} value={ province.provCode }>{ province.provDesc[0]+province.provDesc.slice(1,province.provDesc.length).toLowerCase() }</option>
                        )) }
                    </select> */}
                    <div className="w-full bg-white border-gray-300 border p-2 outline-none">Cavite</div>
                    { province === '' ? <p className="w-full border-gray-300 border p-2 outline-none text-gray-400">Select province first</p> : <select value={city.toUpperCase()} onChange={(e) => selectCity(e.target.value)} className="w-full border-gray-300 border p-2 outline-none" required>
                        <option hidden>Municipality</option>
                        { cities.RECORDS.sort((a,b) => {
                            if (a.citymunDesc < b.citymunDesc) {
                                return -1;
                                }
                                if (a.citymunDesc > b.citymunDesc) {
                                return 1;
                                }
                                return 0;
                        }).filter(city => city.provCode === provCode).map((city) => (
                            <option key={city.id} value={ city.citymunDesc }>{ city.citymunDesc[0]+city.citymunDesc.slice(1,city.citymunDesc.length).toLowerCase() }</option> 
                        )) }
                    </select> }

                    { city === '' ? <p className="w-full border-gray-300 border p-2 outline-none text-gray-400">Select city first</p> :<select value={barangay} onChange={(e) => setBarangay(e.target.value)} className="w-full border-gray-300 border p-2 outline-none" required>
                        <option hidden>Select your barangay</option>
                        { barangays.RECORDS.sort((a,b) => {
                            if (a.brgyDesc < b.brgyDesc) {
                                return -1;
                                }
                                if (a.brgyDesc > b.brgyDesc) {
                                return 1;
                                }
                                return 0;
                        }).filter(barangay => barangay.citymunCode === cityCode).map((barangay) => (
                            <option key={barangay.id} value={ barangay.brgyDesc }>{ barangay.brgyDesc }</option>
                        )) }
                    </select> }
                    

                    <div className="flex justify-center gap-2">
                        <button className="self-center font-semibold bg-green-200 w-1/2 bg-green-600 text-white text-center rounded-full mt-3">Submit</button>
                    </div>
                </div> 
            </form>
            { isRegistered && <SuccessMssg message={message} redirect={redirect} closeMessage={setIsRegistered} /> }
        </div>
    )
}

export default AdminSignup;
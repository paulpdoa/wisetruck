import { useState } from 'react';
import axios from 'axios';
import provinces from '../json/refprovince.json';
import barangays from '../json/refbrgy.json';
import cities from '../json/refcitymun.json';
import { HiOutlineUpload } from 'react-icons/hi';
import { baseUrl } from '../baseUrl';
import SuccessMssg from '../components/SuccessMssg';
import { IoEyeOutline,IoEyeOffOutline  } from "react-icons/io5";

const Signup = () => {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [middleName,setMiddleName] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');    
    const [province,setProvince] = useState('Cavite');
    const [city,setCity] = useState('');
    const [barangay,setBarangay] = useState('');
    const [typeOfUser] = useState('customer');
    const [isApproved] = useState(false);
    const [validId,setValidId] = useState('');

    const [provCode,setProvCode] = useState('0421');  
    const [cityCode,setCityCode] = useState('');

    const [isNextPage,setIsNextPage] = useState(false);

    const [message,setMessage] = useState('');
    const [redirect,setRedirect] = useState('');
    const [isRegistered,setIsRegistered] = useState(false);

    const [isHiddenPass,setIsHiddenPass] = useState(true);
    const [isHiddenConfirmPass,setIsHiddenConfirmPass] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

       try {
            const data = new FormData();
            data.append('firstName',firstName);
            data.append('lastName',lastName);
            data.append('middleName',middleName);
            data.append('typeOfUser',typeOfUser);
            data.append('email',email);
            data.append('phoneNumber',phoneNumber);
            data.append('isApproved',isApproved);
            data.append('password',password);
            data.append('confirmPassword',confirmPassword)
            data.append('province',province);
            data.append('barangay',barangay);
            data.append('city',city);
            data.append('idCard',validId);

            const postUser = await axios.post(`${baseUrl()}/users`, data);
            setIsRegistered(!isRegistered);
            setMessage(postUser.data.mssg);
            setRedirect(postUser.data.redirect);

       } catch(err) {
            alert(err.response.data.mssg);
       }
        
    }

    const validateFirstPage = () => {
        if(firstName === '') {
            alert('First name cannot be null');
        } else if(firstName.length < 1) {
            alert('First name cannot be less than 1 character');
        } else if(lastName === '') {
            alert('Last name cannot be null');
        } else if(middleName === '') {
            alert('Middle name cannot be null');
        } else if(password === '') {
            alert('Password cannot be null');
        } else if(password.length < 8) {
            alert('Password cannot be less than 8 characters');
        } else if(confirmPassword === '') {
            alert('Confirm Password cannot be null');
        } else if(password !== confirmPassword) {
            alert('Password doesn\'t match')
        } else {
            setIsNextPage(true);
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

    const getValidId = (e) => {
        setValidId(e.target.files[0]);
    }

    return (
        <div className="relative h-screen bg-green-50 flex items-center justify-center overflow-hidden pb-36 md:pb-0">
            <div className="md:w-1/2 w-full md:relative md:bg-white md:p-5 md:rounded-lg md:border md:border-gray-800 px-14">
                <form className="z-20" onSubmit={handleSubmit}>
                    <h1 className="font-semibold text-green-700 text-xl">Register here!</h1>

                    { !isNextPage ? 
                    <div className="flex flex-col gap-2 mt-5">
                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName} className="w-full border-gray-300 border p-2 outline-none z-50" type="text" placeholder="Firstname:" />
                        <input onChange={(e) => setLastName(e.target.value)} value={lastName} className="w-full border-gray-300 border p-2 outline-none z-50" type="text" placeholder="Lastname:" />
                        <input onChange={(e) => setMiddleName(e.target.value)} value={middleName} className="w-full border-gray-300 border p-2 outline-none z-50" type="text" placeholder="Middlename:" />
                        <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="w-full border-gray-300 border p-2 outline-none z-50" type="text" placeholder="Phone no.:" />
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border-gray-300 border p-2 outline-none z-50" type="email" placeholder="Email Address:" />
                        <div className="flex items-center p-2 border border-gray-300 bg-white">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full h-full outline-none z-50" type={isHiddenPass ? "password" : "text"} placeholder="Password:" />
                            <p role="button" onClick={() => setIsHiddenPass(!isHiddenPass)}>{ !isHiddenPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                        </div>
                        <div className="flex items-center p-2 border border-gray-300 bg-white">
                            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="w-full h-full outline-none z-50" type={isHiddenConfirmPass ? "password" : "text"} placeholder="Confirm Password:" /> 
                            <p role="button" onClick={() => setIsHiddenConfirmPass(!isHiddenConfirmPass)}>{ !isHiddenConfirmPass ? <IoEyeOutline /> : <IoEyeOffOutline />}</p>
                        </div>
                        
                        <p onClick={validateFirstPage} className="bg-green-700 text-white text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full text-center z-50" role='button'>Next</p>
                    </div> : 
                    <div className="flex flex-col gap-2 mt-5">
                        {/* <select onChange={(e) => selectProvince(e.target.value)} className="w-full border-gray-300 border p-2 outline-none z-50" required>
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
                                <option key={province.id} value={"0421"}>Cavite</option>
                            )) }
                        </select> */}
                        <div className="w-full bg-white border-gray-300 border p-2 outline-none z-50">Cavite</div>
                        { province === '' ? <p className="w-full bg-white border-gray-300 border p-2 outline-none text-gray-400 z-50">Select province first</p> : <select value={city.toUpperCase()} onChange={(e) => selectCity(e.target.value)} className="w-full border-gray-300 border p-2 outline-none z-50" required>
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

                        { city === '' ? <p className="w-full bg-white border-gray-300 border p-2 outline-none text-gray-400 z-50">Select city first</p> :<select value={barangay} onChange={(e) => setBarangay(e.target.value)} className="w-full border-gray-300 border p-2 outline-none z-50" required>
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
                        <span className="text-xs text-green-500">Brgy. ID, Voter's ID, Passport ID, or National ID is needed for ID uploads</span>
                        <div className="w-full border-gray-300 border p-2 outline-none relative z-50 bg-white">
                            <span className={`${validId !== '' ? 'hidden' : 'flex'} items-center gap-2 text-gray-400`}><HiOutlineUpload />Upload your ID</span>
                            <input className={`${validId !== '' ? 'opacity-100' : 'opacity-0 absolute h-full w-full'} top-0 left-0`} onChange={getValidId} accept='image/*' type="file" name="idCard" />
                        </div>

                        <div className="flex gap-2 z-50">
                            <p onClick={() => setIsNextPage(!isNextPage)} className="bg-green-700 text-white text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 text-center rounded-full" role='button'>Back</p>
                            <button className="bg-green-700 text-white text-lg font-normal border mt-3 border-gray-800 w-1/2 self-center p-2 rounded-full">Submit</button>
                        </div>
                    </div>
                    }
                </form>
                
            </div>
            <img className="absolute bottom-0 -right-12 z-0" src="/images/WiseTruck_Logo.png" alt="Logo" />
            { isRegistered && <SuccessMssg message={message} redirect={redirect} closeMessage={setIsRegistered} /> }
        </div>
    )
}

export default Signup;
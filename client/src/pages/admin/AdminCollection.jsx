import { useState } from 'react';
import { RECORDS } from '../../json/refbrgy.json';

const AdminCollection = () => {

    const provinceCode = '0421';
    const cityCode = '042117';

    const barangays = RECORDS;
    const brgyRosario = barangays.filter((barangay => barangay.provCode === provinceCode && barangay.citymunCode === cityCode));

    return (
        <div className="p-10">
            <select className="p-2 w-1/4 outline-none border border-gray-500">
                <option hidden>Choose Barangay</option>
                { brgyRosario.map((brgy,idx) => (
                    <option key={idx} value={brgy.brgyDesc}>{brgy.brgyDesc}</option>
                )) }
            </select>
        </div>
    )
}

export default AdminCollection;
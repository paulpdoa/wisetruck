import { Outlet,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CollectorLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('collectorToken');

    useEffect(() => {
        if(token === null) {
            navigate('/collector/login');
        }
    },[])

    return (
        <div className="h-screen">
            <Outlet />
        </div>
    )
}

export default CollectorLayout
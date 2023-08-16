import axios from 'axios';
import { useEffect, useState } from 'react';

export const fetchApiHook = (url) => {

   const [records,setRecords] = useState([]);
   const [isLoading,setIsLoading] = useState(false);

   useEffect(() => {
      const abortCont = new AbortController();
      const signal = abortCont.signal;

      const fetchData = async () => {
         setIsLoading(true);
         try {
            const data = await axios.get(url,{ signal });
            setIsLoading(false);
            records.length > 1 ? setRecords(records => [...records,data.data]) : setRecords(data.data);
         } catch(err) {
            console.log(err);
         }
      }
      fetchData();
      
      return () => abortCont.abort();
   },[url])
  
   return { records, isLoading } 
   
}
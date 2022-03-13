import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data,setData] = useState(null); // at first let `data` be null, after fetching data we will update it
    const [isPending, setIsPending] = useState(true); // will determine if our data is pending(not yet fetched) or not
    const [error, setError] = useState(null); // helps print the error on screen

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{ //just to make it more realistic
            fetch(url, {signal: abortCont.signal} ).then(
            res => {
                if(!res.ok){
                    throw Error('could not fetch data for the resource');
                }
                return res.json();
            }).then(
                data => {
                    setIsPending(false);
                    setData(data);
                    setError(null);
                }
            ).catch(err => {
                if(err.name==="AbortError"){
                    console.log('fetch request Aborted')
                }
                else{
                    setIsPending(false); // if there is an error while loading don't show loading message
                    setError(err.message);
                }
            })  
        }, 1000);

        {/*cleanup*/}
        return () => abortCont.abort();
    },[url]);

    return { data, isPending, error };
}

export default useFetch;
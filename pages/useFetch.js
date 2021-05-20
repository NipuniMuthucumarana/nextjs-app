import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [users, setUsers] = useState("");
    useEffect(async () => {
        const abortCont = new AbortController() 
        try {
            const response = await fetch(url, { signal: abortCont.signal });
            const jsonData = await response.json();
            setUsers(jsonData);
            
        } catch (err) {
            console.error(err.message)
        }
        return () => abortCont.abort();
    }, [url])

    return { users }
}

export default useFetch;
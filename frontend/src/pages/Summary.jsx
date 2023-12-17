import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Summary= () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams()
    useEffect(()=>{
        (async function(){
            const res = await fetch(`http://localhost:4000/api/semester/${params.id}`,{
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
            console.log(data)
        }())
    }, [params.id])

    return (
        <div>
            <button onClick={()=>setSearchParams({dept: 'csm'})}>button</button>
        </div>
    )
}

export default Summary;
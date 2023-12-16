import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const AlphaList= () => {
    const [semScheds, setSemScheds] = useState([])
    const params = useParams()
    useEffect(()=>{
        (async function(){
            const res = await fetch(`http://localhost:4000/api/semester/${params.id}/`,{
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
            console.log(data)
            setSemScheds(data)
        }())
    }, [params.id])

    return (
        <div>
            {
                semScheds.length > 0 ? (
                    semScheds.map((sched)=>{
                        <div>
                            {sched}
                        </div>
                    })
                ):(
                    <div>
                        THIS IS EMPTY
                    </div>
                )
            }
        </div>
    )
}

export default AlphaList;
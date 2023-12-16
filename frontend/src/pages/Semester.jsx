import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SemNavBar from "../components/SemNavBar.jsx";
import Summary from "./Summary";
import Faculty from "./Faculty.jsx";
import Bloc from "./Bloc.jsx";
import AlphaList from "./AlphaList.jsx";

const Semester= () => {
    const params = useParams()
    return (
        <>
        <SemNavBar semId={params.id}/>
        {
            function(path){
                switch(path){
                    case "summary":
                        return <Summary/>
                    case "faculty":
                        return <Faculty/>
                    case "bloc":
                        return <Bloc/>
                    case "alphalist":
                        return <AlphaList/>
                    default:
                        return <Summary/>
                }
            }(params.path)
        }
        </>
    )
}

export default Semester;
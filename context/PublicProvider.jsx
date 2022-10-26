import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useRouter } from "next/router";

const PublicContext = createContext();

export const PublicProvider = ({children}) => {
    const [ animationActive, setAnimationActive ] = useState(false);
    const [ primerPregunta, setPrimerPregunta ] = useState(false);

    const router = useRouter();

    const validate = async () => {
        try{
            await clienteAxios.get(`projects/validate/data`);
            if(window.location.pathname.split("/")[2] === undefined){
                router.push("/admin/projects");
            }
        } catch(error){
            router.push("/admin");
        }
    }

    return(
        <PublicContext.Provider value={{
            // State
            animationActive,
            primerPregunta,
            setAnimationActive,
            setPrimerPregunta,
            // Functions
            validate
        }}>
            {children}
        </PublicContext.Provider>
    )
};

export default PublicContext;
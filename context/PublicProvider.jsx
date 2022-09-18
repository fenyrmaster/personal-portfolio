import { createContext, useState } from "react";

const PublicContext = createContext();

export const PublicProvider = ({children}) => {
    const [ animationActive, setAnimationActive ] = useState(false);
    const [ primerPregunta, setPrimerPregunta ] = useState(false);

    return(
        <PublicContext.Provider value={{
            animationActive,
            primerPregunta,
            setAnimationActive,
            setPrimerPregunta
        }}>
            {children}
        </PublicContext.Provider>
    )
};

export default PublicContext;
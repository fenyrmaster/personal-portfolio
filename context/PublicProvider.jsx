import { createContext, useState } from "react";

const PublicContext = createContext();

export const PublicProvider = ({children}) => {
    const [ animationActive, setAnimationActive ] = useState(false);

    return(
        <PublicContext.Provider value={{
            animationActive,
            setAnimationActive,
        }}>
            {children}
        </PublicContext.Provider>
    )
};

export default PublicContext;
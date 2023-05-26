import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const BlogContext = createContext();

export const BlogProvider = ({children}) => {
    const [ entries, setEntries ] = useState([]);
    const [ entryDelete, setEntryDelete ] = useState({});
    const [ createEntry, setCreateEntry ] = useState({
        nombre: "",
        intro: "",
        time: "",
        image: null,
        postDate: "",
        text: [  {
            type: "paragraph",
            children: [
              { text: "Its time to write some text..." }
            ]
          }],
    });

    // Used to get all the blog entries of the portfolio
    const getEntries = async () => {
        try{
            const proyectos = await clienteAxios.get("/projects");
            setProjects(proyectos.data.data);
        } catch(error){
            console.log(error);
        }
    }

    return(
        <BlogContext.Provider value={{
            //states
            entries,
            entryDelete,
            createEntry,
            //functions
            setEntries,
            setCreateEntry
        }}>
            {children}
        </BlogContext.Provider>
    )
};

export default BlogContext;
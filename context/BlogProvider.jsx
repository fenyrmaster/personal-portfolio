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
            const entries = await clienteAxios.get("/blog");
            setEntries(entries.data.data);
        } catch(error){
            console.log(error);
        }
    }

    const newEntryDB = async (data, setNewSkill, setFormLoading) => {
        try{
            let form = new FormData();
            let newText = JSON.stringify(data.text);
            form.append("nombre", data.nombre);
            form.append("intro", data.intro);
            form.append("time", data.time);
            form.append("postDate", data.postDate);
            form.append("imagenPortada", data.image);
            form.append("text", newText);
            await clienteAxios.post("/blog", form);
            Swal.fire({
                title: "Success",
                text: "Project created successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            setFormLoading(false);
            setNewSkill(false);
            getEntries();
            setCreateEntry({
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
            })
        } catch(error){
            setFormLoading(false);
            console.error(error);
            
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
            setCreateEntry,
            newEntryDB
        }}>
            {children}
        </BlogContext.Provider>
    )
};

export default BlogContext;
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

    const deleteEntry = async () => {
        try{
            await clienteAxios.delete(`/blog/${entryDelete._id}`);
            let bridge = entries.filter(entry => entry._id !== entryDelete._id);
            Swal.fire({
                title: "Success",
                text: "Entry deleted successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            setEntries(bridge);
            setEntryDelete({});
        } catch(error){
            setProjectDelete({});
            console.error(error);
        }
    }

    const editEntryDB = async (setNewEntry, setFormLoading, setEditEntry, entryId) => {
        try{
            let form = new FormData();
            let newText = JSON.stringify(createEntry.text);
            form.append("nombre", createEntry.nombre);
            form.append("intro", createEntry.intro);
            form.append("time", createEntry.time);
            form.append("postDate", createEntry.postDate);
            form.append("text", newText);
            if(createEntry.image){
                form.append("imagenPortada", createEntry.image);
            }
            await clienteAxios.patch(`/blog/${entryId}`, form);
            Swal.fire({
                title: "Success",
                text: "Project edited successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            setFormLoading(false);
            setNewEntry(false);
            setEditEntry(false);
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
            });
        } catch(error){
            setFormLoading(false);
            setEditEntry(false);
            console.error(error);
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
            newEntryDB,
            setEntryDelete,
            deleteEntry,
            editEntryDB
        }}>
            {children}
        </BlogContext.Provider>
    )
};

export default BlogContext;
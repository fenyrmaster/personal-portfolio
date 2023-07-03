import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    const [ projects, setProjects ] = useState([]);
    const [ projectDelete, setProjectDelete ] = useState({});
    const [ createProject, setCreateProject ] = useState({
        nombre: "",
        image: null,
        focus: "Full Stack",
        usage: "Learning Project",
        text: [  {
            type: "paragraph",
            children: [
              { text: "Its time to write some text..." }
            ]
          }],
        completionDate: "",
        technologies: [],
        githubUrl: "",
        liveUrl: "",
        gallery: []
    });

    const obtenerProyectos = async () => {
        try{
            const proyectos = await clienteAxios.get("/projects");
            setProjects(proyectos.data.data);
        } catch(error){
        }
    }

    const crearProyecto = async (data, setNewSkill, setFormLoading) => {
        try{
            let form = new FormData();
            let newText = JSON.stringify(data.text);
            form.append("nombre", data.nombre);
            form.append("focus", data.focus);
            form.append("usage", data.usage);
            form.append("imagenPortada", data.image);
            form.append("completionDate", data.completionDate);
            form.append("technologies", data.technologies);
            form.append("githubUrl", data.githubUrl);
            form.append("liveUrl", data.liveUrl);
            form.append("text", newText);
            let datos = data.gallery;
            Array.from(datos).map(el => form.append("imagenes", el));
            await clienteAxios.post("/projects", form);
            Swal.fire({
                title: "Success",
                text: "Project created successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            setFormLoading(false);
            setNewSkill(false);
            obtenerProyectos();
            setCreateProject({
                nombre: "",
                image: null,
                focus: "Full Stack",
                usage: "Learning Project",
                text: [  {
                    type: "paragraph",
                    children: [
                      { text: "Its time to write some text..." }
                    ]
                  }],
                completionDate: "",
                technologies: [],
                githubUrl: "",
                liveUrl: "",
                gallery: []
            })
        } catch(error){
            setFormLoading(false);
            console.error(error);
            
        }
    }
    const editarProyecto = async (data, setNewSkill, setFormLoading, setEdit, projectId) => {
        try{
            let form = new FormData();
            let newText = JSON.stringify(data.text);
            form.append("nombre", data.nombre);
            form.append("focus", data.focus);
            form.append("usage", data.usage);
            form.append("completionDate", data.completionDate);
            form.append("technologies", data.technologies);
            form.append("githubUrl", data.githubUrl);
            form.append("liveUrl", data.liveUrl);
            form.append("text", newText);
            let datos;
            if(data.gallery){
                datos = data.gallery;
                Array.from(datos).map(el => form.append("imagenes", el));
            }
            if(data.image){
                form.append("imagenPortada", data.image);
            }
            await clienteAxios.patch(`/projects/${projectId}`, form);
            Swal.fire({
                title: "Success",
                text: "Project edited successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            setFormLoading(false);
            setNewSkill(false);
            setEdit(false);
            obtenerProyectos();
            setCreateProject({
                nombre: "",
                image: null,
                focus: "Full Stack",
                usage: "Learning Project",
                text: [  {
                    type: "paragraph",
                    children: [
                      { text: "Its time to write some text..." }
                    ]
                  }],
                completionDate: "",
                technologies: [],
                githubUrl: "",
                liveUrl: "",
                gallery: []
            })
        } catch(error){
            setFormLoading(false);
            setEdit(false);
            console.error(error);
        }
    }
    const borrarProyecto = async id => {
        try{
            let bridge = projects.filter(skill => skill._id !== id);
            await clienteAxios.delete(`/projects/${id}`);
            Swal.fire({
                title: "Success",
                text: "Project deleted successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            setProjects(bridge);
            setProjectDelete({});
        } catch(error){
            setProjectDelete({});
            console.error(error);
        }
    }

    const enviarEmails = async data => {
        await clienteAxios.post(`projects/email`, data);
        Swal.fire({
            title: "Success",
            text: "Messagen send successfully",
            icon: "success",
            confirmButtonColor: "#ffcc00"
        })
    }

    return(
        <ProjectContext.Provider value={{
            //states
            projects,
            createProject,
            projectDelete,
            setProjectDelete,
            setCreateProject,
            setProjects,
            //functions
            crearProyecto,
            obtenerProyectos,
            borrarProyecto,
            editarProyecto,
            enviarEmails
        }}>
            {children}
        </ProjectContext.Provider>
    )
};

export default ProjectContext;
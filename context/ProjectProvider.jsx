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
            console.log(error);
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
    const editarSkill = async (data, setNewSkill, setFormLoading, setSkillLevel) => {
        try{
            let bridge;
            let form = new FormData();
            form.append("nombre", data.nombre);
            form.append("level", data.level);
            form.append("role", data.role);
            if(data.image.size){
                form.append("image", data.image);
            }
            const editedSkill = await clienteAxios.patch(`/skills/${data._id}`, form);
            Swal.fire({
                title: "Success",
                text: "Skill edited successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            bridge = skills.map(skill => skill._id !== data._id ? skill : editedSkill.data.data);
            setSkills(bridge);
            setNewSkill(false);
            setFormLoading(false);
            setSkillLevel(false);
        } catch(error){
            console.error(error);
            setFormLoading(false);
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
            borrarProyecto
        }}>
            {children}
        </ProjectContext.Provider>
    )
};

export default ProjectContext;
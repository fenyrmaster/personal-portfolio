import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const SkillsContext = createContext();

export const SkillsProvider = ({children}) => {
    const [ skills, setSkills ] = useState([]);
    const [ skillDelete, setSkillDelete ] = useState({});
    const [ skill, setSkill ] = useState({});

    const obtenerSkills = async () => {
        try{
            const skills = await clienteAxios.get("/skills");
            setSkills(skills.data.data);
        } catch(error){
            console.log(error);
        }
    }

    const crearSkill = async (data, setNewSkill, setFormLoading) => {
        try{
            let bridge = skills;
            let form = new FormData();
            form.append("nombre", data.nombre);
            form.append("level", data.level);
            form.append("role", data.role);
            form.append("image", data.image);
            const newSkill = await clienteAxios.post("/skills", form);
            Swal.fire({
                title: "Success",
                text: "Skill created successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            bridge.push(newSkill.data.data);
            setSkills(bridge);
            setNewSkill(false);
            setFormLoading(false);
        } catch(error){
            console.error(error);
            setFormLoading(false);
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
    const borrarSkill = async id => {
        try{
            let bridge = skills.filter(skill => skill._id !== id);
            await clienteAxios.delete(`/skills/${id}`);
            Swal.fire({
                title: "Success",
                text: "Skill deleted successfully",
                icon: "success",
                confirmButtonColor: "#ffcc00"
            });
            setSkills(bridge);
        } catch(error){
            console.error(error);
        }
    }

    return(
        <SkillsContext.Provider value={{
            skills,
            skillDelete,
            skill,
            setSkills,
            setSkillDelete,
            setSkill,
            obtenerSkills,
            crearSkill,
            editarSkill,
            borrarSkill    
        }}>
            {children}
        </SkillsContext.Provider>
    )
};

export default SkillsContext;
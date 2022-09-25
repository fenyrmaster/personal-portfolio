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

    return(
        <SkillsContext.Provider value={{
            skills,
            skillDelete,
            skill,
            setSkills,
            setSkillDelete,
            setSkill,
            obtenerSkills,
            crearSkill    
        }}>
            {children}
        </SkillsContext.Provider>
    )
};

export default SkillsContext;
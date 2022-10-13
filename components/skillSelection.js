import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import styles from "../styles/App.module.css";
import ProjectContext from "../context/ProjectProvider";

const SkillSelection = ({ skill, agregarSkill }) => {

    const [ selected, setSelected ] = useState(false);
    const { createProject } = useContext(ProjectContext);

    const checkSelection = () => {
        const index = createProject.technologies.findIndex(skillSelected => skillSelected === skill._id) !== -1 ? true : false;
        setSelected(index);
    }

    useEffect(() => {
        checkSelection();
    }, [createProject]);
    

    return(
        <label className="form-control">
            <Image className={styles.techImg1} src={skill.image} width={50} height={50}/>
            <input onChange={() => agregarSkill(skill)} checked={selected} type="checkbox" name="checkbox" />
        </label>
    );
}

export default SkillSelection;
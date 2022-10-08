import Image from "next/image";
import styles from "../styles/App.module.css";

const SkillSelection = ({ skill, createProject, setCreateProject, agregarSkill }) => {

    return(
        <label className="form-control">
            <Image className={styles.techImg1} src={skill.image} width={50} height={50}/>
            <input onChange={() => agregarSkill(skill)} type="checkbox" name="checkbox" />
        </label>
    );
}

export default SkillSelection;
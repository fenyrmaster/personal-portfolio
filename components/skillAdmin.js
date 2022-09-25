import Image from "next/image";
import styles from "../styles/App.module.css";
import SkillsContext from "../context/SkillsProvider";
import { useContext } from "react";

const SkillAdmin = ({deleteFn, editSkillFn, skillData}) => {

    // Listeners to know which skill is being edited or deleted
    const { setSkillDelete, setSkill } = useContext(SkillsContext);

    return(
        <div className={styles.skillAdmContainer}>
            <Image className={styles.swiperImage} src={skillData.image} width={100} height={100}/>
            <p className={`${styles.swiperName} ${skillData.role}`}>{skillData.nombre}</p>
            <p className={styles.skillText}>Skill level:</p>
            <p className={`${styles.skillLevel} ${styles.skilladm}`}>{skillData.level}</p>
            <div className={styles.skillButtons}>
                <button onClick={() => {editSkillFn(true); setSkill(skillData)}} className={styles.skillEdit}>Skill</button>
                <button onClick={() => {deleteFn(true); setSkillDelete(skillData)}} className={styles.skillDelete}>Delete</button>
            </div>
        </div>
    );
};

export default SkillAdmin;
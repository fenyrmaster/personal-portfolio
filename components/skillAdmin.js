import Image from "next/image";
import styles from "../styles/App.module.css";

const SkillAdmin = () => {
    return(
        <div className={styles.skillAdmContainer}>
            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={100} height={100}/>
            <p className={styles.swiperName}>React</p>
            <p className={styles.skillText}>Skill level:</p>
            <p className={`${styles.skillLevel} ${styles.skilladm}`}>Intermediate</p>
            <div className={styles.skillButtons}>
                <button className={styles.skillEdit}>Edit</button>
                <button className={styles.skillDelete}>Delete</button>
            </div>
        </div>
    );
};

export default SkillAdmin;
import Image from "next/image";
import styles from "../styles/App.module.css";
import styled from "@emotion/styled";

const Skill = ({skill}) => {

    const Porcentaje = styled.div`
        width: 100%;
        height: 1.3rem;
        background-color: rgba(255, 136,0, .3);
        position: absolute;
        bottom: 0;
        left: 0;
        &:after{
            position: absolute;
            content: "";
            width: ${ skill?.level === "Advanced" ? "100%" : (skill?.level === "Intermediate" ? "66%" : "33%") };
            height: 1.3rem;
            background-color: rgba(255, 136,0, 1);
            top: 0;
            left: 0;
        }
    `;

    return(
        <div className={styles.swiperContent}>
            <Image className={styles.swiperImage} src={skill?.image} width={100} height={100}/>
            <p className={styles.swiperName}>{skill?.nombre}</p>
            <p className={styles.skillText}>Skill level:</p>
            <p className={styles.skillLevel}>{skill?.level}</p>
            <Porcentaje/>
        </div>
    );
}

export default Skill;
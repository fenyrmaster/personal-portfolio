import Image from "next/image";
import styles from "../styles/App.module.css";
import styled from "@emotion/styled";

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
        width: 66%;
        height: 1.3rem;
        background-color: rgba(255, 136,0, 1);
        top: 0;
        left: 0;
    }
`;

const Skill = () => {
    return(
        <div className={styles.swiperContent}>
            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={100} height={100}/>
            <p className={styles.swiperName}>React</p>
            <p className={styles.skillText}>Skill level:</p>
            <p className={styles.skillLevel}>Intermediate</p>
            <Porcentaje/>
        </div>
    );
}

export default Skill;
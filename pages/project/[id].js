import styles from "../../styles/App.module.css";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Navigation from "../../components/navigation";

export default function ProjectsAll(){

    const [ parallaxValue, setParallaxValue ] = useState("380px");
    const [ realProject, setRealProject ] = useState(true);

    const Details = styled.div`
        position: absolute;
        top: ${parallaxValue};
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(238, 238, 238, 1);
        padding: .5rem 1rem;
        border: .2rem solid rgba(255, 89, 0, 1);
        border-radius: 1rem;
        @media(max-width: 46.875em){
            width: 80%
        }
    `;

    const parallax = () => {
        let value = (-window.scrollY * .2 + 350 + "px");
        setParallaxValue(value);
    }

    useEffect(() => {
        window.addEventListener("scroll", parallax);
    }, []);



    return(
        <>
            <Navigation/>
            <div className={"separator"}></div>
            <header className={styles.projectDetails}>
                <Details>
                    <h1 className={styles.project_title}>Online jelwery store</h1>
                    <div className={styles.project_extras}>
                        <div className={styles.project_text}>
                            <ion-icon className={"iconProject"} name="construct-sharp"></ion-icon>
                            <p className={styles.project_extras_paragraph}>Full stack</p>
                        </div>
                        <div className={styles.project_text}>
                            <ion-icon className={"iconProject"} name={ realProject ? "globe-sharp" : "book-sharp"}></ion-icon>
                            <p className={styles.project_extras_paragraph}>Real Project</p>
                        </div>
                    </div>
                </Details>
            </header>
            <div className={styles.all}>hola</div>
        </>
    );
};

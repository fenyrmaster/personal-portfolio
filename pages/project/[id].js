import styles from "../../styles/App.module.css";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

export default function ProjectsAll(){

    const [ parallaxValue, setParallaxValue ] = useState("400px");

    const Details = styled.div`
        position: absolute;
        top: ${parallaxValue};
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: red;
        padding: .5rem 1rem;
    `;

    const parallax = () => {
        let value = (-window.scrollY * .15 + 400 + "px");
        setParallaxValue(value);
    }

    useEffect(() => {
        window.addEventListener("scroll", parallax);
    }, []);



    return(
        <>
            <header className={styles.projectDetails}>
                <Details className={styles.projectHeader}>
                    <h1>Online jelwery store</h1>
                    <div className={styles.project_extras}>
                        <p className={styles.project_extras_paragraph}>Full stack</p>
                        <p className={styles.project_extras_paragraph}>Real Project</p>
                    </div>
                </Details>
            </header>
            <div className={styles.all}>hola</div>
        </>
    );
};

import Projects from "../components/projects";
import { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import styles from "../styles/App.module.css";
import Navigation from "../components/navigation";
import AnimationController from "../components/animationController";

export default function ProjectsAll(){

    const [colorSelect, setColorState] = useState("rgb(112, 112, 112)");

    const Select = styled.select`

        border: solid ${colorSelect} .2rem;
        font-size: 1.8rem;
        padding: .5rem 1rem;

    `;

    const [projectsHeight, setProjectHeight] = useState(0);
    const [projectsWidth, setProjectWidth] = useState(0);
    const [selectValue, setSelectValue] = useState("All Projects");
    const projectRef = useRef(null);

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        updateSize();
    }, []);

    
    const updateSize = () => {
        if(projectRef.current.clientHeight && projectRef.current.clientWidth){
          setProjectHeight(projectRef.current.clientHeight);
          setProjectWidth(projectRef.current.clientWidth);
        }
    }

    const cambiarCategoria = e => {
        setSelectValue(e.target.value);
        if(e.target.value === "All Projects"){
            setColorState("rgb(112, 112, 112)");
        } else if(e.target.value === "Real Projects"){
            setColorState("#ffb310");
        } else if(e.target.value === "Learning Projects"){
            setColorState("rgb(254, 223, 0)");
        }
    }

    return(
        <>
            <Navigation/>
            <AnimationController/>
            <section className={styles.allProjects} ref={projectRef}>
                <div className={`${styles.subtitleWrapper} ${styles.subtitleCustom2}`}>
                  <h2 className={styles.subtitle}>All my projects</h2>  
                </div>
                <form className={styles.projectForm}>
                    <Select onChange={(e) => cambiarCategoria(e)} value={selectValue} className={`${styles.projectForm_select}`}>
                        <option>All Projects</option>
                        <option>Real Projects</option>
                        <option>Learning Projects</option>
                    </Select>
                </form>
                <Projects projectsHeight={projectsHeight} projectsWidth={projectsWidth} allProjects={true}/>
            </section>
        </>
    )
}
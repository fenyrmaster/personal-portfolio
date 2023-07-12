import Projects from "../components/projects";
import { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import styles from "../styles/App.module.css";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import axios from "axios";
import AnimationController from "../components/animationController";

export async function getStaticProps(){
    // Fetch the projects
    const project = await axios.get(`https://brandon-data.onrender.com/api/projects?sort=-completionDate`);
    const projectsAll = project.data.data;
    return{
        props: {
            projectsAll
        },
        revalidate: 60
    }
  }

export default function ProjectsAll({projectsAll}){

    const [colorSelect, setColorState] = useState("rgb(112, 112, 112)");
    const [ shownProjects, setShownProjects ] = useState([]);

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
        setShownProjects(projectsAll);
        window.addEventListener("resize", updateSize);
        updateSize();
    }, []);
    useEffect(() => {
        updateSize();
    }, [shownProjects]);

    
    const updateSize = () => {
        if(projectRef.current?.clientHeight && projectRef.current?.clientWidth){
          setProjectHeight(projectRef.current?.clientHeight);
          setProjectWidth(projectRef.current?.clientWidth);
        }
    }

    const cambiarCategoria = e => {
        setSelectValue(e.target.value);
        let projects = projectsAll;
        let results;
        if(e.target.value === "All Projects"){
            setColorState("rgb(112, 112, 112)");
            results = projects;
        } else if(e.target.value === "Real Projects"){
            setColorState("#ffb310");
            results = projects.filter(project => project.usage === "Real Project");
        } else if(e.target.value === "Learning Projects"){
            setColorState("rgb(254, 223, 0)");
            results = projects.filter(project => project.usage === "Learning Project");
        }
        setShownProjects(results);
    }

    return(
        <>
            <Navigation/>
            <AnimationController/>
            <section className={styles.allProjects} ref={projectRef}>
                <div className={`${styles.subtitleWrapper} ${styles.subtitleCustom2}`}>
                  <h2 className={styles.subtitle}>All my projects</h2>  
                </div>
                <p className={"tips"}>
                    <ion-icon name="bulb"></ion-icon>
                    {projectsWidth > 1200 ? "Tip: Hover over the images to learn more about the projects " : "Tip: Tap on the images to learn more about the projects "}
                    <ion-icon name="bulb"></ion-icon>
                </p>
                <form className={styles.projectForm}>
                    <Select onChange={(e) => cambiarCategoria(e)} value={selectValue} className={`${styles.projectForm_select}`}>
                        <option>All Projects</option>
                        <option>Real Projects</option>
                        <option>Learning Projects</option>
                    </Select>
                </form>
                <Projects projectsHeight={projectsHeight} projectsWidth={projectsWidth} allProjects={shownProjects} mainPage={false}/>
            </section>
            <Footer/>
        </>
    )
}
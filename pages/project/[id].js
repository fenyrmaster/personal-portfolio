import styles from "../../styles/App.module.css";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Image from "next/dist/client/image";
import Navigation from "../../components/navigation";
import Link from "next/dist/client/link";
import axios from "axios";
import Footer from "../../components/footer";

export async function getStaticProps({params}){
    // Fetch the projects
    const data = await axios.get(`http://localhost:4000/api/projects/${params.id}`);
    const project = data.data.data;
    return{
        props: {
            project: project ? project : {}
        }
    }
}

export async function getStaticPaths() {
    const projects = await axios.get(`http://localhost:4000/api/projects`);
    const paths = projects.data.data.map(project => {
        return{
            params: {
                id: project.slug.toString()
            }
        }
    });
    return{
        paths,
        fallback: false
    }
}

export default function ProjectsAll({project}){

    const [ parallaxValue, setParallaxValue ] = useState("380px");
    const [ floaterAppear, setFloaterAppear ] = useState(false);
    const floaterRef = useRef(null);

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
    const ProjectDetails = styled.header`
        height: 100vh;
        position: relative;
        perspective: .1rem;
        transform-style: preserve-3d;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);
        clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);
        z-index: 5;
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right bottom, rgba(255, 80, 27, 0.807), rgba(255, 136, 0, 0.774)), url(${project.image});
            background-position: center center;
            background-size: cover;
            object-fit: cover;
            transform: translateZ(-.1rem) scale(2);
        }
    `;

    const parallax = () => {
        let value = (-window.scrollY * .2 + 380 + "px");
        setParallaxValue(value);
    }
    const dataFixed = () => {
        let offset = floaterRef.current?.clientHeight - 180;
        if(window.pageYOffset > offset){
            setFloaterAppear(true);
        } else if(window.pageYOffset < offset){
            setFloaterAppear(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            parallax();
            dataFixed();
        });
    }, []);



    return(
        <>
            <Navigation/>
            <div className={"separator"}></div>
            <ProjectDetails ref={floaterRef}>
                <Details>
                    <h1 className={styles.project_title}>{project.nombre}</h1>
                    <div className={styles.project_extras}>
                        <div className={styles.project_text}>
                            <ion-icon className={"iconProject"} name="construct-sharp"></ion-icon>
                            <p className={styles.project_extras_paragraph}>{project.focus}</p>
                        </div>
                        <div className={styles.project_text}>
                            <ion-icon className={"iconProject"} name={ project.usage === "Real Project" ? "globe-sharp" : "book-sharp"}></ion-icon>
                            <p className={styles.project_extras_paragraph}>{project.usage}</p>
                        </div>
                    </div>
                </Details>
            </ProjectDetails>
            <section className={styles.project_details}>
                <div className={styles.project_separator}></div>
                <div className={`${styles.project_floater} ${floaterAppear ? styles.floaterFixed : ""}`}>
                    <div className={styles.project_data}>
                        <p className={styles.project_data_paragraph}>Project Name:</p>
                        <p className={styles.project_data_paragraph2}>{project.nombre}</p>
                    </div>
                    <div className={styles.project_data}>
                        <p className={styles.project_data_paragraph}>Date of completion:</p>
                        <p className={styles.project_data_paragraph2}>{new Date(project.completionDate.split("T")[0]).toLocaleDateString("en-US", {day: "2-digit", year: "numeric", month: "long"})}</p>
                    </div>
                    <div className={styles.project_data}>
                        <p className={styles.project_data_paragraph}>Technologies used:</p>
                        <div className={styles.project_data_technologies}>
                            { project.technologies.map(tech => <Image className={styles.swiperImage} src={tech.image} width={45} height={45}/>) }
                        </div>
                    </div>
                    <Link href={project.githubUrl}><a target="_blank" className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>github Repository.</span></a></Link>
                    <Link href={project.liveUrl}><a target="_blank" className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>Live website.</span></a></Link>
                </div>
                <div  className={styles.project_description}>
                    { project.text.map(content => (content.type === "bulleted-list" || content.type === "numbered-list") ? <ul className={content.type}>{content.children.map(content2 => content2.children.map(content3 => <li className={`${content3.code ? "code" : ""} ${content3.italic ? "italic" : ""} ${content3.underline ? "underline" : ""} ${content3.bold ? "bold" : ""}`}>{content3.text}</li>) )}</ul> : <p className={content.type}>{content.children.map(el => <span className={`${el.code ? "code" : ""} ${el.italic ? "italic" : ""} ${el.underline ? "underline" : ""} ${el.bold ? "bold" : ""}`}>{el.text}</span>)}</p>) }
                    <div className={`${styles.subtitleWrapper} ${styles.subtitleCustom2} custom1`}>
                        <h2 className={styles.subtitle}>gallery</h2> 
                    </div>
                    <div className={styles.masonry}>
                        { project.gallery.map(pic => <img className={styles.masonry_img} src={pic}/>) }
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

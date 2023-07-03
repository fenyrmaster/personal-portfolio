import styles from "../../styles/App.module.css";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Image from "next/dist/client/image";
import Navigation from "../../components/navigation";
import Link from "next/dist/client/link";
import axios from "axios";
import Footer from "../../components/footer";
import { Parallax } from "react-parallax";
import BlogIndex from "../../components/blogIndex";

export async function getStaticProps({params}){
    // Fetch the projects
    const data = await axios.get(`http://localhost:4000/api/projects/${params.id}`);
    const project = data.data.data;
    //Fetch 3 entries based on the date
    const entries = await axios.get(`http://localhost:4000/api/blog?limit=3&sort=-postDate`);
    const entriesAll = entries.data.data;
    return{
        props: {
            project: project ? project : {},
            entriesAll
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

export default function ProjectsAll({project, entriesAll}){

    const [ floaterAppear, setFloaterAppear ] = useState(false);
    const [ end, setEnd ] = useState(false);
    const floaterRef = useRef(null);
    const footerRef = useRef(null);

    const Details = styled.div`
        position: absolute;
        top: 47%;
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
        overflow: hidden;
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
            object-fit: cover;
            transform: translateZ(-.1rem) scale(2.2);
        }
    `;

    //const parallax = () => {
    //    let value = (-window.scrollY * .2 + 380 + "px");
    //    setParallaxValue(value);
    //}
    const dataFixed = () => {
        let offset = floaterRef.current?.clientHeight - 180;
        let stickness = footerRef.current?.clientHeight + 250;
        if(window.pageYOffset > offset){
            setFloaterAppear(true);
        }
        if(window.pageYOffset > stickness){
            setEnd(true);
        }
        if(window.pageYOffset < stickness){
            setEnd(false);
        }
        if(window.pageYOffset < offset){
            setFloaterAppear(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            //parallax();
            dataFixed();
        });
    }, []);



    return(
        <div className={"projectAll"}>
            <Navigation/>
            <div className={"separator"}></div>
            <ProjectDetails ref={floaterRef}>
            <Parallax blur={0} bgImage={project.image} bgImageAlt="the cat" strength={300} bgImageStyle={{height: "100vh"}}>

                <Details>
                    <h1 className={styles.project_title}>{project.nombre}</h1>
                    <div  className={styles.project_extras}>
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
                </Parallax>
            </ProjectDetails>
            <section className={styles.project_details}>
                <div className={styles.project_separator}></div>
                <div style={{
                    position: end ? "absolute" : "fixed",
                    top: end ? `${footerRef.current?.clientHeight}px` : ""
                }} className={`${styles.project_floater} ${floaterAppear ? styles.floaterFixed : ""}`}>
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
                            { project.technologies.map(tech => <Image className={styles.swiperImage} key={tech.id} src={tech.image} width={45} height={45}/>) }
                        </div>
                    </div>
                    <Link href={project.githubUrl}><a target="_blank" className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>github Repository.</span></a></Link>
                    <Link href={project.liveUrl}><a target="_blank" className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>Live website.</span></a></Link>
                </div>
                <div ref={footerRef} className={styles.project_description}>
                    { project.text.map(content => (content.type === "bulleted-list" || content.type === "numbered-list") 
                    ? <ul className={content.type}>{content.children.map(content2 => content2.children.map(content3 => <li className={`${content3.code ? "code" : ""} ${content3.italic ? "italic" : ""} ${content3.underline ? "underline" : ""} ${content3.bold ? "bold" : ""}`}>{content3.text}</li>) )}</ul>
                    : (content.type === "image") 
                    ? <img key={content.url} className={styles.project_description_img} src={content.url} />
                    : <p className={content.type}>{content.children.map(el => el.link ? <a target={"_blank"} href={el.url} className={`${el.code ? "code" : ""} ${el.italic ? "italic" : ""} ${el.underline ? "underline" : ""} ${el.bold ? "bold" : ""} link_url`}>{el.text}</a> : <span className={`${el.code ? "code" : ""} ${el.italic ? "italic" : ""} ${el.underline ? "underline" : ""} ${el.bold ? "bold" : ""}`}>{el.text}</span>)}</p>) }
                    <div className={`${styles.subtitleWrapper} ${styles.subtitleCustom2} custom1`}>
                        <h2 className={styles.subtitle}>gallery</h2> 
                    </div>
                    <div className={styles.masonry}>
                        { project.gallery.map(pic => <img className={styles.masonry_img} src={pic}/>) }
                    </div>
                    <Link href={"/"}><a target="_blank" className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>Go back to main menu</span></a></Link>
                    <Link href={"/all-projects"}><a className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>Go back to all projects</span></a></Link>
                </div>
            </section>
            <section className="smallBlog">
                <div className={`${styles.subtitleWrapper} ${styles.subtitleCustom2} custom1`}>
                    <h2 className={styles.subtitle}>Recent Blog entries</h2> 
                </div>
                <BlogIndex entries={entriesAll}/>
                <Link href={"/blog"}><a className={`${styles.btn1} ${styles.customChange3}`}><span className={styles.btnText}>{"All Blog Entries"}</span></a></Link>
            </section>
            <Footer/>
        </div>
    );
};

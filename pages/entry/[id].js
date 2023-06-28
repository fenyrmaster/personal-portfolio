import styles from "../../styles/App.module.css";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Image from "next/dist/client/image";
import Navigation from "../../components/navigation";
import Link from "next/dist/client/link";
import axios from "axios";
import Footer from "../../components/footer";
import { Parallax } from "react-parallax";

export async function getStaticProps({params}){
    // Fetch the projects
    const data = await axios.get(`http://localhost:4000/api/blog/${params.id}`);
    const entry = data.data.data;
    return{
        props: {
            entry: entry ? entry : {}
        }
    }
}

export async function getStaticPaths() {
    const entries = await axios.get(`http://localhost:4000/api/blog`);
    const paths = entries.data.data.map(entry => {
        return{
            params: {
                id: entry.slug.toString()
            }
        }
    });
    return{
        paths,
        fallback: false
    }
}

export default function EntryView({entry}){

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
            <Parallax blur={0} bgImage={entry.image} bgImageAlt="the cat" strength={300} bgImageStyle={{height: "100vh"}}>
                <Details>
                    <h1 className={styles.project_title}>{entry.nombre}</h1>
                    <div  className={styles.project_extras}>
                        <div className="blog_data">
                            <div className={styles.adminEntry_stat}>
                                <p className={styles.adminEntry_statP}>{entry.views}</p>
                                <ion-icon name={"eye-sharp"}></ion-icon>
                            </div>
                            <div className={styles.adminEntry_stat}>
                                <p className={styles.adminEntry_statP}>{entry.time}</p>
                                <ion-icon name={"book-outline"}></ion-icon>
                            </div>
                            <div className={styles.adminEntry_stat}>
                                <p className={styles.adminEntry_statP}>{new Date(entry.postDate.split("T")[0]).toLocaleDateString("en-US", {day: "2-digit", year: "numeric", month: "long"})}</p>
                                <ion-icon name={"calendar-outline"}></ion-icon>
                            </div>
                        </div>
                    </div>
                    <p className={"blog_text"}>{entry.intro}</p>
                </Details>
                </Parallax>
            </ProjectDetails>
            <section className={styles.blog_details}>
                <div className={styles.blog_separator}></div>
                <div ref={footerRef} className={styles.blog_description}>
                    { entry.text.map(content => (content.type === "bulleted-list" || content.type === "numbered-list") 
                    ? <ul className={content.type}>{content.children.map(content2 => content2.children.map(content3 => <li className={`${content3.code ? "code" : ""} ${content3.italic ? "italic" : ""} ${content3.underline ? "underline" : ""} ${content3.bold ? "bold" : ""}`}>{content3.text}</li>) )}</ul>
                    : (content.type === "image") 
                    ? <img key={content.url} className={styles.project_description_img} src={content.url} />
                    : <p className={content.type}>{content.children.map(el => <span className={`${el.code ? "code" : ""} ${el.italic ? "italic" : ""} ${el.underline ? "underline" : ""} ${el.bold ? "bold" : ""}`}>{el.text}</span>)}</p>) }
                    <Link href={"/"}><a target="_blank" className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>Go back to main menu</span></a></Link>
                    <Link href={"/all-projects"}><a className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>Go back to all projects</span></a></Link>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

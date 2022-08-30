import styles from "../../styles/App.module.css";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Image from "next/dist/client/image";
import Navigation from "../../components/navigation";
import Link from "next/dist/client/link";

export default function ProjectsAll(){

    const [ parallaxValue, setParallaxValue ] = useState("380px");
    const [ realProject, setRealProject ] = useState(true);
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

    const parallax = () => {
        let value = (-window.scrollY * .2 + 380 + "px");
        setParallaxValue(value);
    }
    const dataFixed = () => {
        let offset = floaterRef.current.clientHeight - 180;
        console.log(offset, window.pageYOffset);
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
            <header ref={floaterRef} className={styles.projectDetails}>
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
            <section className={styles.project_details}>
                <div className={styles.project_separator}></div>
                <div className={`${styles.project_floater} ${floaterAppear ? styles.floaterFixed : ""}`}>
                    <div className={styles.project_data}>
                        <p className={styles.project_data_paragraph}>Project Name:</p>
                        <p className={styles.project_data_paragraph2}>Jelwery Store store</p>
                    </div>
                    <div className={styles.project_data}>
                        <p className={styles.project_data_paragraph}>Date of completion:</p>
                        <p className={styles.project_data_paragraph2}>03/November/2022</p>
                    </div>
                    <div className={styles.project_data}>
                        <p className={styles.project_data_paragraph}>Technologies used:</p>
                        <div className={styles.project_data_technologies}>
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>                        
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>                        
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>                        
                            <Image className={styles.swiperImage} src={"/../public/images/React-solo.png"} width={45} height={45}/>                        

                        </div>
                    </div>
                    <Link href="/"><a className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>github Repository.</span></a></Link>
                    <Link href="/"><a className={`${styles.btn1} ${styles.customChange2}`}><span className={styles.btnText}>Live website.</span></a></Link>
                </div>
                <div  className={styles.project_description}>
                    <h2>So here it comes a text</h2>
                    <p>Lorem ipsum dolor sit amet. Et mollitia voluptatibus et consequatur odit ut recusandae vitae quo dolor culpa. Nam maiores dignissimos qui magni omnis et quae temporibus in harum tenetur ut corporis nostrum ut repellendus aperiam et voluptatibus inventore!
                        Ad asperiores rerum ea ipsum assumenda et velit dolore. Qui molestiae voluptatem ut reprehenderit sunt et ipsa suscipit et eveniet quasi ut dolor asperiores non numquam maxime ut aliquid suscipit. Ut iure quaerat et totam impedit ut illo tempore ut minima explicabo ab placeat eius! Aut voluptate quae eos unde repellat et asperiores omnis et maxime repellendus aut consequatur praesentium ea eligendi maxime.
                        Est voluptate obcaecati ad autem eveniet et ipsam rerum sed maiores possimus sit fugiat quibusdam ut voluptatum aliquam! Ea pariatur architecto ut facere nesciunt ea natus sequi est optio tempora in unde odit aut dolore nulla et nesciunt corporis. Et dolor accusamus et mollitia inventore est architecto molestiae aut voluptas dolores!  doworo</p>
                </div>
            </section>
        </>
    );
};

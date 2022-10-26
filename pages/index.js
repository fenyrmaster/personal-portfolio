import Link from "next/link"
import Image from "next/image"
import styles from "../styles/App.module.css"
import CanvasRodeo from "../sketch/rodeo-amarillo"
import { Swiper, SwiperSlide } from "swiper/react";
import Skill from "../components/skill";
import AnimationController from "../components/animationController";
import Navigation from "../components/navigation";
import Projects from "../components/projects";
import axios from "axios";
import PublicContext from "../context/PublicProvider";
import { useEffect, useRef, useState, useContext } from "react";
import Footer from "../components/footer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/bundle";

import { Autoplay, Pagination, FreeMode, Grid } from "swiper";
import ProjectContext from "../context/ProjectProvider";
import Swal from "sweetalert2";

export async function getStaticProps(){
  // Fetch the skills
  const data = await axios.get(`http://localhost:4000/api/skills`);
  const skillset = data.data.data;
  // Fetch the projects
  const project = await axios.get(`http://localhost:4000/api/projects?limit=6&sort=-completionDate`);
  const projectsAll = project.data.data;
  return{
      props: {
          projectsAll,
          skillset
      }
  }
}

export default function Home({skillset, projectsAll}) {
  
  const { animationActive, setAnimationActive } = useContext(PublicContext);
  const { enviarEmails } = useContext(ProjectContext);
  const [projectsHeight, setProjectHeight] = useState(0);
  const [projectsWidth, setProjectWidth] = useState(0);
  const [shrinkWidth, setShrinkWidth] = useState(false);
  const [ currentWidth, setCurrentWidth ] = useState(0);
  const projectRef = useRef(null);

  // Data for the email
  const [ emailData, setEmailData ] = useState({
    client: "",
    message: "",
    email: "",
    topic: ""
  })

  const updateSize = () => {
    if(projectRef.current?.clientHeight && projectRef.current?.clientWidth){
      setProjectHeight(projectRef.current?.clientHeight);
      setProjectWidth(projectRef.current?.clientWidth);
      setCurrentWidth(projectRef.current?.clientWidth);
    }
    if(projectRef.current?.clientWidth <= 1200){
      setShrinkWidth(true);
    } else if(projectRef.current?.clientWidth > 1200){
      setShrinkWidth(false);
    }
  }

  const sendMails = async e => {
    e.preventDefault();
    if(emailData.client === "" || emailData.email === "" || emailData.message === "" || emailData.topic === ""){
      Swal.fire({
        title: "Before you send the email...",
        text: "All the fields are required",
        icon: "info",
        confirmButtonColor: "#ffcc00"
      });
      return;
    }
    await enviarEmails(emailData);
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  return (
    <>
      <Navigation/>
      <AnimationController/>
      <header className={styles.header_container}>
        <div className={styles.header_text}>
          <h1 className={styles.header_title}>I'm <span className={styles.header_span}>brandon</span> Yahir. </h1>
          <h2 className={styles.header_title}>I develop <span className={styles.header_span}>sites</span> that <span className={styles.header_span}>empower</span> brands.</h2>
          <p className={styles.header_paragraph}>Are you looking for a website to manage your business? Or reach more clients? i got you covered.</p>
          <Link href="/about-me"><a className={styles.btn1}><span className={styles.btnText}>More about me</span></a></Link>
          <Link href="/cv"><a className={`${styles.btn1} ${styles.btnSep}`}><span className={styles.btnText}>Download CV</span></a></Link>
        </div>
        <div className={styles.header_image}>
          <img src="/images/default.jpg"/>
          { animationActive && <CanvasRodeo shrink={shrinkWidth}/> }
        </div>
      </header>
      <section className={styles.section2}>
        <div className={styles.subtitleWrapper}>
          <h2 className={styles.subtitle}>My skills</h2>  
        </div>
        <h4 className={styles.separators}>Front-end Skills:</h4>
        <div className={styles.swiperWrapper}>
          <Swiper
            spaceBetween={30}
            speed={5000}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            freeMode={true}
            modules={[Autoplay, FreeMode]}
            grabCursor={true}
            breakpoints={{ 1400: { slidesPerView: 5 }, 800: { slidesPerView: 3 }, 200: { slidesPerView: 2 } }}
            className={styles.swiperSkills}
          >
            { skillset.length !== 0 && skillset.map(skill => {if(skill.role === "Front-end"){ return <SwiperSlide key={skill._id} className={styles.swiperSlide}><Skill key={skill._id} skill={skill}/></SwiperSlide> }}) }
          </Swiper>
        </div>
        <div className={styles.organizer}>
        <h4 className={styles.separators}>Back-end Skills:</h4>
        <div className={styles.swiperWrapper}>
          <Swiper
            spaceBetween={30}
            speed={5000}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true
            }}
            freeMode={true}
            modules={[Autoplay, FreeMode]}
            grabCursor={true}
            breakpoints={{ 1400: { slidesPerView: 5 }, 800: { slidesPerView: 3 }, 200: { slidesPerView: 2 } }}
            className={styles.swiperSkills2}
          >
            { skillset.length !== 0 && skillset.map(skill => {if(skill.role === "Back-end"){ return <SwiperSlide key={skill._id} className={styles.swiperSlide}><Skill key={skill._id} skill={skill}/></SwiperSlide> }}) }
          </Swiper>
        </div>
        </div>
      </section>
      <section ref={projectRef} className={styles.section3}>
        <div className={styles.subtitleWrapper}>
          <h2 className={styles.subtitle}>My Projects</h2>  
        </div>
        <Projects projectsHeight={projectsHeight} projectsWidth={projectsWidth} allProjects={projectsAll} mainPage={true}/>
      </section>
      <section id="contact-form" className={styles.section4}>
        <div className={styles.contact_container}>
          <div className={styles.subtitleWrapper}>
          <h2 className={styles.subtitle}>Contact me</h2>  
          </div>   
          <h3 className={styles.contact_header}>Are you interested in a project and you dont know how to start?</h3>
          <form onSubmit={e => sendMails(e)} className={styles.contact_form}>
          <h3 className={styles.contact_header}>Lets talk</h3>
            <div className={styles.contact_form_inputs}>
              <div className={styles.contact_form_data}>
                <input name="topic" value={emailData.topic} onChange={e => setEmailData({...emailData, [e.target.name]: e.target.value})} className={styles.contact_form_input} placeholder="I'd like to talk about..." type={"text"}/>
                <div className={styles.contact_dual}>
                  <input className={styles.contact_form_input} value={emailData.client} name="client" onChange={e => setEmailData({...emailData, [e.target.name]: e.target.value})} placeholder="Name..."/>
                  <input className={styles.contact_form_input} value={emailData.email} name="email" onChange={e => setEmailData({...emailData, [e.target.name]: e.target.value})} placeholder="Email..."/>
                </div>
              </div>
              <div className={styles.contact_form_message}>
                <textarea className={styles.contact_form_textarea} name="message" value={emailData.message} onChange={e => setEmailData({...emailData, [e.target.name]: e.target.value})} placeholder="Message"></textarea>
              </div>
            </div>
            <button className={styles.btn_form} type="submit">Send Message</button>
          </form>
        </div>
      </section>
      <Footer/>
    </>
  )
}

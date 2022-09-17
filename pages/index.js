import Link from "next/link"
import Image from "next/image"
import styles from "../styles/App.module.css"
import CanvasRodeo from "../sketch/rodeo-amarillo"
import { Swiper, SwiperSlide } from "swiper/react";
import Skill from "../components/skill";
import AnimationController from "../components/animationController";
import Navigation from "../components/navigation";
import Projects from "../components/projects";
import { useEffect, useRef, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/bundle";

import { Autoplay, Pagination, FreeMode, Grid } from "swiper";

export default function Home() {
  
  const [projectsHeight, setProjectHeight] = useState(0);
  const [projectsWidth, setProjectWidth] = useState(0);
  const [shrinkWidth, setShrinkWidth] = useState(false);
  const projectRef = useRef(null);

  const updateSize = () => {
    if(projectRef.current.clientHeight && projectRef.current.clientWidth){
      setProjectHeight(projectRef.current.clientHeight);
      setProjectWidth(projectRef.current.clientWidth);
    }
    if(projectRef.current.clientWidth <= 1200){
      setShrinkWidth(true);
    } else if(projectRef.current.clientWidth > 1200){
      setShrinkWidth(false);
    }
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
          <CanvasRodeo shrink={shrinkWidth}/>
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
            speed={7000}
            slidesPerView={6}
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }}
            freeMode={true}
            modules={[Grid, Autoplay, FreeMode]}
            className={styles.swiperSkills}
          >
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
          </Swiper>
        </div>
        <div className={styles.organizer}>
        <h4 className={styles.separators}>Back-end Skills:</h4>
        <div className={styles.swiperWrapper}>
          <Swiper
            spaceBetween={30}
            speed={7000}
            slidesPerView={6}
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 0,
              reverseDirection: true,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }}
            freeMode={true}
            modules={[Grid, Autoplay, FreeMode]}
            className={styles.swiperSkills2}
          >
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}><Skill/></SwiperSlide>
          </Swiper>
        </div>
        </div>
      </section>
      <section ref={projectRef} className={styles.section3}>
        <div className={styles.subtitleWrapper}>
          <h2 className={styles.subtitle}>My Projects</h2>  
        </div>
        <Projects projectsHeight={projectsHeight} projectsWidth={projectsWidth}/>
      </section>
      <section id="contact-form" className={styles.section4}>
        <div className={styles.contact_container}>
          <div className={styles.subtitleWrapper}>
          <h2 className={styles.subtitle}>Contact me</h2>  
          </div>   
          <h3 className={styles.contact_header}>Are you interested in a project and you dont know how to start?</h3>
          <form className={styles.contact_form}>
          <h3 className={styles.contact_header}>Lets talk</h3>
            <div className={styles.contact_form_inputs}>
              <div className={styles.contact_form_data}>
                <input className={styles.contact_form_input} placeholder="I'd like to talk about..." type={"text"}/>
                <div className={styles.contact_dual}>
                  <input className={styles.contact_form_input} placeholder="Name..."/>
                  <input className={styles.contact_form_input} placeholder="Email..."/>
                </div>
              </div>
              <div className={styles.contact_form_message}>
                <textarea className={styles.contact_form_textarea} placeholder="Message"></textarea>
              </div>
            </div>
            <button className={styles.btn_form} type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </>
  )
}

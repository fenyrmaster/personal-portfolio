import Link from "next/link"
import Image from "next/image"
import styles from "../styles/App.module.css"
import CanvasRodeo from "../sketch/rodeo-amarillo"
import { Swiper, SwiperSlide } from "swiper/react";
import Skill from "../components/skill";
import Project from "../components/project";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/bundle";

import { Autoplay, Pagination, FreeMode, Grid } from "swiper";

export default function Home() {
  
  

  return (
    <>
      <header className={styles.header_container}>
        <div className={styles.header_text}>
          <h1 className={styles.header_title}>I'm <span className={styles.header_span}>brandon</span> Yahir. </h1>
          <h2 className={styles.header_title}>I develop <span className={styles.header_span}>sites</span> that <span className={styles.header_span}>empower</span> brands.</h2>
          <p className={styles.header_paragraph}>Are you looking for a website to manage your business? Or reach more clients? i got you covered.</p>
          <Link href="/about-me"><a className={styles.btn1}><span className={styles.btnText}>More about me</span></a></Link>
        </div>
        <div className={styles.header_image}>
          <img src="/images/default.jpg" width={300} height={300}/>
          <CanvasRodeo/>
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
      <section className={styles.section3}>
        <div className={styles.subtitleWrapper}>
          <h2 className={styles.subtitle}>My Projects</h2>  
        </div>
        <div className={styles.projectsContainer}>
            <Project/>
            <Project/>
            <Project/>
            <Project/>
            <Project/>
            <Project/>
            <Project/>
            <Project/>
            <Project/>
        </div>
      </section>
    </>
  )
}

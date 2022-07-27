import Link from "next/link"
import Image from "next/image"
import styles from "../styles/App.module.css"
import CanvasRodeo from "../sketch/rodeo-amarillo"

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
    </>
  )
}

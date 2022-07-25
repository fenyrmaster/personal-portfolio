import Link from "next/link"
import Image from "next/image"
import styles from "../styles/App.module.css"

export default function Home() {
  return (
    <>
      <header className={styles.header_container}>
        <div className={styles.header_text}>
          <h1>I design sites that empower brands</h1>
          <p>lorem ipsum dolor no se que mas poner aqui xd</p>
          <Link href="/about-me"><a>More about me</a></Link>
        </div>
        <div className={styles.header_image}>
          <Image src="/images/default.jpg" width={300} height={300}/>
        </div>
      </header>
    </>
  )
}

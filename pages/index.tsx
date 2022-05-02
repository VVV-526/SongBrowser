import { useRouter } from "next/router";
import React, { ReactNode } from "react"
import Layout from "../components/layout"
import styles from "../styles/Home.module.css"
import Search from "../components/search"

const HomePage = () => {
  const router = useRouter();
  return (
    <Layout title="Home">
      <Search></Search>
      <div className={styles.grid}>
        <a href="/" className={styles.card}>
          <h2>New Releases &rarr;</h2>
          <p>This is a paragraph to be filled in the future.</p>

        </a>

        <a href="/" className={styles.card}>
          <h2>Pop Hits &rarr;</h2>
          <p>This is a paragraph to be filled in the future.</p>
        </a>

        <a href="/" className={styles.card}>
          <h2>Recommended for you &rarr;</h2>
          <p>This is a paragraph to be filled in the future.</p>
        </a>

        <a href="/" className={styles.card}>
          <h2>Top Songs Global &rarr;</h2>
          <p>This is a paragraph to be filled in the future.</p>
        </a>

        <a href="/" className={styles.card}>
          <h2>Top Songs USA &rarr;</h2>
          <p>This is a paragraph to be filled in the future.</p>
        </a>

        <a href="/" className={styles.card}>
          <h2>Find More Lists&rarr;</h2>
          <p>This is a paragraph to be filled in the future.</p>
        </a>
      </div>
    </Layout>
  )
}

export default HomePage

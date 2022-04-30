import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.navbar}>
        <div className={styles.logo}>
        </div>
        <div className={styles.menu}>
          <ul>
            <li>
              <a href="#">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#playlists"><span>Playlists</span></a>
            </li>
          </ul>
        </div>
        <div className={styles.authen}>
          <a href="#" className={styles.signText}>Sign up</a>
          <button className={styles.loginBtn}>Log in</button>
        </div>
      </div>

      <div className={styles.content}></div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by{' '}
          <span className={styles.logo}>
            Group xx
          </span>
        </a>
      </footer>
    </div >
  )
}

export default Home

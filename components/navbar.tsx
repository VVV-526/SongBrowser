import React from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import styles from '../styles/Home.module.css'

const Navbar = () => {
  return (
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
  )
}

export default Navbar
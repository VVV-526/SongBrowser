import React, { useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import styles from '../styles/Home.module.css'
import Link from "next/link"

type NavLinkData = {
  id: number
  name: string
  path: string
}

const navData: NavLinkData[] = [
  {
    id: 1,
    name: "Home",
    path: "/"
  },
  {
    id: 2,
    name: "Playlist",
    path: "/playlist",
  }
];

let activeLink = 1;

const NavLink = ({ id, name, path }: NavLinkData) => {
  return (
      <Link href={path} passHref>
        <ul>
          <li onClick={() => activeLink = id} className={activeLink === id ? styles.clicked : ""}>
            <a><span>{name}</span></a>
          </li>
        </ul>
      </Link>
  )
}


const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
      </div>
      <div className={styles.menu}>
        {navData.map((data) => {
          return (
          <NavLink key={data.path} {...data} />);
        })}
      </div>
      <div className={styles.authen}>
        <a href="#" className={styles.signText}>Sign up</a>
        <button className={styles.loginBtn}>Log in</button>
      </div>
    </div>
  )
}

export default Navbar
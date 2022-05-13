import React, { useState } from "react"
import { useRouter } from "next/router"
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { signInWithGoogle } from "../pages/firebase"
import { useAuth } from "./auth/AuthUserProvider"

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
  const { pathname: currentPath } = useRouter()
  return (
      <Link href={path} passHref>
        <ul>
          <li onClick={() => activeLink = id} className={activeLink === id && currentPath === path ? styles.clicked : ""}>
            <a><span>{name}</span></a>
          </li>
        </ul>
      </Link>
  )
}


const Navbar = () => {
  const { user, signOut } = useAuth()
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
        <button className={styles.loginBtn} onClick={user ? signOut : signInWithGoogle}>{user ? "Log Out" : "Log In"}</button>
      </div>
    </div>
  )
}

export default Navbar
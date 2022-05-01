import React from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import styles from '../styles/Home.module.css'
import Link from "next/link"

type NavLinkData = {
  name: string
  path: string
}

const navData: NavLinkData[] = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Playlist",
    path: "/playlist",
  }
];

const NavLink = ({ name, path }: NavLinkData) => {
  const { pathname: currentPath } = useRouter()
  return (
      <Link href={path} passHref>
        <ul>
          <li>
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
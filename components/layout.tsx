import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from "../components/navbar"
import React, { ReactNode } from "react"

type Props = {
  children?: ReactNode
  title: string
}

const Layout= ({children, title}:Props) => {
    return (
      <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="../public/favicon.ico" />
        </Head>
  
        <Navbar></Navbar>
  
        <div className={styles.content}>
        {children}
        </div>
  
        <footer className={styles.footer}>
          <a href="#">Contact us</a>
        </footer>
      </div >
    )
  }
  
  export default Layout
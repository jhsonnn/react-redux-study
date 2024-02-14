import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import homeStyles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Jihyeong Son</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Jihyeong Son Introduction]</p>
        <p>
          (This is a website)
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>

        </ul>
      </section>
    </div>
  );
}


export default Home
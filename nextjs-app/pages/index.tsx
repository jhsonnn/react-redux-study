import Head from "next/head";
import { Inter } from "next/font/google";
import homeStyles from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/post";
import Link from 'next/link';
import { GetStaticProps } from "next";

const inter = Inter({ subsets: ["latin"] });
const Home = ({allPostsData}:{
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return (
    <div className={homeStyles.container}>
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
          {allPostsData.map(({id, title, date}) => 
            <li className={homeStyles.listItem} key={id}>
              {/* 타이틀을 누를 때 링크로 넘어가야함 */}
              <Link href={`/posts/${id}`} legacyBehavior>
                <a>{title}</a>
              </Link>
              <br />
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}


export default Home


export const getStaticProps: GetStaticProps = async()=>{
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
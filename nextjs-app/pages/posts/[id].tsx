import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/post'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import postStyle from '../../styles/Post.module.css'
const Post = ({postData}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) => {
  return (
    <div className={postStyle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 >{postData.title}</h1>
        <div>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </article>
    </div>
  )
} 

export default Post


export const getStaticPaths: GetStaticPaths = async() => {
  const paths = getAllPostIds();
  // [{params: {id: 'pre-rendering'}. {params...}}]
  return {
    paths,
    // fallback ; false라면 getStaticPaths로 리턴되지 않는 것은 모두 404페이지가 뜸
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async({params}) => {
  // md 파일의 정보들을 가져옴
  // 'pre-rendering' or 'ssg-ssr'
  const postData = await getPostData(params.id as string)
  return{
    props: {
      postData
    }
  }
}
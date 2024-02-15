// 아무 지시자를 넣지 않으면 서버 컴포넌트
// 'use client' 지시자를 넣으면 클라이언트 컴포넌트가 됨
//'use client'

import  Link  from 'next/link';
import CreatePost from './CreatePost';
import PageStyle from './../styles/page.module.css'
import PostsStyle from './../styles/postsStyle.module.css'

async function getPost() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records'
    //요청 때마다 매번 새로운 데이터 가져오도록
    , {cache: 'no-store'}
    );
  const data = await res.json();
  //data 있을 때는 items, 타입은 any
  return data?.items as any[];
}

const PostsPage = async() => {
  //post 데이터 들이 들어옴
  const posts = await getPost();

  return (
    <div className={PageStyle.container}>
      <h1>Posts</h1>
      {posts?.map((post)=>{
        //post 요소들마다 PostItem 컴포넌트 생성
        //여러개의 리스트 나열하는 것이므로 key 값, post에 대한 정보들 prop으로 내려주기
        return <PostItem key={post.id} post={post}/>
      })}
    <CreatePost />
    </div>
  )
}

export default PostsPage

//위에서 내려준 post를 받아줌
const PostItem = ({post}: any) =>{
  const {id, title, created} = post || {};
  return(
    <Link href={`/posts/${id}`}>
      <div className={PostsStyle.container}>
        <h3>
          {title}
        </h3>
        <p>{created}</p>
      </div>
    </Link>
  )
}

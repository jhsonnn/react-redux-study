// 다이나믹한 id 받아오도록

import PostStyle from './../../styles/postStyle.module.css'

//detail 페이지의 데이터를 id에 맞게 가져오기
async function getPosts(postId: string){
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/posts/records/${postId}`
        //cache 후에 일정한 간격으로 revalidate
        , {next: {revalidate: 10}}
        );

    if(!res.ok){
        //가장 가까이에 있는 error.jsx activated
        throw new Error('Failed to fetch data');
    }
    const data = res.json();
    return data;
}


const PostDetailPage = async ({params}: any) => {
    const post = await getPosts(params.id);

    return (
        <div>
            <h1>posts/{post.id}</h1>
            <div className={PostStyle.container}>
                <h3>{post.title}</h3>
                <p>{post.created}</p>
            </div>
        </div>
    )
}

export default PostDetailPage

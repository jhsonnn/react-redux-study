import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬 독학",
  ]);
  const [like, setLike] = useState(0);
  const [modal, setModal] = useState(false);

  const handleClickLike = () => {
    setLike(like + 1);
  };

  const handleClickTitle = () => {
    let prevTitle = [...title];
    prevTitle[0] = "여자 코트 추천";
    setTitle(prevTitle);
  };

  const handleClickSorting = () => {
    let prevTitle = [...title];
    const sortedTitle = prevTitle.sort((a, b) => b - a);
    setTitle(sortedTitle);
  };
  return (
    <div className='App'>
      <div className='black-nav'>
        <h4>ReactBlog</h4>
      </div>
      <button onClick={handleClickTitle}>글수정</button>
      <button onClick={handleClickSorting}>가나다순정렬</button>
      <div className='list'>
        <h4>
          {title[0]} <span onClick={handleClickLike}>🤟</span> {like}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{title[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4
          onClick={() => {
            setModal(true);
          }}
        >
          {title[2]}
        </h4>
        <p>2월 17일 발행</p>
      </div>

      {modal === true ? <Modal /> : ""}
    </div>
  );
}

function Modal() {
  return (
    <div className='modal'>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;

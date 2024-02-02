import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
import ChildComponent from './ChildComponent';

function App() {

  const inputRef = useRef();

  const handleClick = ()=>{
    inputRef.current.focus()
  }

  return (
    <div className="App">
      <header className="App-header">
        <ChildComponent ref={inputRef} />
        <button onClick={handleClick}>클릭</button>
      </header>
    </div>
  );
}

export default App;

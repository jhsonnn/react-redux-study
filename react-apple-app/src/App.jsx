import './App.css';
import styled from 'styled-components';
import Nav from './components/MovieModal/Nav';
import Banner from './components/MovieModal/Banner';

function App() {

  return (
    <Container>
      <Nav />
      <Banner />
    </Container>
  )
}

const Container =  styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 70px;
  padding: 0 calc(3.5vw + 5px);
`

export default App

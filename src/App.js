import Header from "./components/Header"
import Activities from "./components/Activities";
import Parks from "./components/Parks";
import Park from "./components/Park";
import Webcam from "./components/Webcam";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route exact path="/" element={<Activities />} />
          <Route exact path='/parks/:activity' element={<Parks />} />
          <Route exact path='/park/:fname' element={<Park />} />
          <Route exact path='/park/webcam/:fname' element={<Webcam />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

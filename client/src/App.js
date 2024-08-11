import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/ID_Header';
import Content from './components/Home/ID_Content';
import Visual from './components/Details/visual';
import ChartsContainer from './components/Summary/ChartsContainer';
import './App.css';

const App = () => {
  
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">

          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/home" element={<ChartsContainer />} />
            <Route path="/profile/:kolId" element={<Visual />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
};

export default App;

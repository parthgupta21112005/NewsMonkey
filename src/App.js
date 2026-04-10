import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<News pageSize={5} country="us" category="general"/>} />
          <Route path="/business" element={<News pageSize={5} country="us" category="business"/>} />
          <Route path="/entertainment" element={<News pageSize={5} country="us" category="entertainment"/>} />
          <Route path="/sports" element={<News pageSize={5} country="us" category="sports"/>} />
          <Route path="/general" element={<News pageSize={5} country="us" category="general"/>} />
          <Route path="/health" element={<News pageSize={5} country="us" category="health"/>} />
          <Route path="/science" element={<News pageSize={5} country="us" category="science"/>} />
          <Route path="/technology" element={<News pageSize={5} country="us" category="technology"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Stream from "./components/Stream";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/stream" element={<Stream />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

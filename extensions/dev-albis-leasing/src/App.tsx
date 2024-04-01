import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AlbisLeasing } from "./pages/albisLeasing";
import { AlbisRequest } from "./pages/albisRequest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pages/albis-leasing" element={<AlbisLeasing />} />
        <Route path="/pages/albis-leasing-request" element={<AlbisRequest />} />
      </Routes>
    </Router>
  );
}

export default App;

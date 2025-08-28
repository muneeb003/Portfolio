import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dash from "./pages/Dash.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

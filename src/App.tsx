import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignOn } from "./pages/SignOn";
import { Skills } from "./pages/Skills";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignOn/>}/>
          <Route path="/signon" element={<SignOn/>}/>
          <Route path="/skills" element={<Skills/>}/>
        </Routes>
      </BrowserRouter>
    </>  
  );
}

export default App;

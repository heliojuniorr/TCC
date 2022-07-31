import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignOn } from "./pages/SignOn";
import { Skills } from "./pages/Skills";
import { SkillDetails } from "./pages/SkillDetails";
import { Search } from "./pages/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignOn/>}/>
          <Route path="/signon" element={<SignOn/>}/>
          <Route path="/skills" element={<Skills/>}/>
          <Route path="/skilldetails/:skill" element={<SkillDetails/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </>  
  );
}

export default App;

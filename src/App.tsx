import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from "./pages/SignUp";
import { Skills } from "./pages/Skills";
import { SkillDetails } from "./pages/SkillDetails";
import { Search } from "./pages/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/skills" element={<Skills/>}/>
          <Route path="/skilldetails/:skill" element={<SkillDetails/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </>  
  );
}

export default App;

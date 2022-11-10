import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from "./pages/SignUp";
import { Skills } from "./pages/Skills";
import { SkillDetails } from "./pages/SkillDetails";
import { Search } from "./pages/Search";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { AuthContextProvider } from "./context/AuthContext";
import { Chats } from "./pages/Chats";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/skills" element={<Skills/>}/>
            <Route path="/skilldetails/:skill" element={<SkillDetails/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/chats" element={<Chats/>}/>
            <Route path="/chat/:id" element={<Chat/>}/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>  
  );
}

export default App;

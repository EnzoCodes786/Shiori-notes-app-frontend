import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteCard from "./component/notesCard";
import MainGrid from "./pages/mainGrid";
import LoginCard from "./component/loginCard";
import SignUpCard from "./component/signupCard";
import ForgotPasswordCard from "./component/forgotPassword";
import VerifyOtp from "./component/verifyOTP";
import NewNote from "./component/newNote";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/register" element={<SignUpCard />} />
        <Route path="/forgotPassword" element={<ForgotPasswordCard />} />
        <Route path="/verifyOTP" element={<VerifyOtp />} />
        <Route path="/landingPage" element={<MainGrid />} />
        <Route path="/newNote" element={<NewNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

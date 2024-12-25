import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className={`text-foreground bg-background`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster toastOptions={{ className: "font-clashDisplay" }} />
    </div>
  );
};

export default App;

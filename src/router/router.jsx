import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home.jsx";
import Login from "../pages/admin/login.jsx";
import Session from "../pages/admin/session.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

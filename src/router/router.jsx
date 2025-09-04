import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home.jsx";
import Login from "../pages/admin/login.jsx";
import Session from "../pages/admin/session.jsx";
import SessionForm from "../pages/admin/sessionForm.jsx";
import Attendant from "../pages/admin/attendant.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/session" element={<Session />} />
        <Route path="/session/form" element={<SessionForm />} />
        <Route path="/attendant" element={<Attendant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

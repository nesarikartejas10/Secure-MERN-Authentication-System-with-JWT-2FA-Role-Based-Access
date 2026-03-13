import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import NotFound from "./pages/auth/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Verify from "./pages/auth/Verify";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuth = true;
  return (
    <BrowserRouter>
      <Toaster position="top-right" expand={true} duration={4000} />
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/token/:token" element={<Verify />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

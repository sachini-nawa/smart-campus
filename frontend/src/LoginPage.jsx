import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResourcesPage from "./pages/ResourcesPage";
import BookingsPage from "./pages/BookingsPage";
import TicketsPage from "./pages/TicketsPage";


function LoginButton() {
  const login = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return <button onClick={login}>Sign in with Google</button>;
}

export default LoginButton;
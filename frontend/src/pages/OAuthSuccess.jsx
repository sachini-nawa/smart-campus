import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = params.get("email");
    const role = params.get("role");

    localStorage.setItem("email", email || "");
    localStorage.setItem("role", role || "USER");
    localStorage.setItem("authenticated", "true");

    navigate("/");
  }, [params, navigate]);

  return <div>Signing you in...</div>;
}

export default OAuthSuccess;
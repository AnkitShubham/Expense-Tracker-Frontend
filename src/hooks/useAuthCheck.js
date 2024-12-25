import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");

    if (!jwtToken || !email || !userId) {
      // Redirect to the login page if any of the values are missing
      navigate("/login");
    }
  }, [navigate]); // Dependencies ensure this effect runs once after component mounts
};

export default useAuthCheck;

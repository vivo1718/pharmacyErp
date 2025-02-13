import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = ({ onLogout }) => {
  const navigate = useNavigate();
  const timeoutDuration = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    const resetTimer = () => {
      localStorage.setItem("lastActivityTime", Date.now().toString());
    };

    const checkInactivity = () => {
      const lastActivityTime = parseInt(localStorage.getItem("lastActivityTime"), 10);
      if (Date.now() - lastActivityTime > timeoutDuration) {
        onLogout(); // Call the logout function
        navigate("/"); // Redirect to login
      }
    };

    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    const interval = setInterval(checkInactivity, 60000); // Check every 1 minute

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearInterval(interval);
    };
  }, [navigate, onLogout]);

  return null;
};

export default AutoLogout;

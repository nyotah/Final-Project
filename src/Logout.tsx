import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <button //logout button with onClick event listner pointing back to handleLogout function above
      className="btn btn-outline-danger mt-3"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

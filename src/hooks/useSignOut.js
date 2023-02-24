import { useNavigate } from "react-router-dom";

export function useSignOut() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      navigate("/");
      document.location.reload(true);
    }
  };

  return [handleSignOut];
}

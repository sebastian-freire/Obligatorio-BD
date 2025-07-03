import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/menu");
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    goToMenu,
    goBack,
    navigate
  };
}

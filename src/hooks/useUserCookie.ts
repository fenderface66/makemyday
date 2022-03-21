import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function useUserCookie() {
  const history = useHistory();

  const getUserFromCookie = () => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      return history.push("/login");
    }
    return JSON.parse(userCookie as string);
  };

  return getUserFromCookie;
}

export default useUserCookie;

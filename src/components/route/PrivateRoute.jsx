import { Navigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [auth, _] = useLocalStorage("auth", false);
  const [session, __] = useLocalStorage("session", null);

  return !auth && !session ? <Navigate to="/" /> : children;
};
export default PrivateRoute;

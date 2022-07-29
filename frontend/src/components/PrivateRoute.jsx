import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const customId = "custom-id-yes";

  if (!loggedIn) {
    toast.error("Log in first", {
      toastId: customId,
    });
    toast.clearWaitingQueue();
  }

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

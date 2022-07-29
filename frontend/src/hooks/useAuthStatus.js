import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Check if user is loged in before going to private pages
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};

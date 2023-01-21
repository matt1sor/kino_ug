import { useSelector } from "react-redux";

export const useIsAdmin = () => {
  const userRole = useSelector((state) => state.auth.userData?.role);

  return userRole === "admin";
};

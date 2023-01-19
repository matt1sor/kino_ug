import { Route, Routes } from "react-router-dom";
import Login from "../pages/users/Login";
import { useSelector } from "react-redux";

function Mainroutes() {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
        <Route path="/repertoire" element={<Repertoire/>}
          <Route path={"*"} element={<Navigate to={"/movies"} />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm/>}
        </>
      )}
    </Routes>
  );
}

export default Mainroutes;

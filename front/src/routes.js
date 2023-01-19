import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/users/Login";
import RegisterForm from "./pages/users/RegisterForm";
import { useSelector } from "react-redux";
import Repertoire from "./pages/repertoire/Repertoire";
import { Fragment } from "react";

function Mainroutes() {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <Fragment>
            <Route path="/repertoire" element={<Repertoire />} />
            <Route path="*" element={<Navigate to={"/repertoire"} />} />
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<RegisterForm />} />
          </Fragment>
        )}
      </Routes>
    </>
  );
}

export default Mainroutes;

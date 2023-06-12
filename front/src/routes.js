import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/users/Login";
import RegisterForm from "./pages/users/RegisterForm";
import { useSelector } from "react-redux";
import Repertoire from "./pages/repertoire/Repertoire";
import { Fragment } from "react";
import RepertoireForm from "./pages/repertoire/RepertoireForm";
import RepertoireEdit from "./pages/repertoire/RepertoireEdit";
import { useIsAdmin } from "./hooks/useIsAdmin";
import Movies from "./pages/movies/Movies";
import Movie from "./pages/movies/Movie";
import MoviesForm from "./pages/movies/MoviesForm";
import MovieEdit from "./pages/movies/MovieEdit";
import Orders from "./pages/order/Orders";
import OrdersForm from "./pages/order/OrdersForm";
import Users from "./pages/users/Users";
import UsersEdit from "./pages/users/UsersEdit";

function Mainroutes() {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);
  const isAdmin = useIsAdmin();

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <Fragment>
            <Route path="/repertoire" element={<Repertoire />} />
            <Route path="/movie/:id" element={<Movie />} />
            {isAdmin && (
              <Route path="/repertoire/add" element={<RepertoireForm />} />
            )}
            {isAdmin && (
              <Route path="/repertoire/edit/:id" element={<RepertoireEdit />} />
            )}
            {isAdmin && <Route path="/movies" element={<Movies />} />}
            {isAdmin && <Route path="/order" element={<Orders />} />}
            {isAdmin && <Route path="/users" element={<Users />} />}

            {isAdmin && (
              <Route path="/order/edit/:id" element={<OrdersForm />} />
            )}
            {isAdmin && (
              <Route path="/users/edit/:id" element={<UsersEdit />} />
            )}
            {isAdmin && <Route path="/movies/add" element={<MoviesForm />} />}
            {isAdmin && (
              <Route path="/movies/edit/:id" element={<MovieEdit />} />
            )}

            <Route path="*" element={<Navigate to={"/repertoire"} />} />
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/users/login" element={<Login />} />
            <Route path="/auth/google" />
            <Route path="/users/register" element={<RegisterForm />} />
            <Route path="*" element={<Navigate to={"/users/login"} />} />
          </Fragment>
        )}
      </Routes>
    </>
  );
}

export default Mainroutes;

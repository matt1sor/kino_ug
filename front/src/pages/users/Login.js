import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { Fragment, useState } from "react";
import { loginHandler } from "../../store/features/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().max(50, "Login is too long!").required(),
      password: Yup.string().max(100, "Wrong password!").required(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(loginHandler(values));
      formik.resetForm();
      navigate("/repertoire");
    },
  });

  return (
    <Fragment>
      {loading && <span>Loading...</span>}
      <form onSubmit={formik.handleSubmit}>
        <input
          id="login"
          name="login"
          type="text"
          onChange={formik.handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/users/register">Nie masz konta? Zarejestruj sie!</Link>
    </Fragment>
  );
}

export default Login;

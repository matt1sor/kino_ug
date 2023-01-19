import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { Fragment, useState } from "react";
import { loginHandler } from "../../store/features/auth";

function Login() {
  const dispatch = useDispatch();

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
    </Fragment>
  );
}

export default Login;

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { registerPost } from "../../store/features/users";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(100, "Name is too long").required(),
      login: Yup.string().max(50, "Login is too long!").required(),
      password: Yup.string().max(100, "Password too long!").required(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(registerPost(values));
      formik.resetForm();
      navigate("/users/login");
    },
  });
  return (
    <Fragment>
      {loading && <span>Loading...</span>}
      <form onSubmit={formik.handleSubmit}>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
        />
        <br />
        <input
          id="login"
          name="login"
          type="text"
          onChange={formik.handleChange}
        />
        <br />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
}

export default RegisterForm;

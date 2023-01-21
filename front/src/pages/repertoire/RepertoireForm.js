import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchRepertoires,
  repertoireAdd,
} from "../../store/features/repertoire";
import { useDispatch, useSelector } from "react-redux";

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function RepertoireForm() {
  const navigate = useNavigate();
  const isLoading = useSelector((store) => store.repertoire.loading);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      movieTitle: "",
      day: "",
      time: "",
      hall: "",
    },
    validationSchema: Yup.object({
      movieTitle: Yup.string().max(100, "title is too long").required(),
      day: Yup.string().max(50, "Wrong date").required(),
      time: Yup.string().max(100, "Wrong time").required(),
      hall: Yup.number().positive().required(),
    }),
    onSubmit: (values) => {
      dispatch(repertoireAdd(values));
      formik.resetForm();
      dispatch(fetchRepertoires());
      //navigate("/repertoire");
    },
  });

  return (
    <Fragment>
      {isLoading && <span>Loading...</span>}
      <form onSubmit={formik.handleSubmit}>
        <input
          id="movieTitle"
          name="movieTitle"
          type="text"
          onChange={formik.handleChange}
        />
        <br />
        <input id="day" name="day" type="date" onChange={formik.handleChange} />
        <br />
        <input
          id="time"
          name="time"
          type="text"
          onChange={formik.handleChange}
        />
        <br />
        <input
          id="hall"
          name="hall"
          type="number"
          onChange={formik.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <button onClick={() => navigate(-1)}>Back</button>
    </Fragment>
  );
}

export default RepertoireForm;

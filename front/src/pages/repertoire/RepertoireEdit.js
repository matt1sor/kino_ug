import { useFormik } from "formik";
import * as Yup from "yup";
import { repertoireEdit } from "../../store/features/repertoire";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RepertoireEdit() {
  useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
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
    onSubmit: async (values) => {
      setLoading(true);
      const data = { id: params.id, ...values };
      dispatch(repertoireEdit(data));
      formik.resetForm();
      navigate("/repertoire");
    },
  });

  return (
    <Fragment>
      {loading && <span>Loading...</span>}
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

export default RepertoireEdit;

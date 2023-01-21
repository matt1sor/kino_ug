import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchRepertoires,
  repertoireDelete,
} from "../../store/features/repertoire";
import { useNavigate } from "react-router-dom";
import { useIsAdmin } from "../../hooks/useIsAdmin";

function Repertoire() {
  const repertoire = useSelector((state) => state.repertoire.repertoires);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    dispatch(fetchRepertoires());
  }, [dispatch]);
  return (
    <div>
      <ul>
        {repertoire.map((rep) => (
          <div key={rep._id}>
            <li>{rep.movieTitle}</li>
            <button onClick={() => navigate(`/repertoire/${rep._id}/edit`)}>
              Edit
            </button>
            <button
              onClick={() => {
                dispatch(repertoireDelete(rep._id));
                dispatch(fetchRepertoires());
              }}
            >
              delete
            </button>
          </div>
        ))}
      </ul>
      {isAdmin && (
        <button onClick={() => navigate("/repertoire/add")}>add</button>
      )}
    </div>
  );
}

export default Repertoire;

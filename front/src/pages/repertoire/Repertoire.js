import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRepertoires } from "../../store/features/repertoire";

function Repertoire() {
  const repertoire = useSelector((state) => state.repertoire.repertoires);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRepertoires());
  }, [dispatch]);
  return (
    <div>
      <ul>
        {repertoire.map((rep) => (
          <li key={rep._id}>{rep.hall}</li>
        ))}
      </ul>
    </div>
  );
}

export default Repertoire;

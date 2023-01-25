import Mainroutes from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialize } from "./store/features/auth";

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(initialize());
  // }, []);

  return <Mainroutes />;
}

export default App;

import { backendInstance } from "../../backendInstance";

const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  repertoires: [],
  error: " ",
};

export const fetchRepertoires = createAsyncThunk(
  "repertoire",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.get("repertoire", {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return data;
  }
);

// export const fetchRepertoires = createAsyncThunk(
//   "repertoire/fetchRepertoires",
//   () => {
//     const token = useSelector((store) => store.auth.token);
//     return axios
//       .get("https://localhost:5556/movies", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => response.data);
//   }
// );

const repertoireSlice = createSlice({
  name: "repertoire",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRepertoires.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRepertoires.fulfilled, (state, action) => {
      state.loading = false;
      state.repertoires = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRepertoires.rejected, (state, action) => {
      state.loading = false;
      state.repertoires = [];
      state.error = action.error.message;
    });
  },
});

// export const repertoireSlice = createSlice({
//   name: "repertoire",
//   initialState: {
//     rep: [],
//   },
//   reducers: {
//     getRepertoire: (state, action) => {
//       state.rep = action.payload;
//     },
//   },
// });
//
// export const fetchRepertoires = () => async (dispatch) => {
//   const token = useSelector((store) => store.auth.token);
//   const res = await axios.get("https://localhost:5556/movies", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//
//   dispatch(getRepertoire(res.data));
// };

export const { getRepertoire } = repertoireSlice.actions;
export default repertoireSlice.reducer;

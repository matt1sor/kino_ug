import { backendInstance } from "../../backendInstance";
import _ from "lodash";

const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  repertoires: [],
  error: " ",
};

export const fetchRepertoires = createAsyncThunk(
  "repertoire/repFecth",
  async ({ sortBy, dir }, thunkApi) => {
    const { data } = await backendInstance.get("repertoire", {
      params: { sortBy, dir },
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return data;
  }
);

export const repertoireAdd = createAsyncThunk(
  "repertoire/repertoireAdd",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.post(
      "repertoire/add",
      {
        movieId: payload.movieId,
        day: payload.day,
        time: payload.time,
        hall: payload.hall,
      },
      {
        headers: {
          Authorization: `Bearer ${thunkApi.getState().auth.token}`,
        },
      }
    );
    return data;
  }
);

export const repertoireEdit = createAsyncThunk(
  "repertoire/repertoireEdit",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.patch(
      `repertoire/edit/${payload.id}`,
      _.omitBy(
        {
          day: payload.day,
          time: payload.time,
          hall: payload.hall,
        },
        (value) => value === ""
      ),
      {
        headers: {
          Authorization: `Bearer ${thunkApi.getState().auth.token}`,
        },
      }
    );

    return data;
  }
);

export const repertoireDelete = createAsyncThunk(
  "repertoire/repertoireDelete",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.delete(`repertoire/${payload}`, {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return { data, payload };
  }
);

const repertoireSlice = createSlice({
  name: "repertoire",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepertoires.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepertoires.fulfilled, (state, action) => {
        state.loading = false;
        state.repertoires = action.payload;
        state.error = "";
      })
      .addCase(fetchRepertoires.rejected, (state, action) => {
        state.loading = false;
        state.repertoires = [];
        state.error = "error";
      })

      .addCase(repertoireAdd.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(repertoireAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.repertoires = [...state.repertoires, action.payload];
        state.error = "";
      })
      .addCase(repertoireAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      })

      .addCase(repertoireEdit.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(repertoireEdit.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.repertoires = state.repertoires.map((rep) =>
            rep._id === id ? action.payload : rep
          );
        }
      })
      .addCase(repertoireEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(repertoireDelete.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(repertoireDelete.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.payload;
        state.repertoires = state.repertoires.filter((rep) => rep._id !== id);
      })
      .addCase(repertoireDelete.rejected, (state, action) => {
        state.loading = true;
        state.error = "";
      });
  },
});

export const { getRepertoire } = repertoireSlice.actions;
export default repertoireSlice.reducer;

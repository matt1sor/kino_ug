import { backendInstance } from "../../backendInstance";

const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  repertoires: [],
  error: " ",
};

export const fetchRepertoires = createAsyncThunk(
  "repertoire/repFecth",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.get("repertoire", {
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
        movieTitle: payload.movieTitle,
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
    return await backendInstance.patch(
      `repertoire/${payload.id}/edit`,
      {
        movieTitle: payload.movieTitle,
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
  }
);

export const repertoireDelete = createAsyncThunk(
  "repertoire/repertoireDelete",
  async (payload, thunkApi) => {
    const del = await backendInstance.delete(`repertoire/${payload}`, {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return { del, payload };
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

        state.error = action.error.message;
      })

      .addCase(repertoireAdd.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(repertoireAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(repertoireAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })

      .addCase(repertoireEdit.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(repertoireEdit.fulfilled, (state, action) => {
        state.loading = false;
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

        console.log(state);
      })
      .addCase(repertoireDelete.rejected, (state, action) => {
        state.loading = true;
        state.error = "";
      });
  },
});

export const { getRepertoire } = repertoireSlice.actions;
export default repertoireSlice.reducer;

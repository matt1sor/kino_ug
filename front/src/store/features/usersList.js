import { backendInstance } from "../../backendInstance";
import _ from "lodash";

const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  usersList: [],
  error: " ",
};

export const fetchUsers = createAsyncThunk(
  "users/usersFetch",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.get("users", {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return data;
  }
);

export const usersEdit = createAsyncThunk(
  "users/usersEdit",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.patch(
      `users/edit/${payload.id}`,
      _.omitBy(
        {
          login: payload.login,
          password: payload.password,
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

export const usersDelete = createAsyncThunk(
  "users/usersDelete",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.delete(`users/${payload}`, {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return { data, payload };
  }
);

const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.orders = [];
        state.error = "error";
      })

      .addCase(usersEdit.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(usersEdit.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.usersList = state.usersList.map((rep) =>
            rep._id === id ? action.payload : rep
          );
        }
      })
      .addCase(usersEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(usersDelete.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(usersDelete.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.payload;
        state.usersList = state.usersList.filter((rep) => rep._id !== id);
      })
      .addCase(usersDelete.rejected, (state, action) => {
        state.loading = true;
        state.error = "";
      });
  },
});

export default usersListSlice.reducer;

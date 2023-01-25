import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendInstance } from "../../backendInstance";
import { fetchRepertoires } from "./repertoire";

const initialState = {
  token: null,
  userData: null,
  error: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      localStorage.setItem("token", action.payload.token);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initialize.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    });
  },
});

export const initialize = createAsyncThunk("initilize", async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw 1;
  }

  const whoami = await backendInstance.get("users/whoami", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { token, userData: whoami.data };
});

export const loginHandler = (values) => async (dispatch) => {
  try {
    const { data } = await backendInstance.post("users/login", {
      login: values.login,
      password: values.password,
    });
    const whoami = await backendInstance.get("users/whoami", {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });

    dispatch(saveToken({ token: data, userData: whoami.data }));
  } catch (e) {}
};

export const { saveToken } = authSlice.actions;
export default authSlice.reducer;

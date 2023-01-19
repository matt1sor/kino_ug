import { createSlice } from "@reduxjs/toolkit";
import { backendInstance } from "../../backendInstance";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const loginHandler = (values) => async (dispatch) => {
  try {
    const { data } = await backendInstance.post("users/login", {
      login: values.login,
      password: values.password,
    });
    dispatch(saveToken(data));
  } catch (e) {}
};

export const { saveToken } = authSlice.actions;
export default authSlice.reducer;

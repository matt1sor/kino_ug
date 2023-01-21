import { createSlice } from "@reduxjs/toolkit";
import { backendInstance } from "../../backendInstance";

const initialState = {
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
  },
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

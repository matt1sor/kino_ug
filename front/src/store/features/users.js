import { createSlice } from "@reduxjs/toolkit";
import { backendInstance } from "../../backendInstance";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const fetchData = () => async (dispatch) => {
  const users = await backendInstance.get("/users");
  dispatch(getUsers(users));
};

export const { getUsers } = usersSlice.actions;
export default usersSlice.reducer;

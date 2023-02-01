import { backendInstance } from "../../backendInstance";
import _ from "lodash";

const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  orders: [],
  error: " ",
};

export const fetchOrders = createAsyncThunk(
  "orders/ordersFecth",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.get("order", {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return data;
  }
);

export const orderAdd = createAsyncThunk(
  "orders/orderAdd",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.post(
      "order/add",
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

export const orderEdit = createAsyncThunk(
  "orders/orderEdit",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.patch(
      `order/edit/${payload.id}`,
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

export const orderDelete = createAsyncThunk(
  "orders/orderDelete",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.delete(`order/${payload}`, {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return { data, payload };
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = "";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.orders = [];
        state.error = "error";
      })

      .addCase(orderAdd.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [...state.orders, action.payload];
        state.error = "";
      })
      .addCase(orderAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      })

      .addCase(orderEdit.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(orderEdit.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.orders = state.orders.map((rep) =>
            rep._id === id ? action.payload : rep
          );
        }
      })
      .addCase(orderEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(orderDelete.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(orderDelete.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.payload;
        state.orders = state.orders.filter((rep) => rep._id !== id);
      })
      .addCase(orderDelete.rejected, (state, action) => {
        state.loading = true;
        state.error = "";
      });
  },
});

export default orderSlice.reducer;

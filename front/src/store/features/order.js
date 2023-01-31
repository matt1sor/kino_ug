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
  "order/orderAdd",
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

// export const repertoireEdit = createAsyncThunk(
//     "repertoire/repertoireEdit",
//     async (payload, thunkApi) => {
//         const { data } = await backendInstance.patch(
//             `repertoire/edit/${payload.id}`,
//             _.omitBy(
//                 {
//                     day: payload.day,
//                     time: payload.time,
//                     hall: payload.hall,
//                 },
//                 (value) => value === ""
//             ),
//             {
//                 headers: {
//                     Authorization: `Bearer ${thunkApi.getState().auth.token}`,
//                 },
//             }
//         );
//
//         return data;
//     }
// );

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
      });

    // .addCase(repertoireEdit.pending, (state, action) => {
    //   state.loading = true;
    //   state.error = "";
    // })
    // .addCase(repertoireEdit.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const { id } = action.payload;
    //   if (id) {
    //     state.repertoires = state.repertoires.map((rep) =>
    //       rep._id === id ? action.payload : rep
    //     );
    //   }
    // })
    // .addCase(repertoireEdit.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = "";
    // })
    // .addCase(repertoireDelete.pending, (state, action) => {
    //   state.loading = true;
    //   state.error = "";
    // })
    //
    // .addCase(repertoireDelete.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const id = action.payload.payload;
    //   state.repertoires = state.repertoires.filter((rep) => rep._id !== id);
    // })
    // .addCase(repertoireDelete.rejected, (state, action) => {
    //   state.loading = true;
    //   state.error = "";
    // });
  },
});

export default orderSlice.reducer;

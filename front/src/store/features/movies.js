import { backendInstance } from "../../backendInstance";

const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  movies: [],

  error: " ",
};

export const fetchMovies = createAsyncThunk(
  "movies/moviesFetch",
  async ({ sortBy, dir }, thunkApi) => {
    const { data } = await backendInstance.get("movies", {
      params: {
        sortBy,
        dir,
      },
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return data;
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ search }, thunkApi) => {
    const { data } = await backendInstance.get("movies/search", {
      params: { search },
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return data;
  }
);

export const fetchMovie = createAsyncThunk(
  "movies/movieFetch",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.get(`movies/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return data;
  }
);

export const moviesAdd = createAsyncThunk(
  "movies/movieAdd",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.post(
      "movies/add",
      {
        title: payload.title,
        genre: payload.genre,
        relasedate: payload.relasedate,
        director: payload.director,
        poster: payload.poster,
        duration: payload.duration,
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

export const moviesEdit = createAsyncThunk(
  "movies/moviesEdit",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.patch(
      `movies/edit/${payload.id}`,
      {
        title: payload.title,
        genre: payload.genre,
        relasedate: payload.relasedate,
        director: payload.director,
        poster: payload.poster,
        duration: payload.duration,
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

export const movieDelete = createAsyncThunk(
  "movies/movieDelete",
  async (payload, thunkApi) => {
    const { data } = await backendInstance.delete(`movies/${payload}`, {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().auth.token}`,
      },
    });
    return { data, payload };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = "";
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.error = "error";
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = "";
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.error = "error";
      })
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = "";
      })

      .addCase(moviesAdd.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(moviesAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, action.payload];
        state.error = "";
      })
      .addCase(moviesAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      })

      .addCase(moviesEdit.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(moviesEdit.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.movies = state.movies.map((movie) =>
            movie._id === id ? action.payload : movie
          );
        }
      })
      .addCase(moviesEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(movieDelete.pending, (state, action) => {
        state.loading = true;

        state.error = "";
      })

      .addCase(movieDelete.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.payload;
        state.movies = state.movies.filter((item) => item._id !== id);
      })
      .addCase(movieDelete.rejected, (state, action) => {
        state.loading = true;
        state.error = "";
      });
  },
});

export default moviesSlice.reducer;

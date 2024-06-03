import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let inistialstate = {
  todo: [],
  completedTask: [],
  uncompletedTask: [],
  isLoading: false,
  isError: false,
};

// fetch Data
export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ endpoint }, { rejectWithValue }) => {
    try {
      let res = await axios.get(`http://localhost:8001/v1/todo/${endpoint}`);
      return { data: res.data.result, endpoint };
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

// Post Data

export const postData = createAsyncThunk(
  "postData",
  async ({ data }, { rejectWithValue }) => {
    console.log("🚀 ~ data:", data)
    try {
      let res = await axios.post("http://localhost:8001/v1/todo/post", data);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

// delete Data
export const deleteData = createAsyncThunk(
  "deleteData",
  async (id, { rejectWithValue }) => {
    try {
      let res = await axios.delete(
        `http://localhost:8001/v1/todo/delete/${id}`
      );
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

// Update Data
export const updateData = createAsyncThunk(
  "updateData",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let res = await axios.put(
        `http://localhost:8001/v1/todo/update/${id}`,
        data
      );
      return res.data.body;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: inistialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action)
        state.isLoading = false;
        state.isError = false;
        const { data, endpoint } = action.payload;
        switch (endpoint) {
          case "get":
            state.todo = data;
            break;
          case "completed":
            state.completedTask = data;
            break;
          case "uncompleted":
            state.uncompletedTask = data;
            break;
          default:
            break;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(postData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todo = state.todo.concat(action.payload);
      })
      .addCase(postData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deleteData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todo = state.todo.filter(
          (state) => state._id !== action.payload._id
        );
      })

      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.isLoading = false;
                 
        state.todo = state.todo.map((todo) =>
          todo._id == action.payload._id ? action.payload : todo
        );
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default todoSlice.reducer;

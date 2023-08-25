import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { login, register } from "./api";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const { name, email, password, confirmPassword } = user;
      console.log(name, email, password, confirmPassword);
      const token = await axios.post(`${register}`, {
        name,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { email, password } = user;
      console.log(email, password);
      const response = await axios.post(`${login}`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state,action){
      const token = state.token;
      if(token){
        const user = jwtDecode(token);

        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        }
      }
    },
    logoutUser(state,action){
      localStorage.removeItem("token");
      return {
        ...state,
        token : "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        return {
          ...state,
          registerStatus: "pending",
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload) {
          const user = jwtDecode(action.payload);
          return {
            ...state,
            token: action.payload,
            name: user.name,
            email: user.email,
            _id: user._id,
            registerStatus: "success",
            userLoaded: true,
          };
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        return {
          ...state,
          registerError: action.payload,
          registerStatus: "rejected",
        };
      });

    //login user

    builder
      .addCase(loginUser.pending, (state, action) => {
        return {
          ...state,
          loginStatus: "pending",
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          const user = jwtDecode(action.payload);
          return {
            ...state,
            token: action.payload,
            email: user.email,
            _id: user._id,
            loginStatus: "success",
            userLoaded: true,
          };
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          loginError: action.payload,
          loginStatus: "rejected",
        };
      });
  },
});

export const {loadUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import axios from "axios";
import type { RegisterPayload } from "@/lib/types/auth";
import { toast } from "sonner";
import { RootState } from "../store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export type ResponseUser = {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
};

type loginUser ={
    email:string,
    password:string
}


export const validateUser = createAsyncThunk(
  "auth/validateUser",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (!accessToken || !refreshToken) {
        return thunkAPI.rejectWithValue({ message: "No tokens found" });
      }

      try {
        // 1. Try validating the current access token
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/auth/profile",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        return { user: response.data, access_token: accessToken, refresh_token: refreshToken };
      } catch (err: any) {
        // 2. Access token expired/invalid -> try refreshing it
        if (err.response?.status === 401) {
          const refreshResponse = await axios.post(
            "https://api.escuelajs.co/api/v1/auth/refresh-token",
            { refreshToken }
          );

          const newAccessToken = refreshResponse.data.access_token;
          const newRefreshToken = refreshResponse.data.refresh_token;

          // 3. Retry profile fetch with the new access token
          const profileResponse = await axios.get(
            "https://api.escuelajs.co/api/v1/auth/profile",
            {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            }
          );

          // Clear previous tokens
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);

          // 4. Persist the refreshed tokens
          localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);

          return {
            user: profileResponse.data,
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          };
        }

        throw err;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response
          ? { message: error.response.data }
          : { message: "Failed validating user" }
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data: RegisterPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        {...data, avatar:"https://i.pravatar.cc/300?img=12"}
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response
          ? { message: error.response.data }
          : { message: "Failed creating user" }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: loginUser, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {...data}
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response
          ? { message: error.response.data }
          : { message: "Failed logging user" }
      );
    }
  }
);

type InitialState = {
  isLoggedIn: boolean;
  jwt: string;
  user:ResponseUser | null,
  access_token:string,
  refresh_token:string
};

const initialState: InitialState = {
  isLoggedIn: false,
  jwt: "",
  user:null,
  access_token:"",
  refresh_token:""
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logIn: (state, action: PayloadAction) => {
      state.isLoggedIn = true;
      // state.jwt = action.payload;
    },
    logout: (state) => {
      // Clear localStorage
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      // Clear cookies
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

      document.cookie =
        "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

      // Clear Redux state
      state.access_token = "";
      state.refresh_token = "";
      state.isLoggedIn = false;

      toast.success("Logged out successfully");
    }
  },

  extraReducers: (builder) => {
    builder

      // Request started
      .addCase(createUser.pending, (state) => {
        // optional
      })

      // User successfully created
      .addCase(createUser.fulfilled, (state, action) => {
        // state.isLoggedIn = true;
        toast.success("Account created successfully");
        console.log(action.payload, 'user')
        state.user = action.payload

        // If your API returns a token:
        // state.jwt = action.payload.access_token;
      })

      // User creation failed
      .addCase(createUser.rejected, (state, action) => {
        state.isLoggedIn = false;

        console.log(action.payload);
      })
      
      // Request started
      .addCase(loginUser.pending, (state) => {
        // optional
      })

      // User successfully created
      .addCase(loginUser.fulfilled, (state, action) => {
            const { access_token, refresh_token } = action.payload;

            // Clear previous tokens
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);

            // Save new tokens
            localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
            localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

            document.cookie = `access_token=${encodeURIComponent(
                access_token
            )}; path=/; SameSite=Lax`;

            document.cookie = `refresh_token=${encodeURIComponent(
                refresh_token
            )}; path=/; SameSite=Lax`;

            // Update Redux state
            state.access_token = access_token;
            state.refresh_token = refresh_token;
            state.isLoggedIn = true;
            console.log(action.payload)
            toast.success(
                "Logged in successfully, redirecting to home page.."
            );
            })

      // User creation failed
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        toast.error("failed loggin in ")
        console.log(action.payload);
      })
            // Request started
      .addCase(validateUser.pending, (state) => {
        // optional
      })

      // Token(s) valid — user session restored
      .addCase(validateUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.jwt = action.payload.access_token;

        console.log(action.payload, "validated user");
      })

      // Both tokens invalid/expired — force logout
      .addCase(validateUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;

        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        console.log(action.payload);
      });
  },
});

export default authSlice.reducer;
export const {logout}=authSlice.actions;

export const currentIsLoggedIn = (state:RootState)=>state.auth.isLoggedIn
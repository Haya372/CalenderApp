import { createSlice } from "@reduxjs/toolkit";

// Stateの初期状態
const initialState = {
  name: "",
  user_id: "",
  pictureUrl: "",
};

// Sliceを生成する
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.user_id = action.payload.user_id;
      state.pictureUrl = action.payload.pictureUrl;
    }
  }
});

export default slice.reducer;

export const { setUser } = slice.actions;
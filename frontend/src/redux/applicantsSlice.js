import { createSlice } from "@reduxjs/toolkit";

const applicantsSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    // actions
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setApplicants } = applicantsSlice.actions;

export default applicantsSlice.reducer;

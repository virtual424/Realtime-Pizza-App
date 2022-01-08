import { createSlice } from "@reduxjs/toolkit";

const menuInitialState = {
  menu: [],
  showModal: false,
  editData: { Title: "", Price: "", Size: "", edit: false, editId: null },
};

const menuSlice = createSlice({
  name: "menu",
  initialState: menuInitialState,
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },

    addMenu(state, action) {
      state.showModal = true;
      state.editData = action.payload;
    },
    closeModal(state) {
      state.showModal = false;
      state.editData = {
        Title: "",
        Price: "",
        Size: "",
        edit: false,
        editId: null,
      };
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice.reducer;

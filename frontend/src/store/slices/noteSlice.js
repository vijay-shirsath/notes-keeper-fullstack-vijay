import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createNoteApi, deleteNoteByNoteId, getNotesApi } from "./api";

const initialState = {
  notes: [],
  addNoteStatus: "",
  addNoteError: "",
  getNoteStatus: "",
  getNoteError: "",
  newNoteAdded: false,
};
export const addNotes = createAsyncThunk(
  "notes/addNotes",
  async (notes, { rejectWithValue }) => {
    try {
      const { newNote, userId } = notes;
      const note = { ...newNote, userId };
      const response = await axios.post(`${createNoteApi}`, note);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getNotesApi}/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteId, {rejectWithValue}) => {
  try {
    const response = await axios.delete(`${deleteNoteByNoteId}/${noteId}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
})

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNotes.pending, (state, action) => {
        return {
          ...state,
          addNoteStatus: "pending",
        };
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        return {
          ...state,
          addNoteStatus: "success",
        };
      })
      .addCase(addNotes.rejected, (state, action) => {
        return {
          ...state,
          addNoteStatus: "rejected",
          addNoteError: action.payload,
        };
      });
    builder
      .addCase(getNotes.pending, (state, action) => {
        return {
          ...state,
          getNoteStatus: "pending",
        };
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        const notes = action.payload;
        const noteData = notes.map((note) => ({
          title: note.title,
          content: note.content,
          _id: note._id,
        }));
        return {
          ...state,
          notes: noteData,
          getNoteStatus: "success",
          newNoteAdded: true,
        };
      })
      .addCase(getNotes.rejected, (state, action) => {
        return {
          ...state,
          getNoteStatus: "rejected",
          getNoteError: action.payload,
        };
      });
      builder.addCase(deleteNote.pending, (state,action) => {
        return {
          ...state,
          deleteNoteStatus : "pending",
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const deleteNote = state.notes.filter((note) => note !== action.payload.deleteNote);  //action.payload.deleteNote comes from backend they both should not same return those

        return {
          ...state,
          notes : deleteNote,
          deleteNoteStatus : "success",
        }
      })
      .addCase(deleteNote.rejected, (state,action) => {
        return {
          ...state,
          deleteNoteStatus : "rejected",
          deleteNoteError : action.payload,
        }
      });
  },
});

export default notesSlice.reducer;

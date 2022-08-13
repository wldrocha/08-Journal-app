import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSaving: false,
  messageSaving: '',
  notes: [],
  active: null
}

export const journalSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    savingNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      // mutative code
      // state.notes.push(action.payload)
      state.notes = [...state.notes, action.payload]
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
    },
    setNotes: (state, action) => {},
    setSaving: (state) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {}
  }
})

// Action creators are generated for each case reducer function
export const { savingNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } =
  journalSlice.actions

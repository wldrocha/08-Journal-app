import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSaving: true,
  messageSaving: '',
  notes: []
  //   active: null
}

export const journalSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNewEmptyNote: (state, action) => {},
    setActiveNote: (state, action) => {},
    setNotes: (state, action) => {},
    setSaving: (state) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {}
  }
})

// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions

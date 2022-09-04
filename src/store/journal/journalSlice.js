import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSaving: false,
  messageSaving: '',
  notes: [],
  active: null
}

export const journalSlice = createSlice({
  name: 'journal',
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
      state.messageSaving = ''
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaving = ''
    },
    setNotes: (state, action) => {
      state.notes = [...action.payload]
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaving = ''
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) => (note.id === action.payload.id ? (note = action.payload) : note))
      state.isSaving = false
      state.messageSaving = `${action.payload.title}, updated succesfully`
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false
    },
    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },
    clearNotesLogout: (state) => {
      state = initialState
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  savingNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,  
  deleteNoteById,
  clearNotesLogout
} = journalSlice.actions

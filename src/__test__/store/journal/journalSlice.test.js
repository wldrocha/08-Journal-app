import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote
} from '../../../store/journal/journalSlice'
import { changeNote, emptynote, initialState, notes } from '../../journalFixtures/journalFixture'

describe('test on journalSlice', () => {
  test('should return initial state and journal send', () => {
    expect(journalSlice.name).toBe('journal')
    const state = journalSlice.reducer(initialState, {})
    expect(state).toEqual(initialState)
  })

  test('should state saving note', () => {
    const { 0: note } = notes
    const state = journalSlice.reducer(note, savingNote())

    expect(state.isSaving).toEqual(true)
  })
  test('should active note', () => {
    const { 0: noteToSet } = notes
    const state = journalSlice.reducer(initialState, setActiveNote({ ...noteToSet }))
    expect(state.active).toStrictEqual({ ...noteToSet })
  })

  test('should to add to new empty note', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(emptynote))
    expect(state.notes.at(0)).toEqual({ ...emptynote })
  })

  test('should to set notes', () => {
    const state = journalSlice.reducer(initialState, setNotes(notes))
    expect(state.notes).toEqual(notes)
  })

  test('should to set Saving', () => {
    const state = journalSlice.reducer(initialState, setSaving())
    expect(state.isSaving).toBe(true)
  })

  test('should to update note', () => {
    const state = journalSlice.reducer({ ...initialState, notes }, updateNote(changeNote))
    expect(state.notes.at(0)).toEqual(changeNote)
  })

  // test('should set photos to active note', () => {
  //   const { 2: noteToSet } = notes
  //   const state = journalSlice.reducer({...initialState, notes}, setActiveNote({ ...noteToSet }))

  // })
  test('should to delete note', () => {
    const state = journalSlice.reducer({ ...initialState, notes }, deleteNoteById(changeNote.id))
    expect(state.notes.length).toEqual(2)
  })
})

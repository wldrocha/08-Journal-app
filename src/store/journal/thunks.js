import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FireBaseDB } from '../../firebase/config'
import { addNewEmptyNote, setActiveNote, savingNote, loadNotes, setNotes } from './'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNote())
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`))

    await setDoc(newDoc, newNote)

    newNote.id = newDoc.id
    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingnotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if (!uid) throw new Error('El uid del usuario no existe')
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

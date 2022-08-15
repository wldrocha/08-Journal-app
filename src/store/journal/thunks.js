import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FireBaseDB } from '../../firebase/config'
import {
  addNewEmptyNote,
  setActiveNote,
  savingNote,
  loadNotes,
  setNotes,
  updateNote,
  setSaving,
  setPhotosToActiveNote,
  fileUpload
} from './'

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

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())
    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFirestore = { ...note }
    delete noteToFirestore.id
    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`)

    await setDoc(docRef, noteToFirestore, { merge: true })

    dispatch(updateNote(note))
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())
    const fileUploadPromises = []
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrl = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photosUrl))
  }
}

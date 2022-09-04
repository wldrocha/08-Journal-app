import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'
import { FireBaseDB } from '../../../firebase'
import { addNewEmptyNote, savingNote, setActiveNote, startNewNote } from '../../../store/journal'

describe('journal thunk test', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  beforeEach(() => jest.clearAllMocks())
  test('should to create empty new note', async () => {
    //mock authentication firebase
    const uid = 'test-UID-123'
    getState.mockReturnValue({ auth: { uid } })

    await startNewNote()(dispatch, getState)
    //se espera que el dispatch llame a la funcion pertinente
    expect(dispatch).toHaveBeenCalledWith(savingNote())
    expect(dispatch).toHaveBeenCalledWith(
      // cuando la funcion recibe un objeto se simula como debe ser el objeto
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number)
      })
    )
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number)
      })
    )
    const collectionRef = collection(FireBaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)

    const deletePromises = []
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)))

    await Promise.all(deletePromises)
  })
})

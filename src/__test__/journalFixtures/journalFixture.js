export const initialState = {
  isSaving: false,
  messageSaving: '',
  notes: [],
  active: null
}

export const notes = [
  {
    id: 'a1b2c3',
    title: 'title test',
    body: 'body test',
    date: 1661797876100,
    imageUrls: ['https://test.com']
  },
  {
    id: 'a2b2c3',
    title: 'title test 2',
    body: 'body test 2',
    date: 1661797876110,
    imageUrls: ['https://test.com']
  },
  {
    id: 'a3b2c3',
    title: 'title test 3',
    body: 'body test 3',
    date: 1661797876110,
    imageUrls: []
  }
]
export const changeNote = {
  id: 'a1b2c3',
  title: 'title change test ',
  body: 'body change test',
  date: 1661797876110,
  imageUrls: ['https://test.com']
}

export const emptynote = {
  title: '',
  body: '',
  date: new Date().getTime(),
  imageUrls: ['https://test.com']
}

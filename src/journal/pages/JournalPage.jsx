import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../'
import { AddOutlined } from '@mui/icons-material'
import { NothingSelectedView, NoteView } from '../views'
import { startNewNote } from '../../store/journal'

export const JournalPage = () => {
  const dispatch = useDispatch()
  const { isSaving, active } = useSelector((state) => state.journal)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }
  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'secondary.main',
          ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}

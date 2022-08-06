import { Typography } from '@mui/material'
import { JournalLayout } from '../'
import { NothingSelectedView, NoteView } from '../views'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <NothingSelectedView /> */}
      <NoteView />
    </JournalLayout>
  )
}

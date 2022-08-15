import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { setActiveNote } from '../../store/journal'

const SideBaritItem = ({ id, title = '', body, date, imageUrls = [] }) => {
  const dispatch = useDispatch()

  const newTitle = useMemo(() => (title.length > 17 ? title.substring(0, 17) + '...' : title), [title])

  const onActivateNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }))
  }

  return (
    <ListItem disablePadding onClick={() => onActivateNote()}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
export default SideBaritItem

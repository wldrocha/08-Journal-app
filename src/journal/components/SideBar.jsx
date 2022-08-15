import { useSelector } from 'react-redux'
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import SideBaritItem from './SideBaritItem'

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth)
  const { notes } = useSelector((state) => state.journal)

  return (
    <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div' textTransform='Capitalize'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBaritItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

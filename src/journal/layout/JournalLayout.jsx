import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { Navbar, SideBar } from '../components'

const drawerWidth = 240

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar {...drawerWidth} />
      <SideBar {...drawerWidth} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

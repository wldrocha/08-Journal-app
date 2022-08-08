import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, Icon, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store'

export const Navbar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(startLogout())
  }
  return (
    <AppBar component='nav' position='fixed' sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
      <Toolbar>
        <IconButton>
          <MenuOutlined
            color='inherit'
            edge='start'
            sx={{
              mr: 2,
              display: { sm: 'none' }
            }}
          />
        </IconButton>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' noWrap component='div'>
            JournalApp
          </Typography>
          <IconButton onClick={()=> onLogout()}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

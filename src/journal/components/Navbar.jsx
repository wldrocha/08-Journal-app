import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import {
  AppBar,
  Grid,
  Icon,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import React from 'react'

export const Navbar = ({ drawerWidth = 240 }) => {
  return (
    <AppBar
      component='nav'
      position='fixed'
      sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
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
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6' noWrap component='div'>
            JournalApp
          </Typography>
          <IconButton>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

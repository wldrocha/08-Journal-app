import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SaveOutlined } from '@mui/icons-material'
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { useForm } from '../../hooks/useForm'
import { ImageGallery } from '../components'
import { setActiveNote, startSaveNote } from '../../store/journal'

export const NoteView = () => {
  const dispatch = useDispatch()
  const { active: note, isSaving, messageSaving } = useSelector((state) => state.journal)

  const [open, setOpen] = useState(false)

  const { body, title, date, onInputChange, formState } = useForm(note)

  const dateString = useMemo(() => new Date(date).toUTCString(), [date])

  const onSaveNote = () => {
    dispatch(startSaveNote())
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaving.length > 0) {
      setOpen(true)
    }
  }, [messageSaving])

  return (
    <Grid container direction='row' justifyContent='Space-between' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          {messageSaving}
        </Alert>
      </Snackbar>
      <Grid item>
        <Button sx={{ px: 2, py: 3 }} onClick={onSaveNote} disabled={!!isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingresa un título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió hoy?'
          minRows={5}
          sx={{ border: 'none', mb: 1 }}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  )
}

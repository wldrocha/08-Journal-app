import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useForm } from '../../hooks/useForm'
import { ImageGallery } from '../components'
import { setActiveNote, startSaveNote } from '../../store/journal'

export const NoteView = () => {
  const dispatch = useDispatch()
  const { active: note, isSaving } = useSelector((state) => state.journal)

  const { body, title, date, onInputChange, formState } = useForm(note)

  const dateString = useMemo(() => new Date(date).toUTCString(), [date])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  return (
    <Grid container direction='row' justifyContent='Space-between' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
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

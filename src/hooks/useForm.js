import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidation, setFormValidation] = useState({})

  useEffect(() => {
    createValidators()
  }, [formState])

  const isFomValid = useMemo(() => {
    for (const formValue of Object.keys(formValidations)) {
      if (formValidations[formValue] !== null) return false
    }
    return true
  }, [formValidation])

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  const createValidators = () => {
    const formcheckedValues = {}

    for (const formField of Object.keys(formValidations)) {
      const { 0: fn, 1: erroMessage } = formValidations[formField]
      formcheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : erroMessage
    }
    setFormValidation(formcheckedValues)
    console.log({ ...formcheckedValues })
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    isFomValid,
    ...formValidation
  }
}

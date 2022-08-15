export const fileUpload = async (file) => {
  if (!file) throw new Error('No existe ningún archivo para subir')
  const cloudURL = 'https://api.cloudinary.com/v1_1/dhpercaiy/image/upload'

  const formData = new FormData()

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const response = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('No se pudo completar la subida de la imagen')

    const cloudResp = await response.json()

    return cloudResp.secure_url

  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

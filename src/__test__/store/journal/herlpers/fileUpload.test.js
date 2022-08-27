import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../../../store/journal/helpers/fileUpload'

cloudinary.config({
  cloud_name: 'dhpercaiy',
  api_key: '348147462326517',
  api_secret: 'j8UPdcC8RX6isyXn7tskFsUuw6A',
  secure: true
})

describe('test on fileUpload', () => {
  it('should upload and delete file to cloudinary', async () => {
    const imageUrl =
      'http://2.bp.blogspot.com/-8KuSaGEYEMs/UPSuL75AdoI/AAAAAAAAOLI/8Bb7HfkOQXU/s1600/nuevos+paisajes+floridos+con+carretera.jpg'

    const resp = await fetch(imageUrl)

    const blob = await resp.blob()

    const file = new File([blob], 'testFoto.jpg')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    const segments = url.split('/')

    const imgId = segments.at(-1).replace('.jpg', '')

    const cloudRes = await cloudinary.api.delete_resources([`journal/${imgId}`], { resource_type: 'image' })
  })

  test('should return null', async () => {
    const file = new File([], 'foto.jpg')
    const url = await fileUpload(file)
    expect(url).toBe(null)
  })
})

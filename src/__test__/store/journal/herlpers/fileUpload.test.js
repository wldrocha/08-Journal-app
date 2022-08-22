const { fileUpload } = require('../../../../store/journal/helpers/fileUpload')

describe('test on fileUpload', () => {
  it('should upload file to cloudinary', async () => {
    const imageUrl =
      'http://2.bp.blogspot.com/-8KuSaGEYEMs/UPSuL75AdoI/AAAAAAAAOLI/8Bb7HfkOQXU/s1600/nuevos+paisajes+floridos+con+carretera.jpg'

    const resp = await fetch(imageUrl)

    const blob = await resp.blob()

    const file = new File([blob], 'testFoto.jpg')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')
  })
})

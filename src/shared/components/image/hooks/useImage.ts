import { useState, useCallback, useEffect } from 'react'
interface UseImageInterface {
  alt?: string
  src?: string
}

const UseImage = ({
  alt,
  src,
}: UseImageInterface): {
  useAlt: string
  useImage: string
  useEmptyImage: boolean
  useRandom: number
} => {
  const [useImage, setImage] = useState('')
  const [useEmptyImage, setEmptyImage] = useState(false)
  const [useAlt, setAlt] = useState('')
  const [useRandom, setRandom] = useState(0)

  const getMapAvatarName = useCallback((): void => {
    if (alt) {
      const breakName = alt.split(' ')
      const onlyOneSurname = breakName?.[1]?.substr(0, 1) || ''
      setAlt(alt.substr(0, 1) + onlyOneSurname)
    }
  }, [alt])

  useEffect(() => {
    const random = Math.floor(Math.random() * 5)
    setRandom(random)

    if (src) {
      const image = new Image()
      image.onload = () => {
        setImage(src)
      }
      image.onerror = () => {
        setEmptyImage(true)
        getMapAvatarName()
      }
      image.src = src
    } else if (alt || (src !== '' && alt !== '')) {
      setEmptyImage(true)
      getMapAvatarName()
    }
  }, [alt, getMapAvatarName, src])

  return { useAlt, useImage, useEmptyImage, useRandom }
}

export default UseImage

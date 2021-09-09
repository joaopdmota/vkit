import { useState, useEffect } from 'react'

const UseTheme = (): {
  handlerTheme: () => void
  useTheme: string
} => {
  const themeDefault = 'light'
  const [useTheme, setTheme] = useState(themeDefault)

  const handlerTheme = (): void => {
    const dataTheme = useTheme === themeDefault ? 'dark' : themeDefault
    document.body.setAttribute('data-theme', dataTheme)
    localStorage.setItem('vkit-theme', dataTheme)
    setTheme(dataTheme)
  }

  useEffect(() => {
    const theme = localStorage.getItem('vkit-theme')

    if (theme) {
      document.body.setAttribute('data-theme', theme)
      setTheme(theme)
    }
  }, [])

  return { handlerTheme, useTheme }
}

export default UseTheme

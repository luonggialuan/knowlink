'use client'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  console.log(theme)

  return (
    <>
      <div className="flex items-center justify-center mx-4">
        {theme === 'light' ? (
          <BiMoon
            className="cursor-pointer"
            fill="black"
            size={25}
            onClick={() => setTheme('dark')}
          />
        ) : (
          <BiSun
            size={25}
            fill="white"
            className="cursor-pointer"
            onClick={() => setTheme('light')}
          />
        )}
      </div>
      {/* <button
        onClick={toggleDarkMode}
        className="flex items-center focus:outline-none"
      >
        {isDark ? (
          <BiMoon className="cursor-pointer" fill="black" size={25} />
        ) : (
          <BiSun size={25} className="cursor-pointer" />
        )}
      </button> */}
    </>
  )
}

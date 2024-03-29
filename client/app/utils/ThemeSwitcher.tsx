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
      <button
        onClick={toggleDarkMode}
        className="flex items-center focus:outline-none"
      >
        {isDark ? (
          <BiMoon className="cursor-pointer" fill="white" size={25} />
        ) : (
          <BiSun size={25} className="cursor-pointer" />
        )}
      </button>
    </>
  )
}

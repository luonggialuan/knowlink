'use client'
import React from 'react'
import './Loader.css'

type Props = {}

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div>
    </div>
  )
}

export default Loader

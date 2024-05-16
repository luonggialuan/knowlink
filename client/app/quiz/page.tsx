/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer'
import QuizCreation from '../forms/QuizCreation'

interface Props {
  searchParams: {
    topic?: string
  }
}

const page = ({ searchParams }: Props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(2)
  const [route, setRoute] = useState('Login')
  return (
    <main>
      <Protected>
        <Heading
          title={`Quiz | Quizzzy - KnowLink`}
          description="KnowLink is a platform for student to learn and get help from teachers"
          keywords="Math, English, Physics, Chemistry, Geography, History, Biology"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <QuizCreation topic={searchParams.topic ?? ''} />
        <Footer />
      </Protected>
    </main>
  )
}

export default page

/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import FAQ from '../components/FAQ/FAQ'
import Footer from '../components/Footer'

type Props = {}

const page = (props: Props) => {
  const [route, setRoute] = useState('Login')
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(4)
  return (
    <>
      <Heading
        title="FAQ - KnowLink"
        description="KnowLink is a platform for student to learn and get help from teachers"
        keywords="Math, English, Physics, Chemistry, Geography, History, Biology"
      />
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <FAQ />
      <Footer />
    </>
  )
}

export default page

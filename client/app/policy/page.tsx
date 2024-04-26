/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Policy from './Policy'

type Props = {}

const page = (props: Props) => {
  const [route, setRoute] = useState('Login')
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(3)
  return (
    <>
      <Heading
        title="Policy - KnowLink"
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
      <Policy />
      <Footer />
    </>
  )
}

export default page

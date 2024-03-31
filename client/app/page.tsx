'use client'
import React, { FC, useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState('Login')

  return (
    <main>
      <Heading
        title="KnowLink"
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
      <Banner />
      <Footer />
    </main>
  )
}

export default Page

/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { FC, useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Protected from '../hooks/useProtected'
import Footer from '../components/Footer'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'

type Props = {}

const page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(6)
  const [route, setRoute] = useState('Login')
  const { user } = useSelector((state: any) => state.auth)
  return (
    <main>
      <Protected>
        <Heading
          title={`${user?.name} profile - KnowLink`}
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
        <Profile user={user} />
        <Footer />
      </Protected>
    </main>
  )
}

export default page

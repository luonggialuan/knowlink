'use client'
import React, { FC, useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)

  return (
    <div>
      <Heading
        title="KnowLink"
        description="KnowLink is a platform for student to learn and get help from teachers"
        keywords="Math, English, Physics, Chemistry, Geography, History, Biology"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  )
}

export default Page

'use client'
import { Game, Question } from '@prisma/client'
import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from './Header'
import Footer from './Footer'
import OpenEnded from './OpenEnded'

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'question' | 'answer'>[] }
}

const OpenEndedPage = ({ game }: Props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(2)
  const [route, setRoute] = useState('Login')
  return (
    <main>
      <Protected>
        <Heading
          title={`${game?.topic} | Quizzzy - KnowLink`}
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
        <OpenEnded game={game} />
        <Footer />
      </Protected>
    </main>
  )
}

export default OpenEndedPage

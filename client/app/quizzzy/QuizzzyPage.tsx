/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer'
import QuizMeCard from './QuizMeCard'
import HistoryCard from './HistoryCard'
import DetailsDialog from '../components/DetailsDialog'
import RecentActivityCard from './RecentActivityCard'
import HotTopicsCard from './HotTopicsCard'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'

type Props = {
  games: any
  formattedTopics?: any
}

const QuizzzyPage = ({ games, formattedTopics }: Props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(2)
  const [route, setRoute] = useState('Login')
  const { data: userData } = useLoadUserQuery({})

  return (
    <main>
      <Protected>
        <Heading
          title={`Quizzzy - KnowLink`}
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
        <main className="p-8 mx-auto max-w-7xl font-Roboto">
          <div className="flex items-center">
            <h2 className="mr-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
              Dashboard
            </h2>
            <DetailsDialog />
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <QuizMeCard />
            <HistoryCard />
          </div>
          <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
            <HotTopicsCard formattedTopics={formattedTopics} />
            <RecentActivityCard userId={userData?.user._id} games={games} />
          </div>
        </main>
        <Footer />
      </Protected>
    </main>
  )
}

export default QuizzzyPage

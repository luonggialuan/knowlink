import { buttonVariants } from '@/components/ui/button'
import { Game } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { MdDashboard } from 'react-icons/md'
import ResultsCard from './statistics/ResultsCard'
import AccuracyCard from './statistics/AccuracyCard'
import TimeTakenCard from './statistics/TimeTakenCard'
import QuestionsList from './statistics/QuestionsList'

type Props = {
  game: any
  accuracy: number
}

const Statistics = ({ game, accuracy }: Props) => {
  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link href="/quizzzy" className={buttonVariants()}>
              <MdDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(game.timeEnded ?? 0)}
            timeStarted={new Date(game.timeStarted ?? 0)}
          />
        </div>
        <QuestionsList questions={game.questions} />
      </div>
    </>
  )
}

export default Statistics

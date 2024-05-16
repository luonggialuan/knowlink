import { buttonVariants } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import Link from 'next/link'

import { redirect } from 'next/navigation'
import React from 'react'
import StatisticsPage from '@/app/components/StatisticsPage'

type Props = {
  params: {
    gameId: string
  }
}

const Statistics = async ({ params: { gameId } }: Props) => {
  // const session = await getAuthSession();
  // if (!session?.user) {
  //   return redirect("/");
  // }
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { questions: true }
  })
  if (!game) {
    return redirect('/')
  }

  let accuracy: number = 0

  if (game.gameType === 'mcq') {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1
      }
      return acc
    }, 0)
    accuracy = (totalCorrect / game.questions.length) * 100
  } else if (game.gameType === 'open_ended') {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect ?? 0)
    }, 0)
    accuracy = totalPercentage / game.questions.length
  }
  accuracy = Math.round(accuracy * 100) / 100

  return <StatisticsPage game={game} accuracy={accuracy} />
}

export default Statistics

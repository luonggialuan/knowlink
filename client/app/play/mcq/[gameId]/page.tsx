import MCQPage from '@/app/components/MCQPage'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    gameId: string
  }
}

const page = async ({ params: { gameId } }: Props) => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true
        }
      }
    }
  })
  if (!game || game.gameType === 'open_ended') {
    return redirect('/quiz')
  }
  return <MCQPage game={game} />
  // <pre>{JSON.stringify(game, null, 2)}</pre>
}

export default page

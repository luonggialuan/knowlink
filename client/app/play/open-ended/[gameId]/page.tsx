import ErrorConnectPage from '@/app/components/ErrorConnectPage'
import OpenEndedPage from '@/app/components/OpenEndedPage'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    gameId: string
  }
}

const page = async ({ params: { gameId } }: Props) => {
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId
      },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            answer: true
          }
        }
      }
    })
    if (!game || game.gameType === 'mcq') {
      return redirect('/quiz')
    }
    return <OpenEndedPage game={game} />
  } catch (error) {
    return <ErrorConnectPage />
  }
}

export default page

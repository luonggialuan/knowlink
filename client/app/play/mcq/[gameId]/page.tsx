import ErrorConnectPage from '@/app/components/ErrorConnectPage'
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
            options: true
          }
        }
      }
    })
    if (!game || game.gameType === 'open_ended') {
      return redirect('/quiz')
    }
    return <MCQPage game={game} />
  } catch (error) {
    return <ErrorConnectPage />
  }
}

export default page

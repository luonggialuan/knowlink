import React, { useState } from 'react'
import { prisma } from '@/lib/db'
import HistoryComponentPage from '../components/HistoryComponentPage'

type Props = {
  userId: string
}

const History = async (props: Props) => {
  const games = await prisma.game.findMany({
    take: 100,
    orderBy: {
      timeStarted: 'desc'
    }
  })

  return <HistoryComponentPage games={games} />
}

export default History

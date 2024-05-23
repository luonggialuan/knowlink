import React, { useState } from 'react'
import { prisma } from '@/lib/db'
import HistoryComponentPage from '../components/HistoryComponentPage'
import ErrorConnectPage from '../components/ErrorConnectPage'

type Props = {
  userId: string
}

const History = async (props: Props) => {
  try {
    const games = await prisma.game.findMany({
      take: 100,
      orderBy: {
        timeStarted: 'desc'
      }
    })

    return <HistoryComponentPage games={games} />
  } catch (error) {
    return <ErrorConnectPage />
  }
}

export default History

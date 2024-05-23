import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'
import HistoryComponent from '../components/HistoryComponent'

type Props = {
  games: any
  userId: string | null
}

const RecentActivityCard = async ({ games, userId }: Props) => {
  const filteredGames = games.filter((game: any) => game.userId === userId)
  const totalFilteredGames = filteredGames.length

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have played a total of {totalFilteredGames} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px]">
        <HistoryComponent userId={userId} games={games} limit={10} />
      </CardContent>
    </Card>
  )
}

export default RecentActivityCard

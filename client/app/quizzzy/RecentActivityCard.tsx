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
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { useSelector } from 'react-redux'

type Props = {
  games: any
}

const RecentActivityCard = async ({ games }: Props) => {
  const { data: userData } = useLoadUserQuery({})
  // const { user } = useSelector((state: any) => state.auth)
  // const userId = userData.user._id
  const [userId, setUserId] = useState(null)
  const filteredGames = games.filter((game: any) => game.userId === userId)
  const totalFilteredGames = filteredGames.length
  useEffect(() => {
    // const userId = userData.user._id
    setUserId(userData.user._id)
  }, [userData])

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
        <HistoryComponent games={games} limit={10} />
      </CardContent>
    </Card>
  )
}

export default RecentActivityCard

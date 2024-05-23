import { CiClock2 } from 'react-icons/ci'
import { LuCopyCheck, LuBookOpen } from 'react-icons/lu'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {
  games?: any
  limit?: number
  userId: string | null
}

const HistoryComponent = ({ games, limit, userId }: Props) => {
  return (
    <div className="space-y-8 scroll-auto">
      {games?.length > 0
        ? games
            .filter((game: any) => game.userId === userId)
            .slice(0, limit)
            .map((game: any) => {
              return (
                <div
                  className="flex items-center justify-between"
                  key={game.id}
                >
                  <div className="flex items-center">
                    {game.gameType === 'mcq' ? (
                      <LuCopyCheck className="mr-3" />
                    ) : (
                      <LuBookOpen className="mr-3" />
                    )}
                    <div className="ml-4 space-y-1">
                      <Link
                        className="text-base font-medium leading-none underline"
                        href={`/statistics/${game.id}`}
                      >
                        {game.topic}
                      </Link>
                      <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                        <CiClock2 className="w-4 h-4 mr-1" />
                        {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {game.gameType === 'mcq'
                          ? 'Multiple Choice'
                          : 'Open-Ended'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
        : 'No result found!'}
    </div>
  )
}

export default HistoryComponent

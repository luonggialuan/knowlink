import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import { prisma } from '@/lib/db'
import QuizzzyPage from './QuizzzyPage'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'

type Props = {}

const page = async (props: Props) => {
  try {
    const games = await prisma.game.findMany({
      take: 100,
      orderBy: {
        timeStarted: 'desc'
      }
    })

    const topics = await prisma.topic_count.findMany({})
    const formattedTopics = topics.map((topic) => {
      return {
        text: topic.topic,
        value: topic.count
      }
    })

    return <QuizzzyPage games={games} formattedTopics={formattedTopics} />
  } catch (error) {
    return redirect('/')
  }
}

export default page

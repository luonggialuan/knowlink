import { Button, buttonVariants } from '@/components/ui/button'
import { cn, formatTimeDelta } from '@/lib/utils'
import { Game, Question } from '@prisma/client'
import { differenceInSeconds } from 'date-fns'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IoBarChart } from 'react-icons/io5'
import { LuLoader2, LuTimer } from 'react-icons/lu'
import OpenEndedPercentage from './OpenEndedPercentage'
import { useMutation } from '@tanstack/react-query'
import { checkAnswerSchema, endGameSchema } from '@/schemas/questions'
import axios from 'axios'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { FaChevronRight } from 'react-icons/fa'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import BlankAnswerInput from './BlankAnswerInput'

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'question' | 'answer'>[] }
}

const OpenEnded = ({ game }: Props) => {
  const [hasEnded, setHasEnded] = useState(false)
  const [now, setNow] = useState(new Date())
  const [averagePercentage, setAveragePercentage] = React.useState(0)
  const [questionIndex, setQuestionIndex] = React.useState(0)
  const [blankAnswer, setBlankAnswer] = React.useState('')
  const { toast } = useToast()

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex]
  }, [questionIndex, game.questions])

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id
      }
      const response = await axios.post(`/api/endGame`, payload)
      return response.data
    }
  })
  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer
      document.querySelectorAll('#user-blank-input').forEach((input) => {
        filledAnswer = filledAnswer.replace('_____', input.value)
        input.value = ''
      })
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: filledAnswer
      }
      const response = await axios.post(`/api/checkAnswer`, payload)
      return response.data
    }
  })

  useEffect(() => {
    if (!hasEnded) {
      const interval = setInterval(() => {
        setNow(new Date())
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [hasEnded])

  const handleNext = useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to the correct answer`
        })
        setAveragePercentage((prev) => {
          return (prev + percentageSimilar) / (questionIndex + 1)
        })
        if (questionIndex === game.questions.length - 1) {
          endGame()
          setHasEnded(true)
          return
        }
        setQuestionIndex((prev) => prev + 1)
      },
      onError: (error) => {
        console.error(error)
        toast({
          title: 'Something went wrong',
          variant: 'destructive'
        })
      }
    })
  }, [checkAnswer, questionIndex, toast, endGame, game.questions.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key
      if (key === 'Enter') {
        handleNext()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleNext])

  if (hasEnded) {
    return (
      <div className="flex inset-0 items-center justify-center self-center mt-40 mb-20">
        <div className="absolute flex flex-col">
          <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
            You Completed in{' '}
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
          <Link
            href={`/statistics/${game.id}`}
            className={cn(buttonVariants({ size: 'lg' }), 'mt-2')}
          >
            View Statistics
            <IoBarChart className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex inset-0 items-center justify-center self-center mt-20">
      <div className="md:w-[80vw] max-w-4xl w-[90vw]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            {/* topic */}
            <p>
              <span className="text-slate-500">Topic</span> &nbsp;
              <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                {game.topic}
              </span>
            </p>
            <div className="flex self-start mt-3 text-slate-500">
              <LuTimer className="mr-2" />
              {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
            </div>
          </div>
          <OpenEndedPercentage percentage={averagePercentage} />
        </div>
        <Card className="w-full mt-4">
          <CardHeader className="flex flex-row items-center">
            <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
              <div>{questionIndex + 1}</div>
              <div className="text-base text-slate-400">
                {game.questions.length}
              </div>
            </CardTitle>
            <CardDescription className="flex-grow text-lg">
              {currentQuestion?.question}
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <BlankAnswerInput
            setBlankAnswer={setBlankAnswer}
            answer={currentQuestion.answer}
          />
          <Button
            variant="default"
            className="mt-4"
            disabled={isChecking || hasEnded}
            onClick={() => {
              handleNext()
            }}
          >
            {isChecking && <LuLoader2 className="w-4 h-4 mr-2 animate-spin" />}
            Next <FaChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OpenEnded

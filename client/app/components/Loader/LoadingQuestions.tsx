import React, { useEffect } from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

type Props = { finished: boolean }

const loadingTexts = [
  'Generating questions...',
  'Unleashing the power of curiosity...',
  'Diving deep into the ocean of questions..',
  'Harnessing the collective knowledge of the cosmos...',
  'Igniting the flame of wonder and exploration...'
]

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(10)
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0])
  React.useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setLoadingText(loadingTexts[randomIndex])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100
        if (prev === 100) {
          return 0
        }
        if (Math.random() < 0.1) {
          return prev + 2
        }
        return prev + 0.5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [finished])

  return (
    <div className="w-[80%] flex inset-0 items-center justify-center self-center font-Roboto md:w-[60vw] flex-col">
      <Image src={'/Exams.gif'} width={400} height={400} alt="loading" />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 sm:text-xl text-sm text-slate-800 dark:text-slate-200">
        {loadingText}
      </h1>
    </div>
  )
}

export default LoadingQuestions

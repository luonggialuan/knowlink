import React from 'react'
import { Card } from '@/components/ui/card'
import { GoCheckCircle, GoXCircle } from 'react-icons/go'
import { Separator } from '@radix-ui/react-separator'

type Props = {
  correct_answers: number
  wrong_answers: number
}

const MCQCounter = ({ correct_answers, wrong_answers }: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2">
      <GoCheckCircle color="green" size={30} />
      <span className="mx-3 text-2xl text-[green]">{correct_answers}</span>

      <Separator orientation="vertical" />

      <GoXCircle color="red" size={30} />
      <span className="mx-3 text-2xl text-[red]">{wrong_answers}</span>
    </Card>
  )
}

export default MCQCounter

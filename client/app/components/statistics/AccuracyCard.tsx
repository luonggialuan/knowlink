import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LuTarget } from 'react-icons/lu'
type Props = { accuracy: number }

const AccuracyCard = ({ accuracy }: Props) => {
  accuracy = Math.round(accuracy * 100) / 100
  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Average Accuracy</CardTitle>
        <LuTarget />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">{accuracy.toString() + '%'}</div>
      </CardContent>
    </Card>
  )
}

export default AccuracyCard

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaAward, FaTrophy } from 'react-icons/fa'
type Props = { accuracy: number }

const ResultsCard = ({ accuracy }: Props) => {
  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold">Results</CardTitle>
        <FaAward />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-3/5">
        {accuracy > 75 ? (
          <>
            <FaTrophy className="mr-4" color="gold" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span className="">Impressive!</span>
              <span className="text-sm text-center text-black opacity-50">
                {'> 75% accuracy'}
              </span>
            </div>
          </>
        ) : accuracy > 25 ? (
          <>
            <FaTrophy className="mr-4" color="silver" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-stone-400">
              <span className="">Good job!</span>
              <span className="text-sm text-center text-black opacity-50">
                {'> 25% accuracy'}
              </span>
            </div>
          </>
        ) : (
          <>
            <FaTrophy className="mr-4" color="brown" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-800">
              <span className="">Nice try!</span>
              <span className="text-sm text-center text-black opacity-50">
                {'< 25% accuracy'}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ResultsCard
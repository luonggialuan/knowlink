'use client'
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
  Tooltip
} from 'recharts'
import Loader from '../../Loader/Loader'
import { styles } from '@/app/styles/style'

type Props = {}

const CoursesAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({})

  //   const analyticsData = [
  //     { name: 'June 2024', uv: 3 },
  //     { name: 'July 2024', uv: 2 },
  //     { name: 'August 2024', uv: 5 },
  //     { name: 'Sept 2024', uv: 7 },
  //     { name: 'October 2024', uv: 2 },
  //     { name: 'Nov 2024', uv: 5 },
  //     { name: 'December 2024', uv: 7 }
  //   ]

  const analyticsData: any = []

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count })
    })
  const minValue = 0

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} text-start px-5 pt-2`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={3000} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, 'auto']} />
                <Tooltip />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  )
}

export default CoursesAnalytics

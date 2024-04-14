'use client'
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React from 'react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import Loader from '../../Loader/Loader'
import { styles } from '@/app/styles/style'

type Props = {
  isDashboard?: boolean
}

// const analyticsData = [
//   { name: 'June 2024', count: 440 },
//   { name: 'July 2024', count: 820 },
//   { name: 'August 2024', count: 403 },
//   { name: 'Sept 2024', count: 302 },
//   { name: 'October 2024', count: 132 },
//   { name: 'Nov 2024', count: 554 },
//   { name: 'December 2024', count: 85 }
// ]

const UsersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({})

  const analyticsData: any = []

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count })
    })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? 'mt-[50px] h-screen'
              : 'mt-[50px] dark:bg-[#111C43] bg-[#fff] shadow-sm pb-5 rounded-sm'
          }`}
        >
          <div className={`${isDashboard ? 'ml-8 mb-5' : ''}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && '!text-[20px]'
              } text-start px-5 pt-2`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? 'h-[30vh]' : 'h-[90%]'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '100%' : '90%'}
              height={isDashboard ? '100%' : '50%'}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  )
}

export default UsersAnalytics

'use client'
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts'
import Loader from '../../Loader/Loader'
import { styles } from '@/app/styles/style'

type Props = {
  isDashboard?: boolean
}

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({})

  const analyticsData: any = []

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count })
    })
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? 'h-[30vh]' : 'h-screen'}`}>
          <div
            className={`${
              isDashboard ? 'mt-[0px] pl-[40px] mb-2' : 'mt-[50px]'
            }`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && '!text-[20px]'
              } text-start px-5 pt-2`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? 'h-[90%]' : 'h-full'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '100%' : '90%'}
              height={isDashboard ? '100%' : '50%'}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  )
}

export default OrdersAnalytics

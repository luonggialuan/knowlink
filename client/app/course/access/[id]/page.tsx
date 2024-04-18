/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import CourseContent from '@/app/components/Course/CourseContent'
import Loader from '@/app/components/Loader/Loader'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  params: any
}

const page = ({ params }: Props) => {
  const id = params.id
  const { isLoading, error, data } = useLoadUserQuery({})

  useEffect(() => {
    if (!data || error) {
      redirect('/')
    } else {
      const isPurchased = data.user.courses.find((item: any) => item._id === id)
      if (!isPurchased) {
        redirect('/')
      }
    }
  }, [data, error, id])

  return (
    <>{isLoading ? <Loader /> : <CourseContent id={id} user={data?.user} />}</>
  )
}

export default page

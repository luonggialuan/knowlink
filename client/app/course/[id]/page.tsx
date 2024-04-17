'use client'
import CourseDetailsPage from '@/app/components/Course/CourseDetailsPage'
import React from 'react'

type Props = {}

const page = ({ params }: any) => {
  return (
    <>
      <CourseDetailsPage id={params.id} />
    </>
  )
}
export default page

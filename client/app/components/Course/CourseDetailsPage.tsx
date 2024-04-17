'use client'
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import React, { FC, useState } from 'react'
import Loader from '../Loader/Loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'
import Footer from '../Footer'
import CourseDetails from './CourseDetails'

type Props = {
  id: string
}

const CourseDetailsPage: FC<Props> = ({ id }: Props) => {
  const [route, setRoute] = useState('Login')
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useGetCourseDetailsQuery(id)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + ' - KnowLink'}
            description="KnowLink is a platform for student to learn and get help from teachers"
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <CourseDetails data={data.course} />
          <Footer />
        </div>
      )}
    </>
  )
}

export default CourseDetailsPage

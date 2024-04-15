import { useGetCoursesQuery } from '@/redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import CourseCard from '../Course/CourseCard'

type Props = {}

const Courses = (props: Props) => {
  const { data, isLoading } = useGetCoursesQuery({})
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    setCourses(data?.courses)
  }, [data])

  return (
    <>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Roboto text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Expand Your{' '}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 inline-block text-transparent bg-clip-text">
            Knowledge
          </span>
          <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <div key={index}>
                <CourseCard item={item} key={index} />
                {/* <CourseCard item={item} key={index} />
                <CourseCard item={item} key={index} /> */}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Courses

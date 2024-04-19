/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useGetCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useGetHeroDataQuery } from '@/redux/layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import { styles } from '../styles/style'
import CourseCard from '../components/Course/CourseCard'

type Props = {}

const page = (props: Props) => {
  const searchParams = useSearchParams()
  const search = searchParams?.get('title')
  const { data, isLoading } = useGetCoursesQuery(undefined, {})
  const { data: categoriesData } = useGetHeroDataQuery('Categories', {})
  const [route, setRoute] = useState('Login')
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    if (category === 'All') {
      setCourses(data?.courses)
    }

    if (category !== 'All') {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      )
    }

    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [data, category, search])

  const categories = categoriesData?.layout.categories

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title="All course - KnowLink"
            description="KnowLink is a platform for student to learn and get help from teachers"
            keywords="Math, English, Physics, Chemistry, Geography, History, Biology"
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <div className="w-full flex items-center flex-wrap mt-2">
              <div
                className={`h-[35px] text-black ${
                  category === 'All'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-blue-200'
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Roboto cursor-pointer`}
                onClick={() => setCategory('All')}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] text-black ${
                        category === item.title
                          ? 'bg-indigo-600 text-white'
                          : 'bg-blue-200'
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Roboto cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? 'No courses found!'
                  : 'No courses found in this category. Please try another one!'}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard key={index} item={item} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default page

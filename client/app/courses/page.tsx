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
import Footer from '../components/Footer'
import { useRouter } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'

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
  const [searchKeyword, setSearchKeyword] = useState('')
  const router = useRouter()

  useEffect(() => {
    let filteredCourses = data?.courses || []

    if (searchKeyword.trim() !== '') {
      filteredCourses = filteredCourses.filter((item: any) =>
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      router.push(`/courses`)
    }
    if (search) {
      filteredCourses = filteredCourses.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category !== 'All') {
      filteredCourses = filteredCourses.filter(
        (item: any) => item.category === category
      )
    }

    setCourses(filteredCourses)
  }, [data, category, search, searchKeyword])

  const categories = categoriesData?.layout?.categories

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
            <div className="w-full flex items-center justify-start ml-3 mt-4 mb-2">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <CiSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="border border-gray-300 rounded-md ps-10 px-3 py-2 w-full md:w-96 focus:outline-none focus:border-blue-500"
                />
              </div>
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
          <Footer />
        </>
      )}
    </>
  )
}

export default page

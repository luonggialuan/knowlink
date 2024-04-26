'use client'
import React, { FC, use, useEffect, useState } from 'react'
import SideBarProfile from './SideBarProfile'
import { useLogOutQuery } from '@/redux/features/auth/authApi'
import { signOut, useSession } from 'next-auth/react'
import ProfileInfo from './ProfileInfo'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import ChangePassword from './ChangePassword'
import {
  useGetAllCoursesQuery,
  useGetCoursesQuery
} from '@/redux/features/courses/coursesApi'
import CourseCard from '../Course/CourseCard'

type Props = {
  user: any
}

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [active, setActive] = useState(1)
  const [logout, setLogout] = useState(false)
  const [courses, setCourses] = useState([])
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false
  })
  const { data, isLoading } = useGetCoursesQuery(undefined, {})

  const logOutHandler = async () => {
    setLogout(true)
    // await signOut()

    toast.promise(signOut(), {
      loading: 'Loging Out...',
      success: <b>Logout Successfully!</b>,
      error: <b>There are something wrong.</b>
    })
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    })
  }

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined)
      setCourses(filteredCourses)
    }
  }, [data])

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] bg-white dark:bg-slate-900 bg-opacity-90 border-[2px] border-[#3636361d] dark:border-[#ffffff1d] rounded-[5px] shadow-xl dark:shadow-indigo-500/50 mt-[80px] mb[80px] sticky ${
          scroll ? 'top-120px' : 'top-[30px]'
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] 1500px:grid-cols-3 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} isProfile={true} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile

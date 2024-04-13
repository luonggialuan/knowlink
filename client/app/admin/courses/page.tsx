'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses'
import DashBoardHero from '@/app/components/Admin/DashBoardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/useAdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <AllCourses />
    </>
  )
}

export default page

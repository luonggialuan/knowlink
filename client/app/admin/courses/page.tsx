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
      <AdminProtected>
        <Heading
          title="KnowLink - Admin"
          description="KnowLink is a platform for student to learn and get help from teachers"
          keywords="Math, English, Physics, Chemistry, Geography, History, Biology"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashBoardHero />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </>
  )
}

export default page
